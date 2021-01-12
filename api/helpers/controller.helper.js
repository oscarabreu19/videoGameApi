'use strict';

const _ = require('lodash');

//////////////////////////////////////////////////////
// PRIVATE FUNCTIONS
//////////////////////////////////////////////////////

function builErrorLog(err) {
    let errorLog;
    if (_.isUndefined(err)) {
        errorLog = 'Error not defined';
    } else if (!_.isUndefined(err.stack)) {
        errorLog = err.stack;
    } else if (!_.isUndefined(err.message)) {
        errorLog = err.message;
    } else {
        errorLog = JSON.stringify(err);
    }
    return errorLog;
}

function buildErrorResponse(nameController, nameMethod) {
    const jsonResultFailed = {
        error: {
            code: 500,
            message: 'Internal Server Error',
            description: `Internal Application Error in ${nameController}:${nameMethod}`
        }
    }
    return jsonResultFailed;
}

//////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
//////////////////////////////////////////////////////

function handleErrorResponse(controllerName, methodName, err, res) {
    // console.log(builErrorLog(err));
    const jsonResultFailed = buildErrorResponse(controllerName, methodName);
    res.status(500).send(jsonResultFailed);
}

//////////////////////////////////////////////////////
// MODULE EXPORTS
//////////////////////////////////////////////////////

module.exports = {
    handleErrorResponse,
    // for testing
    builErrorLog: builErrorLog,
    buildErrorResponse
};