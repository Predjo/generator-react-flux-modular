'use strict';

var AppDispatcher  = require('../../dispatcher/AppDispatcher');
var ActionTypes    = require('../../constants/ModuleConstants').ActionTypes;

var ActionCreator  = {

  initializeData: function(data, dataType) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.INITIALIZE_DATA,
      data: data,
      dataType: dataType
    });
  }

}

module.exports = ActionCreator;
