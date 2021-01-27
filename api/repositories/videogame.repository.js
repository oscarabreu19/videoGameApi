'use strict';

//////////////////////////////////////////////////////
// IMPORTS
//////////////////////////////////////////////////////

const _ = require('lodash');
const shortid = require('shortid');

//////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////

//////////////////////////////////////////////////////
// PROPERTIES
//////////////////////////////////////////////////////

// Define a initial set of gamesystems
let videoGames = [];

//////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
//////////////////////////////////////////////////////

function stripVideoGames(fields, arrayVideoGames) {
    const arrayFields = fields.split(',');

    return _.map(arrayVideoGames, videogame => {
        return _.pick(videogame, arrayFields);
    });
}

function getVideoGameById(videoGameId) {
    return videoGames.find(aVideoGame => aVideoGame.id === videoGameId);
}

function getVideoGames(params) {
    // Make a copy the original array 
    let videoGamesResult = videoGames.slice();

    // Filter by name 
    if (params.name !== undefined) {
        videoGamesResult = _.filter(videoGamesResult, {name: params.name});
    }

    // Filter by developer 
    if (params.developer !== undefined) {
        videoGamesResult = _.filter(videoGamesResult, {developer: params.developer});
    }

    // Filter by gamesystemId 
    if (params.gamesystem !== undefined) {
        videoGamesResult = _.filter(videoGamesResult, {gamesystem: params.gamesystem});
    }

    // Filter by genre 
    if (params.genre !== undefined) {
        videoGamesResult = _.filter(videoGamesResult, {genre: params.genre});
    }

    // Filter by year 
    if (params.year !== undefined) {
        videoGamesResult = _.filter(videoGamesResult, {year: params.year});
    }

    // Order by 
    if (params.sort !== undefined) {
        let direction;
        let fieldName;

        if (_.startsWith(params.sort, '-')) {
            direction = 'desc';
            fieldName = params.sort.substring(1);
        } else {
            direction = 'asc';
            fieldName = params.sort;
        }

        videoGamesResult = _.sortByOrder(videoGamesResult, [fieldName], [direction]);
    }

    // Returning only spesific fields 
    if (params.fields !== undefined) {
        videoGamesResult = stripVideoGames(params.fields, videoGamesResult);
    }

    return videoGamesResult;
}
}

//////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////

module.exports = {
    getVideoGames
};