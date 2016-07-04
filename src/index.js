import fs from 'fs'
import path from 'path'
import * as t from 'babel-types'
import * as babylon from 'babylon'

const typeInfoRegex = /^:([a-z])(\((.+)\))?/
const paramRegex = /\$\{(\d+)\}/g

const buildKey = function (literals) {
    const stripType = (s) => s.replace(typeInfoRegex, '')
    const lastPartialKey = stripType(literals[literals.length - 1])
    const prependPartialKey = (memo, curr, i) => `${stripType(curr)}\${${i}}${memo}`
    return literals.slice(0, -1).reduceRight(prependPartialKey, lastPartialKey).replace(/\r\n/, '\n')
}

const updateTemplateLiterals = {
    TaggedTemplateExpression(path, { translations, filename, groupName }) {
        const node = path.node
        if (!node.translated && node.tag.name === 'i18n' || (node.tag.callee && (node.tag.callee.name === 'i18n' || (node.tag.callee.property && node.tag.callee.property.name === 'i18n'))) || (node.tag.property && node.tag.property.name === 'i18n')) {
            const quasi = node.quasi || node.tag.callee.quasi || node.tag.callee.property.quasi
            
            const quasis = quasi.quasis.map((n) => n.value.raw)
            const ext = quasis.map((q) => {
                const match = q.match(typeInfoRegex)
                if (match && match.length > 1) {
                    return match[0]
                }
                return ''
            })
            const key = buildKey(quasis)            

            if(node.tag.arguments && node.tag.arguments.length) {
                groupName = path.node.tag.arguments[0].value
            }
            
            let translation
            if(groupName) {
                const group = translations[groupName]
                if(group && group instanceof Object) translation = group[key]
            } else if(filename) {
                const group = translations[filename]
                if(group && group instanceof Object) translation = group[key]
            }

            if(!translation) {
                translation = translations[key]
            }

            if (translation) {
                const indices = []
                let paramMatch
                while ((paramMatch = paramRegex.exec(translation)) && paramMatch.length == 2) {
                    indices.push(Number.parseInt(paramMatch[1]))
                }
                const literals = translation.split(/\$\{\d+\}/g)
                const quasis = []
                const expressions = []
                let nextPrefix = ''
                for (let i = 0; i < literals.length; i++) {
                    quasis.push(t.templateElement({ raw: nextPrefix + literals[i], cooked: nextPrefix + literals[i] }, i === literals.length - 1))
                    if (indices.length > i) {
                        const paramIndex = indices[i]
                        if (ext.length > paramIndex + 1) {
                            nextPrefix = ext[paramIndex + 1]
                        } else {
                            nextPrefix = ''
                        }
                        if (path.node.quasi.expressions.length > paramIndex) {
                            const expression = path.node.quasi.expressions[paramIndex]
                            expressions.push(expression)
                        }
                    }
                }
                const literal = t.templateLiteral(quasis, expressions)
                const taggedTemplate = t.taggedTemplateExpression(path.node.tag, literal)                
                path.replaceWith(taggedTemplate)
                taggedTemplate.translated = true
            }
        }
    }
}

const traverseClassDeclarations = {
    ClassDeclaration: (path, { translations, filename, groups }) => {
        const node = path.node
        if (node.decorators && node.decorators.length) {
            const groupNames = node.decorators.map((d) => d.expression).filter((e) => e.callee && e.callee.name === 'i18nGroup' && e.arguments && e.arguments.length).map((d) => d.arguments.map(a => a.value)).reduce((p, n) => p.concat(n), [])
            const groupName = (groupNames.length) ? groupNames[0] : null
            path.traverse(updateTemplateLiterals, { translations, filename, groupName })
        } else {
            path.traverse(updateTemplateLiterals, { translations, filename, groupName: groups[node.id.name] })
        }
    }
}

const traverseExportDeclarations = {
    CallExpression: (path, { groups }) => {
        const node = path.node
        if (node.callee &&
            node.callee.type === 'CallExpression' &&
            node.callee.callee &&
            node.callee.callee.type === 'Identifier' &&
            node.callee.callee.name === 'i18nGroup' &&
            node.callee.arguments &&
            node.callee.arguments.length &&
            node.arguments &&
            node.arguments.length) {
            groups[node.arguments[0].name] = node.callee.arguments[0].value
        }
    }
}

const babelPlugin = function () {
    return {
        visitor: {
            Program(p, { file, opts }) {
                if (opts['config']) {
                    // TODO Clean up this mess
                    const code = `let configs = ${JSON.stringify(opts['config'])};`
                    const objectExpression = babylon.parse(code).program.body[0].declarations[0].init
                    const ast = t.expressionStatement(t.callExpression(t.identifier('i18nConfig'), [objectExpression]))
                    p.unshiftContainer('body', ast)
                }
                
                if (opts['globalImport'] || opts['config']) {
                    const newImport = t.importDeclaration(
                        [t.importDefaultSpecifier(t.identifier('i18n')), t.importSpecifier(t.identifier('i18nConfig'), t.identifier('i18nConfig')), t.importSpecifier(t.identifier('i18nGroup'), t.identifier('i18nGroup'))],
                        t.stringLiteral('es2015-i18n-tag')
                    )

                    p.unshiftContainer('body', newImport)
                }     

                let filename = ''
                if(opts.groupDir) {
                    filename = path.relative(path.resolve(process.cwd(), opts.groupDir), file.opts.filename).replace(/\\/g, '/')
                    const code = `const __translationGroup = ${JSON.stringify(filename)};`
                    const objectExpression = babylon.parse(code).program.body[0]
                    p.unshiftContainer('body', objectExpression)
                }           

                let translations = {}
                if (opts.translation) {
                    try {
                        const translationsFile = path.resolve(process.cwd(), opts.translation)
                        console.log(`Reading: ${translationsFile} ...`)
                        translations = JSON.parse(fs.readFileSync(translationsFile, 'utf-8'))
                        if(opts.config && opts.config.translations) {
                            translations = Object.assign(translations, opts.config.translations)
                        }
                        console.log('Successfully imported translations.')
                    } catch (err) {
                        console.warn(err.message)
                    }
                }
                const groups = {}
                p.traverse(traverseExportDeclarations, { groups }) // find all i18nGroup calls
                p.traverse(traverseClassDeclarations, { translations, filename, groups }) // traverse classes first to get group decorators
                p.traverse(updateTemplateLiterals, { translations, filename })
            }
        }
    }
}

export default babelPlugin