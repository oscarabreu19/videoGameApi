'use strict';

//////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////

const TITLE_ERROR = 'error';
const TITLE_MESSAGE = 'message';

//////////////////////////////////////////////////////
// PRIVATE FUNCTIONS
//////////////////////////////////////////////////////

function buildGenericMessage(nameMessage, textMessage) {
    let jsonMessageResult = [];
    jsonMessageResult[nameMessage] = textMessage;
    return jsonMessageResult;
}

//////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
//////////////////////////////////////////////////////

function buildErrorMessage(text) {
    const jsonErrorMessage = buildGenericMessage(TITLE_ERROR, text);
    return jsonErrorMessage;
}

function buildMessage(text) {
    const jsonErrorMessage = buildErrorMessage(TITLE_MESSAGE, text);
    return jsonErrorMessage;
}

//////////////////////////////////////////////////////
// MODULE EXPORTS
//////////////////////////////////////////////////////

module.exports = {
    buildErrorMessage,
    buildMessage,
    // for testing
    buildGenericMessage
};