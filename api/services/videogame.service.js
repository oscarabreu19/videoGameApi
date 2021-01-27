'use strict';

//////////////////////////////////////////////////////
// IMPORTS
//////////////////////////////////////////////////////

// External 
const _ = require('lodash');

// Internal
const gameSystemService = require('../services/gamesystem.service.js');
const messageHelper = require('../helpers/message.helper.js');
const videoGameRepository = require('../repositories/videogame.repository.js');

//////////////////////////////////////////////////////
// CONSTANS
//////////////////////////////////////////////////////

const VG_SVC_ERR_CREATE_VG_GAMESYSTEM_NOT_FOUND = 'Gamesystem not found inserting a new videogame';
const VG_SVC_ERR_CREATE_VG_ALREADY_EXISTS_WITH_SAME_NAME = 'Not possible to create videogame. Videogame exists yet for the same gamesystem';

//////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
//////////////////////////////////////////////////////

function createVideoGame(params) {
    // Verificamos que exista el Game System por nombre
    const gameSystemFoundByName = gameSystemService.getGameSystemByName(params.gamesystem);

    // Si no existe se envia el mensaje de error y no se continua
    if (_.isUndefined(gameSystemFoundByName))
        return messageHelper.buildErrorMessage(VG_SVC_ERR_CREATE_VG_GAMESYSTEM_NOT_FOUND);

    // TODO: [OG]: ESTO DEBE CAMBIARSE PARA QUE SE GUARDE SIEMPRE EL ID Y NO EL NOMBRE
    // Si existe un Video Game con el mismo Game System ya creado
    const videoGamesFoundByNameAndGameSystem = videoGameRepository.getVideoGames({name: params.name, gamesystem: gameSystemFoundByName.name});

    // si existe se envia un mensaje de error 
    if (videoGamesFoundByNameAndGameSystem.length !== 0)
        return messageHelper.buildErrorMessage(VG_SVC_ERR_CREATE_VG_ALREADY_EXISTS_WITH_SAME_NAME);

    // si no existe se crea el nuevo Video Game 
    return videoGameRepository.createVideoGame(params);

}

//////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////

module.exports = {
    createVideoGame
};