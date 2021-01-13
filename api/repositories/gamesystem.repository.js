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

//////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////

module.exports = {
    getGameSystemByName,
    getGameSystemById,
    createGameSystem
};