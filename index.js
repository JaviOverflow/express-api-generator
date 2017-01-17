const argv = require('minimist')(process.argv.slice(2));
const templates = require('./templates');
const fs = require('fs');

main(argv);

function main({n, name, all, c, r, u, d} = null) {

    let entityName = (n !== undefined) ? n : name;
    let includes = generateEndpointsIncludes(entityName, all, c, r, u, d);
    let implementations = generateEndpointsImplementations(entityName, all, c, r, u, d);
    let endpointsFile = generateEndpointsFile(entityName, includes, implementations);

    fs.writeFile(`${entityName}.js`, endpointsFile, (err) => {});

    const useCases = [
        { mustBeGenerated: true, filledTemplate: templates.FILE_USECASE_GET_ALL(entityName), filename: `${entityName}Get.js` },
        { mustBeGenerated: r, filledTemplate: templates.FILE_USECASE_GET_SINGLE(entityName), filename: `${entityName}SingleGet.js` },
        { mustBeGenerated: c, filledTemplate: templates.FILE_USECASE_POST_SINGLE(entityName), filename: `${entityName}SingleCreate.js` },
        { mustBeGenerated: u, filledTemplate: templates.FILE_USECASE_UPDATE_SINGLE(entityName), filename: `${entityName}SinglePut.js` },
        { mustBeGenerated: d, filledTemplate: templates.FILE_USECASE_DELETE_SINGLE(entityName), filename: `${entityName}SingleDelete.js` },
    ];

    useCases
        .filter(useCase => useCase.mustBeGenerated)
        .forEach(useCase => fs.writeFile(useCase.filename, useCase.filledTemplate, (err) => {}));
}

function generateEndpointsIncludes(entityName, all, create, read, update, delete_) {
    let includes = [];
    includes.push(templates.INCLUDE_GET_ALL(entityName));
    if (all || create) includes.push(templates.INCLUDE_POST_SINGLE(entityName));
    if (all || read) includes.push(templates.INCLUDE_GET_SINGLE(entityName));
    if (all || update) includes.push(templates.INCLUDE_UPDATE_SINGLE(entityName));
    if (all || delete_) includes.push(templates.INCLUDE_DELETE_SINGLE(entityName));
    return includes;
}

function generateEndpointsImplementations(entityName, all, create, read, update, delete_) {
    let implementations = [];
    implementations.push(templates.ENDPOINT_GET_ALL(entityName));
    if (all || create) implementations.push(templates.ENDPOINT_POST_SINGLE(entityName));
    if (all || read) implementations.push(templates.ENDPOINT_GET_SINGLE(entityName));
    if (all || update) implementations.push(templates.ENDPOINT_UPDATE_SINGLE(entityName));
    if (all || delete_) implementations.push(templates.ENDPOINT_DELETE_SINGLE(entityName));
    return implementations;
}

function generateEndpointsFile(entityName, includes, implementations) {
    return templates.FILE_ENDPOINT(
        entityName,
        includes.join('\n'),
        implementations.join('\n'));
}
