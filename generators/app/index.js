'use strict';

var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  // The name `constructor` is important here
  constructor: function() {
    // Calling the super constructor is important so our generator is correctly set up
    generators.Base.apply(this, arguments);

    this.argument('appname', {type: String, required: true});
    //this.appname = this._.camelize(this.appname);
    this.log(this.appname);

    this.scriptSuffix = (this.options.coffee ? '.coffee' : '.js');

    this.log(this.scriptSuffix);

    //this.option('coffee'); // This method adds support for a `--coffee` flag
  },

  prompting: function() {
    var done = this.async();
    this.prompt([{
      type: 'input',
      name: 'name',
      message: 'Your project name',
      default: this.appname // Default to current folder name
    },{
      type: 'input',
      name: 'type',
      message: 'Your project type',
      default: this.appname // Default to current folder name
    }], function(answers) {
      this.log(answers.name);
      this.answers = answers;
      done();
    }.bind(this));
  },

  paths: function() {
    this.log(this.destinationRoot());

    // returns '~/projects'

    this.log(this.destinationPath('index.js'));

    // returns '~/projects/index.js'
  },

  writing: function() {
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('public/index.html'),
      {title: this.answers.type}
    );
  }
});
