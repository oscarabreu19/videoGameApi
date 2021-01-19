'use strict';

const _ = require('lodash');
const shortid = require('shortid');

//////////////////////////////////////////////////////
// PROPERTIES
//////////////////////////////////////////////////////

// Define a initial set of gamesystems
let gamesystems = [];

//////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
//////////////////////////////////////////////////////

function getGameSystemById(id) {
    return gamesystems.find(element => {
        return element.id === id;
    });
}

function getGameSystemByName(name) {
    return gamesystems.find(element => {
        return element.name === name;
    });
}

function createGameSystem(gameSystemToCreate) {
    const newGameSystem = {
        id: shortid.generate(),
        name: gameSystemToCreate.name,
        description: gameSystemToCreate.description,
        image: gameSystemToCreate.image
    };

    gamesystems.push(newGameSystem);

    return getGameSystemById(newGameSystem.id);
}

function getGameSystems(params) {
    let gameSystemResult = gamesystems.slice();

    // Filter by name 
    if (params.name !== undefined) {
        gameSystemResult = _.filter(gamesystems, {name: params.name});
    }

    // Order by name 
    if (params.sort !== undefined) {
        if (params.sort === 'name') {
            gameSystemResult = _.sortByOrder(gameSystemResult, ['name'], ['asc']);
        } else if(params.sort === '-name') {
            gameSystemResult = _.sortByOrder(gameSystemResult, ['name'], ['desc']);
        }
    }

    return gameSystemResult;
}

function updateGameSystem(newGameSystem) {
    const gameSystemToUpdate = getGameSystemById(newGameSystem.id);

    if (!_.isUndefined(gameSystemToUpdate)) {
        gameSystemToUpdate.name = newGameSystem.name;
        gameSystemToUpdate.description = newGameSystem.description;
        gameSystemToUpdate.image = newGameSystem.image;
    }

    return gameSystemToUpdate;
}

//////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////

module.exports = {
    getGameSystemByName,
    getGameSystemById,
    getGameSystems,
    createGameSystem,
    updateGameSystem
};