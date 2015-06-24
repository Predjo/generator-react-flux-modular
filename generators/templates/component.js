'use strict';

var React = require('react');

var <%= name %> = React.createClass({

  propTypes: {},

  render: function() {
    return (
      <div className="<%= className %>"> </div>
    );
  }
});

module.exports = <%= name %>;
