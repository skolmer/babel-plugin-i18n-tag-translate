import fs from 'fs'
import path from 'path'
import * as t from "babel-types"
import * as babylon from "babylon";

const typeInfoRegex = /^:([a-z])(\((.+)\))?/
const paramRegex = /\$\{(\d+)\}/g

const buildKey = function (literals) {
    let stripType = s => s.replace(typeInfoRegex, '');
    let lastPartialKey = stripType(literals[literals.length - 1]);
    let prependPartialKey = (memo, curr, i) => `${stripType(curr)}\${${i}}${memo}`;
    return literals.slice(0, -1).reduceRight(prependPartialKey, lastPartialKey);
}

const updateTemplateLiterals = {
    TaggedTemplateExpression(path, { translations, filename }) {
        if (!path.node.translated && path.node.quasi && path.node.tag.name === 'i18n' && path.node.quasi.quasis) {
            let quasis = path.node.quasi.quasis.map((n) => n.value.raw)
            let ext = quasis.map((q) => {
                let match = q.match(typeInfoRegex)
                if (match && match.length > 1) {
                    return match[0]
                }
                return '';
            })
            let key = buildKey(quasis);

            let translation
            if(filename) {
                let group = translations[filename]
                if(group && group instanceof Object) translation = group[key]
            }

            if(!translation) {
                translation = translations[key]
            }

            if (translation) {
                let indices = []
                let paramMatch
                while ((paramMatch = paramRegex.exec(translation)) && paramMatch.length == 2) {
                    indices.push(Number.parseInt(paramMatch[1]))
                }
                let literals = translation.split(/\$\{\d+\}/g)
                let quasis = []
                let expressions = []
                let nextPrefix = ''
                for (let i = 0; i < literals.length; i++) {
                    quasis.push(t.templateElement({ raw: nextPrefix + literals[i], cooked: nextPrefix + literals[i] }, i === literals.length - 1))
                    if (indices.length > i) {
                        var paramIndex = indices[i];
                        if (ext.length > paramIndex + 1) {
                            nextPrefix = ext[paramIndex + 1]
                        } else {
                            nextPrefix = ''
                        }
                        if (path.node.quasi.expressions.length > paramIndex) {
                            let expression = path.node.quasi.expressions[paramIndex];
                            expressions.push(expression)
                        }
                    }
                }
                let literal = t.templateLiteral(quasis, expressions)
                let taggedTemplate = t.taggedTemplateExpression(path.node.tag, literal);
                taggedTemplate.translated = true
                path.replaceWith(taggedTemplate)
            }
        }
    }
};

const bla = function () {
    return {
        visitor: {
            Program(p, { file, opts }) {
                let filename = ''
                if(opts.groupDir) {
                    filename = path.relative(path.resolve(__dirname, opts.groupDir), file.parserOpts.filename).replace(/\\/g, '/')
                    // TODO Clean up this mess
                    const code = `let configs = ${JSON.stringify({group: filename})};`
                    let objectExpression = babylon.parse(code).program.body[0].declarations[0].init;
                    let ast = t.expressionStatement(t.callExpression(t.identifier("i18nConfig"), [objectExpression]))
                    p.unshiftContainer('body', ast)
                }
                if (opts['config']) {
                    // TODO Clean up this mess
                    const code = `let configs = ${JSON.stringify(opts['config'])};`
                    let objectExpression = babylon.parse(code).program.body[0].declarations[0].init;
                    let ast = t.expressionStatement(t.callExpression(t.identifier("i18nConfig"), [objectExpression]))
                    p.unshiftContainer('body', ast)
                }
                
                if (opts['globalImport'] || opts['config']) {
                    var newImport = t.importDeclaration(
                        [t.importDefaultSpecifier(t.identifier("i18n")), t.importSpecifier(t.identifier("i18nConfig"), t.identifier("i18nConfig"))],
                        t.stringLiteral("es2015-i18n-tag")
                    );

                    p.unshiftContainer('body', newImport)
                }                

                let translations = {}
                if (opts.translation) {
                    try {
                        let translationsFile = path.resolve(__dirname, opts.translation)
                        console.log(`Reading: ${translationsFile} ...`)
                        translations = JSON.parse(fs.readFileSync(translationsFile, 'utf-8'))
                        if(opts.config && opts.config.translations) {
                            translations = Object.assign(translations, opts.config.translations)
                        }
                    } catch (err) {
                        console.warn(err.message)
                    }
                }
                p.traverse(updateTemplateLiterals, { translations, filename });
            }
        }
    };
}

export default bla