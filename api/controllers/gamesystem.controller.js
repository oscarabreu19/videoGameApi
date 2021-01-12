'use strict';

const _ = require('lodash');

const controllerHelper = require('../helpers/controller.helper.js');
const messageHelper = require('../helpers/message.helper.js');
const gameSystemService = require('../services/gamesystem.service.js');

//////////////////////////////////////////////////////
// CONSTANS
//////////////////////////////////////////////////////

const MODULE_NAME = '[GameSystem Controller]';

//////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
//////////////////////////////////////////////////////

function createGameSystem(req, res) {
    try {
        // Receiving parameters
        const params = req.body;

        // Call to service 
        const result = gameSystemService.createGameSystem(params);

        // Returning the result 
        if (!_.isUndefined(result) && _.isUndefined(result.error)) {
            res.status(201).json(result);
        } else {
            res.status(409).json(messageHelper.buildMessage(result.error));
        }
    } catch (error) {
        controllerHelper.handleErrorResponse(MODULE_NAME, createGameSystem.name, error, res);
    }
}

module.exports = {
    createGameSystem
};