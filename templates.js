module.exports = {

    FILE_ENDPOINT: (name, imports, endpoints) => {
        return `const express = require("express");

${imports}

module.exports = function (parentRouter) {
    let ${name}Router = express.Router();

    ${name}Router

${endpoints};

    parentRouter.use('/${name}', ${name}Router);
};`},

    INCLUDE_GET_ALL: (name) => {
        return `const ${name}GetUseCase = require('./${name}Get');`
    },

    INCLUDE_POST_SINGLE: (name) => {
        return `const ${name}SingleCreateUseCase = require('./${name}SingleCreate');`
    },

    INCLUDE_GET_SINGLE: (name) => {
        return `const ${name}SingleGetUseCase = require('./${name}SingleGet');`
    },

    INCLUDE_UPDATE_SINGLE: (name) => {
        return `const ${name}SingleUpdateUseCase = require('./${name}SingleUpdate');`
    },

    INCLUDE_DELETE_SINGLE: (name) => {
        return `const ${name}SingleDeleteUseCase = require('./${name}SingleDelete');`
    },

    ENDPOINT_GET_ALL: (name) => {
        return `        .get('/', function (request, response) {
            ${name}GetUseCase
                .execute()
                .then((${name}) => {
                  response.status(200).json(${name});
                });
        })`
    },

    ENDPOINT_POST_SINGLE: (name) => {
        return `        .post('/', function (request, response) {
            ${name}SingleCreateUseCase
                .execute(request.body)
                .then((result) => {
                    response.status(200).json(result);
                });
        })`
    },

    ENDPOINT_GET_SINGLE: (name) => {
        return `        .get('/:id', function (request, response) {
            let id = request.params.id;
            ${name}SingleGetUseCase
                .execute(id)
                .then((${name.slice(0, -1)}) => {
                    response.status(200).json(${name.slice(0, -1)});
                });
        })`
    },

    ENDPOINT_UPDATE_SINGLE: (name) => {
        return `        .put('/:id', function (request, response) {
            let id = request.params.id;
            request.body.id = id;
            ${name}SingleUpdateUseCase
                .execute(id, request.body)
                .then((result) => {
                    response.status(200).json(result);
                });
        })`
    },

    ENDPOINT_DELETE_SINGLE: (name) => {
        return `        .delete('/:id', function (request, response) {
            let id = request.params.id;
            ${name}SingleDeleteUseCase
                .execute(id)
                .then((result) => {
                    response.status(200).json(result);
                })
        })`
    },


    FILE_USECASE_GET_ALL: (name) => {
        return `module.exports = {
    execute: () => {
        return null;
    }
};
`
    },

    FILE_USECASE_POST_SINGLE: (name) => {
        return `module.exports = {
    execute: (raw${name.charAt(0).toUpperCase() + name.slice(1, -1)}) => {
        return null;
    }
};`
    },

    FILE_USECASE_GET_SINGLE: (name) => {
        return `module.exports = {
    execute: (id) => {
        return null;
    }
};`
    },

    FILE_USECASE_UPDATE_SINGLE: (name) => {
        return `module.exports = {
    execute: (id, ${name.slice(0, -1)}) => {
        return null;
    }
};`
    },

    FILE_USECASE_DELETE_SINGLE: (name) => {
        return `module.exports = {
    execute: (id) => {
        return null;
    }
};`
    },

};