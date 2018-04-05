'use strict';

var yeoman = require('yeoman-generator');
var mkdirp = require('mkdirp');

module.exports = class extends yeoman {
  prompting() {
    return this.prompt([{
      type    : 'input',
      name    : 'name',
      message : 'Your project name',
      default : this.appname
    }, {
      type    : 'input',
      name    : 'title',
      message : 'Your email title',
      default : 'My awesome email'
    }, {
      type    : 'input',
      name    : 'author',
      message : 'Author name',
      default : 'Awesome author'
    }, {
      type    : 'input',
      name    : 'preview_text',
      message : 'Preview text',
      default : 'Preview text in web client'
    }]).then((answers) => {
      this.props = answers;
    });
  }

  writing() {
    // create assets directories
    mkdirp.sync(process.cwd() + '/src/assets/images/');

    // copy styles
    this.fs.copy(
      this.templatePath('sass/*'),
      this.destinationPath('src/sass/')
    );

    // copy partials
    this.fs.copy(
      this.templatePath('partials/*'),
      this.destinationPath('src/templates/partials/')
    )

    // copy index.nunjucks
    this.fs.copy(
      this.templatePath('index.nunjucks'),
      this.destinationPath('src/templates/index.nunjucks')
    )

    // copy head.nunjucks
    this.fs.copyTpl(
      this.templatePath('head.nunjucks'),
      this.destinationPath('src/templates/partials/head.nunjucks'),
      { title : this.props.title } 
    )

    // copy preheader.nunjucks
    this.fs.copyTpl(
      this.templatePath('preheader.nunjucks'),
      this.destinationPath('src/templates/partials/preheader.nunjucks'),
      { preview_text : this.props.preview_text } 
    )

    // copy gulpfile.js
    this.fs.copy(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js')
    )

    // copy .gitignore
    this.fs.copy(
      this.templatePath('_gitignore'),
      this.destinationPath('.gitignore')
    )

    // copy README.md
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      { title : this.props.title }
    )

    // copy license.txt
    this.fs.copyTpl(
      this.templatePath('license.txt'),
      this.destinationPath('license.txt'),
      { author : this.props.author }
    )

    // copy package.json
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      { name   : this.props.name,
        author : this.props.author,
        title  : this.props.title }
    )
  }
};