'use strict';

var _            = require('lodash');
var CHANGE_EVENT = 'change';

var BaseStore    = {

  _state: {
    initialized: false,
    data: null,
    error: null
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
    this.setMaxListeners(15);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  reset: function() {
    this._state = {
      initialized: false,
      data: null,
      error: null
    };
  },

  isInitialized: function() {
    return this._state.initialized;
  },

  initialize: function(dataSource) {
    this._state.initialized = true;
    this.setState({
      data: _.cloneDeep(dataSource)
    });
  },

  getAll: function() {
    return this._state.data;
  },

  getState: function() {
    return this._state;
  },

  setState: function(state) {
    _.assign(this._state, state);
  },

  findItemById: function(id) {
    return _.find(this._state.data, {
      id: Number(id)
    });
  },

  updateItem: function(data) {
    var item = this.findItemById(data.id);

    item = _.merge(item, data);
  },

  setOption: function(item, option, value) {
    var options = {
      options: {}
    };

    options.options[option] = value;

    item = _.merge(item, options);
  },

  getByOption: function(option, value) {
    return _.filter(this._state.data, function(item) {
      return item.options && item.options[option] === value;
    });
  },

  addItem: function(data) {
    this._state.data.push(data);
  },

  addMultipleItems: function(data) {
    _.map(data, function(item) {
      this.addItem(item);
    }.bind(this));
  },

  removeItem: function(data) {
    _.remove(this._state.data, function(item) {
      return _.isEqual(item.id, data.id);
    });
  },

  removeItemById: function(id) {
    _.remove(this._state.data, function(item) {
      return item.id === id;
    });
  },

  error: function(error) {
    this._state.error = error;
  },

  sort: function(data, atribute) {
    if (atribute) {
      var sortBy = atribute;
      var field;
      var getter;
      var sign = 1;

      if (_.isFunction(sortBy)) {
        getter = sortBy;
      } else if (sortBy.indexOf('-') === 0) {
        field = sortBy.replace(/^-/, '');
        sign = -1;
      } else {
        field = sortBy;
      }

      return _.sortBy(data, function(item) {
        var sortValue = getter ? getter(item) : item[field];
        if (_.isString(sortValue)) {
          sortValue = sortValue.toLowerCase();
        } else if (_.isNumber(sortValue)) {
          sortValue = sortValue * sign;
        }

        return sortValue;
      }.bind(this));

    } else {
      return data;
    }
  }
};

module.exports = BaseStore;
