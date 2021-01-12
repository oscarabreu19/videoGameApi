'use strict';

const _ = require('lodash');

const messageHelper = require('../helpers/message.helper.js');
const gameSystemRepository = require('../repositories/gamesystem.repository.js');

//////////////////////////////////////////////////////
// CONSTANS
//////////////////////////////////////////////////////



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
    createGameSystem,
    getGameSystemByName
};