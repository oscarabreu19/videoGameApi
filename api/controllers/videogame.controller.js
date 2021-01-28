'use strict';

const _ = require('lodash');

const controllerHelper = require('../helpers/controller.helper.js');
const videoGameService = require('../services/videogame.service.js');
const messageHelper = require('../helpers/message.helper.js');

//////////////////////////////////////////////////////
// CONSTANS
//////////////////////////////////////////////////////

const MODULE_NAME = '[VideoGame Controller]';
const VG_CT_ERR_VIDEOGAME_NOT_FOUND = 'Videogame not found';

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

function getVideoGames(req, res) {
    try {
        let params = {};
    
        for (const key in req.swagger.params) {
            if (Object.hasOwnProperty.call(req.swagger.params, key)) {
                params[key] = req.swagger.params[key].value;
            }
        }

        const result = videoGameService.getVideoGames(params);

        res.json(result);
    } catch (error) {
        return controllerHelper.handleErrorResponse(MODULE_NAME, getVideoGames.name, error, res);
    }
}

function getVideoGameById(req, res) {
    try {
        const result = videoGameService.getVideoGameById(req.swagger.params.id.value);

        if (!_.isUndefined(result))
            return res.json(result);

        res.status(404).json(messageHelper.buildMessage());
    } catch (error) {
        return controllerHelper.handleErrorResponse(MODULE_NAME, getVideoGameById.name, error, res);
    }
}

//////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////

module.exports = {
    createVideoGame,
    getVideoGames,
    getVideoGameById
};