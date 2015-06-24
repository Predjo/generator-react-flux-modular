'use strict';

var _                 = require('lodash');
var Dispatcher        = require('flux').Dispatcher;

var PayloadSources    = require('../constants/AppConstants').PayloadSources;

var AppDispatcher     = _.assign(new Dispatcher(), {

  /**
   * @param {object} action The details of the action, including the action's
   * type and additional data coming from the server.
   */

  handleServerAction: function(action) {

    var payload = {
      source: PayloadSources.SERVER_ACTION,
      action: action
    };

    this.dispatch(payload);
  },

  /**
   * @param {object} action The details of the action, including the action's
   * type and additional data coming from the view.
   */
  handleViewAction: function(action) {

    var payload = {
      source: PayloadSources.VIEW_ACTION,
      action: action
    };

    this.dispatch(payload);
  },

  //Enables the log of dispacher errors. They are hidden by default which makes life awful.
  register: function(f) {
    return Dispatcher.prototype.register.call(this, this.dispatchLog(f));
  },

  dispatchLog: function(f) {
    return function() {
      try {
        f.apply(this, arguments);
      } catch (e) {
        console.error(e.message, e.stack);
      }
    };
  }

});

module.exports = AppDispatcher;
