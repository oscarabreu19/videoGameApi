'use strict';

const _ = require('lodash');

const controllerHelper = require('../helpers/controller.helper.js');
const videoGameService = require('../services/videogame.service.js');
const messageHelper = require('../helpers/message.helper.js');

//////////////////////////////////////////////////////
// CONSTANS
//////////////////////////////////////////////////////

const MODULE_NAME = '[VideoGame Controller]';

//////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
//////////////////////////////////////////////////////

function createVideoGame(req, res) {
    try {
        const params = req.body;

        const result = videoGameService.createVideoGame(params);

        if (!_.isUndefined(result) && _.isUndefined(result.error)) {
            res.status(201).json(result);    
        } else {
            res.status(409).json(messageHelper.buildMessage(result.error));
        }
    } catch (error) {
        return controllerHelper.handleErrorResponse(MODULE_NAME, createVideoGame.name, error, res);
    }
}

//////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////

module.exports = {
    createVideoGame
};