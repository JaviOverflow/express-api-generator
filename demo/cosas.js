const express = require("express");

const cosasGetUseCase = require('./cosasGet');
const cosasSingleCreateUseCase = require('./cosasSingleCreate');
const cosasSingleDeleteUseCase = require('./cosasSingleDelete');

module.exports = function (parentRouter) {
    let cosasRouter = express.Router();

    cosasRouter

        .get('/', function (request, response) {
            cosasGetUseCase
                .execute()
                .then((cosas) => {
                  response.status(200).json(cosas);
                });
        })
        .post('/', function (request, response) {
            cosasSingleCreateUseCase
                .execute(request.body)
                .then((result) => {
                    response.status(200).json(result);
                });
        })
        .delete('/:id', function (request, response) {
            let id = request.params.id;
            cosasSingleDeleteUseCase
                .execute(id)
                .then((result) => {
                    response.status(200).json(result);
                })
        });

    parentRouter.use('/cosas', cosasRouter);
};