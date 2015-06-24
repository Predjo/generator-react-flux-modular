'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');

module.exports = generators.NamedBase.extend({
  // The name `constructor` is important here
  constructor: function() {
    // Calling the super constructor is important so our generator is correctly set up
    generators.NamedBase.apply(this, arguments);

    this.argument('componentModule', {type: String, required: true, default: 'main'});
    this.argument('componentApp', {type: String, required: false, default: 'app'});
  },

  prompting: function() {
    var done = this.async();
    this.prompt([{
      type: 'confirm',
      name: 'css',
      message: 'Create css file?',
      default: true,
      store: true
    }], function(answers) {
      this.answers = answers;
      done();
    }.bind(this));
  },

  writing: function() {
    var name = this._formatStruct(this.name)[0];
    var subfolder = this._formatStruct(this.name)[1];

    var jsPath = (this.componentApp) + '/scripts/' + this.componentModule +
      '/components/' + subfolder +
       _.capitalize(_.camelCase(name)) + '.react.jsx';
    var cssPath = (this.componentApp) + '/styles/' + this.componentModule +
      '/components/' + subfolder + '_' +
       _.camelCase(name) + '.scss';

    this.fs.copyTpl(
      this.templatePath('../../templates/component.js'),
      this.destinationPath(jsPath),
      {name: _.capitalize(_.camelCase(name)),
       className: _.kebabCase(name) + '-wrap'
      }
    );

    if (this.answers.css) {
      this.fs.copyTpl(
        this.templatePath('../../templates/componentStyle.scss'),
        this.destinationPath(cssPath),
        {name: _.capitalize(_.camelCase(name)),
         className: _.kebabCase(name)
        }
      );

      this._updateModuleCss(name, subfolder);
    }
  },

  _formatStruct: function(string) {
    var pieces = string.split(/[\/]+/);
    if (pieces.length === 1) {
      pieces.push('');
      return pieces;
    } else {
      return [_.last(pieces), pieces.slice(0, -1).join('/') + '/']
    }
  },

  _updateModuleCss: function(name, subfolder) {
    var moduleCssPath = (this.componentApp) + '/styles/' + this.componentModule + '/_' +
    _.camelCase(this.componentModule) + '.scss';

    if (this.fs.exists(moduleCssPath)) {
      var hook   = '/*===== yeoman hook =====*/';
      var file   = this.fs.read(moduleCssPath);
      var insert = '@import "components/' + subfolder + _.camelCase(name) + '";';

      if (file.indexOf(insert) === -1) {
        this.fs.write(moduleCssPath, file.replace(hook, insert + '\n' + hook));
      }
    } else {
      this.log('Module styles file ' + '_' +
      _.camelCase(this.componentModule) + '.scss' + ' not found.')
    }
  }
});
