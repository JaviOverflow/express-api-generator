const argv = require('minimist')(process.argv.slice(2));
const templates = require('./templates');
const fs = require('fs');

main(argv);

function main({n, name, all, c, r, u, d} = null) {

    let entityName = (n !== undefined) ? n : name;

    generateEndpointsFile(entityName, all, c, r, u, d);
    generateUseCasesFiles(entityName, all, c, r, u, d);
}
function generateEndpointsFile(entityName, all, c, r, u, d) {
    let includes = fillEndpointsIncludes(entityName, all, c, r, u, d);
    let implementations = fillEndpointsImplementations(entityName, all, c, r, u, d);
    let endpointsFile = fillEndpointsTemplate(entityName, includes, implementations);

    fs.writeFile(`${entityName}.js`, endpointsFile, (err) => {
    });
}

function fillEndpointsIncludes(entityName, all, create, read, update, delete_) {
    let includes = [];
    includes.push(templates.INCLUDE_GET_ALL(entityName));
    if (all || create) includes.push(templates.INCLUDE_POST_SINGLE(entityName));
    if (all || read) includes.push(templates.INCLUDE_GET_SINGLE(entityName));
    if (all || update) includes.push(templates.INCLUDE_UPDATE_SINGLE(entityName));
    if (all || delete_) includes.push(templates.INCLUDE_DELETE_SINGLE(entityName));
    return includes;
}

function fillEndpointsImplementations(entityName, all, create, read, update, delete_) {
    let implementations = [];
    implementations.push(templates.ENDPOINT_GET_ALL(entityName));
    if (all || create) implementations.push(templates.ENDPOINT_POST_SINGLE(entityName));
    if (all || read) implementations.push(templates.ENDPOINT_GET_SINGLE(entityName));
    if (all || update) implementations.push(templates.ENDPOINT_UPDATE_SINGLE(entityName));
    if (all || delete_) implementations.push(templates.ENDPOINT_DELETE_SINGLE(entityName));
    return implementations;
}

function fillEndpointsTemplate(entityName, includes, implementations) {
    return templates.FILE_ENDPOINT(
        entityName,
        includes.join('\n'),
        implementations.join('\n'));
}

function generateUseCasesFiles(entityName, all, c, r, u, d) {
    const useCases = fillUseCasesTemplates(entityName, all, c, r, u, d);

    useCases
        .filter(useCase => useCase.mustBeGenerated)
        .forEach(useCase => fs.writeFile(useCase.filename, useCase.filledTemplate, (err) => {
        }));
}

function fillUseCasesTemplates(entityName, all, c, r, u, d) {
    const useCases = [
        {
            mustBeGenerated: true,
            filledTemplate: templates.FILE_USECASE_GET_ALL(entityName),
            filename: `${entityName}Get.js`
        },
        {
            mustBeGenerated: all || c,
            filledTemplate: templates.FILE_USECASE_POST_SINGLE(entityName),
            filename: `${entityName}SingleCreate.js`
        },
        {
            mustBeGenerated: all || r,
            filledTemplate: templates.FILE_USECASE_GET_SINGLE(entityName),
            filename: `${entityName}SingleGet.js`
        },
        {
            mustBeGenerated: all || u,
            filledTemplate: templates.FILE_USECASE_UPDATE_SINGLE(entityName),
            filename: `${entityName}SinglePut.js`
        },
        {
            mustBeGenerated: all || d,
            filledTemplate: templates.FILE_USECASE_DELETE_SINGLE(entityName),
            filename: `${entityName}SingleDelete.js`
        },
    ];
    return useCases;
}
