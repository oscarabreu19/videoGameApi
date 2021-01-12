'use strict';

const _ = require('lodash');

const messageHelper = require('../helpers/message.helper.js');
const gameSystemRepository = require('../repositories/gamesystem.repository.js');

//////////////////////////////////////////////////////
// CONSTANS
//////////////////////////////////////////////////////

const GS_SVC_ERR_CREATE_GS_ALREADY_EXISTS_WITH_SAME_NAME = 'Not possible to create a Game System. There is a Game with the same name.';

//////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
//////////////////////////////////////////////////////

function getGameSystemByName(name) {
    return gameSystemRepository.getGameSystemByName(name);
}

function createGameSystem(params) {
    // TODO: Este metodo tiene que ir al repositorio a crear un nuevo Game System
    params.id = 123;
    return params;
}


//////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////

module.exports = {
    GS_SVC_ERR_CREATE_GS_ALREADY_EXISTS_WITH_SAME_NAME,
    createGameSystem,
    getGameSystemByName
};