'use strict';

const _ = require('lodash');

const controllerHelper = require('../helpers/controller.helper.js');
const messageHelper = require('../helpers/message.helper.js');
const gameSystemService = require('../services/gamesystem.service.js');

//////////////////////////////////////////////////////
// CONSTANS
//////////////////////////////////////////////////////

const MODULE_NAME = '[GameSystem Controller]';
const GS_CT_ERR_GAMESYSTEM_NOT_FOUND = 'Gamesystem not found';

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

function getGameSystems(req, res) {
    try {
        // Receiving parameters 
        const params = {
            name: req.swagger.params.name.value,
            sort: req.swagger.params.sort.value
        };
        
        // Call to service
        const result = gameSystemService.getGameSystems(params);

        // Returning the result
        res.json(result);
    } catch (error) {
        controllerHelper.handleErrorResponse(MODULE_NAME, getGameSystems.name, error, res);
    }    
}

function getGameSystemById(req, res) {
    try {
        const params = {
            id: req.swagger.params.id.value
        };

        // Call to the service 
        const result = gameSystemService.getGameSystemById(params.id);

        if (!_.isUndefined(result)) {
            res.json(result);
        } else {
            res.status(404).json(messageHelper.buildMessage(GS_CT_ERR_GAMESYSTEM_NOT_FOUND));
        }
    } catch (error) {
        controllerHelper.handleErrorResponse(MODULE_NAME, getGameSystemById.name, error, res);
    }
}

function updateGameSystem(req, res) {
    try {
        const params = {
            id: req.swagger.params.id.value,
        }

        _.assign(params, req.body);

        const result = gameSystemService.updateGameSystem(params);

        if (!_.isUndefined(result) && _.isUndefined(result.error)) {
            res.json(result);
        } else {
            res.status(409).json(messageHelper.buildMessage(result.error));
        }
    } catch (error) {
        controllerHelper.handleErrorResponse(MODULE_NAME, updateGameSystem.name, error, res);
    }    
}

function deleteGameSystem(req, res) {
    try {
        const params = {
            id: req.swagger.params.id.value
        };

        const result =  gameSystemService.deleteGameSystem(params);

        if (!_.isUndefined(result) && _.isUndefined(result.error)) {
            res.json(messageHelper.buildMessage(GS_CT_DELETED_SUCCESSFULLY));
        } else {
            res.status(404).json(messageHelper.buildMessage(result.error));
        }
    } catch (error) {
        controllerHelper.handleErrorResponse(MODULE_NAME, deleteGameSystem.name, error, res);
    }
}

//////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////

module.exports = {
    createGameSystem,
    getGameSystems,
    getGameSystemById,
    updateGameSystem,
    deleteGameSystem
};