const express = require("express");

const logsGetUseCase = require('./logsGet');
const logsSingleCreateUseCase = require('./logsSingleCreate');
const logsSingleGetUseCase = require('./logsSingleGet');

module.exports = function (parentRouter) {
    let logsRouter = express.Router();

    logsRouter

        .get('/', function (request, response) {
            logsGetUseCase
                .execute()
                .then((logs) => {
                  response.status(200).json(logs);
                });
        })
        .post('/', function (request, response) {
            logsSingleCreateUseCase
                .execute(request.body)
                .then((result) => {
                    response.status(200).json(result);
                });
        })
        .get('/:id', function (request, response) {
            let id = request.params.id;
            logsSingleGetUseCase
                .execute(id)
                .then((log) => {
                    response.status(200).json(log);
                });
        });

    parentRouter.use('/logs', logsRouter);
};