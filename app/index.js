const _ = require('lodash');
const chalk = require('chalk');
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  inquire() {
    return this
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Project name',
          default: this.appname // current folder name
        },
        {
          type: 'input',
          name: 'title',
          message: 'Site name',
          default: 'My Cool Site'
        },
        {
          type: 'confirm',
          name: 'foundation',
          message: 'Would you like to include Foundation integration?'
        },
        {
          type: 'confirm',
          name: 'fontawesome',
          message: 'Would you like to include Font Awesome integration?'
        },
        {
          type: 'confirm',
          name: 'keystone',
          message: 'Would you like to include Keystone CMS integration?'
        }
      ])
      .then(answers => {
        this.config = _.pick(answers, ['name', 'title']);
        this.features = _.pick(answers, ['foundation', 'fontawesome', 'keystone']);
      })
  }

  write() {
    this.fs.copyTpl(
      this.templatePath('{.*,*/**}'), // matches all files, including root dotfiles
      this.destinationPath(),
      { config: this.config, features: this.features },
      null,
      {
        globOptions: {
          // public directory contains binary assets (i.e. images) that will throw EJS error if passed to copyTpl()
          ignore: this.templatePath('public/**')
        }
      }
    );

    this.fs.copy(this.templatePath('public/**'), this.destinationPath('public'));

    if (!this.features.foundation) {
      this.fs.delete(this.destinationPath('src/lib/foundation.js'));
      this.fs.delete(this.destinationPath('src/css/_settings.scss'));
    }

    if (!this.features.keystone) {
      this.fs.delete(this.destinationPath('bin/start-all-servers.js'));
      this.fs.delete(this.destinationPath('config/keystone.config.js'));
      this.fs.delete(this.destinationPath('server/keystone'));
      this.fs.delete(this.destinationPath('server/routes/api/query.js'));
    }
  }

  createPackage() {
    const pkg = require('universal-javascript-vue/package.json');
    let dependencies = pkg.dependencies;
    let devDependencies = pkg.devDependencies;
    let scripts = pkg.scripts;

    if (!this.features.keystone) {
      dependencies = _.omit(dependencies, ['connect-mongo', 'keystone', 'mongodb']);
      scripts.dev = 'node server';
    }

    if (!this.features.foundation) {
      devDependencies = _.omit(devDependencies, ['foundation-sites', 'motion-ui']);
    }

    if (!this.features.fontawesome) {
      devDependencies = _.omit(devDependencies, ['font-awesome', 'url-loader']);
    }

    this.fs.write(this.destinationPath('package.json'), `{
  "name": "` + this.config.name + `",
  "version": "0.0.1",
  "scripts": ` + JSON.stringify(scripts) + `,
  "dependencies": ` + JSON.stringify(dependencies) + `,
  "devDependencies": ` + JSON.stringify(devDependencies) + `
}`);
  }

  install() {
    this.installDependencies({ npm: true, bower: false, yarn: false, callback: () => {
      this.log('Done! Use `npm run dev` to launch the application')
    }});
  }
};