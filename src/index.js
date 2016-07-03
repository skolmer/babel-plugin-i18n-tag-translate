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
    TaggedTemplateExpression(path, { translations, filename }) {
        if (!path.node.translated && path.node.quasi && path.node.tag.name === 'i18n' && path.node.quasi.quasis) {
            const quasis = path.node.quasi.quasis.map((n) => n.value.raw)
            const ext = quasis.map((q) => {
                const match = q.match(typeInfoRegex)
                if (match && match.length > 1) {
                    return match[0]
                }
                return ''
            })
            const key = buildKey(quasis)

            let translation
            if(filename) {
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
                taggedTemplate.translated = true
                path.replaceWith(taggedTemplate)
            }
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
                p.traverse(updateTemplateLiterals, { translations, filename })
            }
        }
    }
}

export default babelPlugin