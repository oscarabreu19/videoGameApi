'use strict';

const _ = require('lodash');

const messageHelper = require('../helpers/message.helper.js');
const gameSystemRepository = require('../repositories/gamesystem.repository.js');
const videoGameRepository = require('../repositories/videogame.repository.js');

//////////////////////////////////////////////////////
// CONSTANS
//////////////////////////////////////////////////////

const GS_SVC_ERR_CREATE_GS_ALREADY_EXISTS_WITH_SAME_NAME = 'Not possible to create a Game System. There is a Game System with the same name.';
const GS_SVC_ERR_UPDATE_GS_NOT_FOUND_BY_ID = 'Not possible to update gamesystem. There is NOT a gamesystem with the same id to update';
const GS_SVC_ERR_UPDATE_GS_ALREADY_EXISTS_WITH_SAME_NAME = 'Not possible to update gamesystem. There is a gamesystem with the same name to update in the system';
const GS_SVC_ERR_DELETE_GS_NOT_FOUND_BY_ID = 'Not possible to delete gamesystem. Gamesystem not found';
const GS_SVC_ERR_DELETE_VG_EXISTS_ASSOCIATED = 'Not possible to delete gamesystem. There are videogames associated with the gamesystem';

//////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
//////////////////////////////////////////////////////

function getGameSystemByName(name) {
    return gameSystemRepository.getGameSystemByName(name);
}

function createGameSystem(params) {
    // Check if exists a gamesystem with the same name
    const gameSystemFound = getGameSystemByName(params.name);

    if(!_.isUndefined(gameSystemFound))
        return messageHelper.buildErrorMessage(GS_SVC_ERR_CREATE_GS_ALREADY_EXISTS_WITH_SAME_NAME);

    return gameSystemRepository.createGameSystem(params);
}

function getGameSystems(params) {
    return gameSystemRepository.getGameSystems(params);
}

function getGameSystemById(id) {
    return gameSystemRepository.getGameSystemById(id);
}

function updateGameSystem(params) {
    const gameSystemFoundById = getGameSystemById(params.id);

    // Checking if the Game System Id don't exists 
    if (_.isUndefined(gameSystemFoundById))
        return messageHelper.buildErrorMessage(GS_SVC_ERR_UPDATE_GS_NOT_FOUND_BY_ID)

    const gameSystemFoundByName = getGameSystemByName(params.name);

    if (_.isUndefined(gameSystemFoundByName) || gameSystemFoundByName.id === params.id) {
        return gameSystemRepository.updateGameSystem(params);        
    } else {
        return messageHelper.buildErrorMessage(GS_SVC_ERR_UPDATE_GS_ALREADY_EXISTS_WITH_SAME_NAME);
    }
}

//////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////

module.exports = {
    GS_SVC_ERR_CREATE_GS_ALREADY_EXISTS_WITH_SAME_NAME,
    createGameSystem,
    getGameSystems,
    getGameSystemByName,
    getGameSystemById,
    updateGameSystem
};