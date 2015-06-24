'use strict';

var _             = require('lodash');
var EventEmitter  = require('events').EventEmitter;

var AppDispatcher = require('../../dispatcher/AppDispatcher');
var BaseStore     = require('../../mixins/BaseStore');

var ActionTypes   = require('../constants/ModuleConstants').ActionTypes;

var DataStore     = _.assign({}, BaseStore, EventEmitter.prototype, {

  _state: {
    data: null
  }

});

DataStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch (action.type) {

    case ActionTypes.INITIALIZE_DATA:

      DataStore.initialize(action.data);
      DataStore.emitChange();

      break;
  }

});

module.exports = DataStore;
