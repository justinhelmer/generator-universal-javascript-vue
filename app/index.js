const _ = require('lodash');
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
        }
      ])
      .then(answers => {
        this.config = _.pick(answers, ['name', 'title']);
        this.features = _.pick(answers, ['foundation', 'fontawesome']);
      })
  }

  write() {
    this.fs.copyTpl(
      this.templatePath('**/*.!(png)'),
      this.destinationPath(),
      { config: this.config, features: this.features }
    );

    this.fs.copy(this.templatePath('**/*.png'), this.destinationPath());

    if (!this.features.foundation) {
      this.fs.delete(this.destinationPath('src/lib/foundation.js'));
      this.fs.delete(this.destinationPath('src/css/_settings.scss'));
    }
  }

  createPackage() {
    const pkg = require('universal-javascript-vue/package.json');
    let dependencies = pkg.dependencies;
    let devDependencies = pkg.devDependencies;

    if (!this.features.fontawesome) {
      devDependencies = _.omit(devDependencies, ['font-awesome', 'url-loader']);
    }

    this.fs.write(this.destinationPath('package.json'), `{
  "name": "` + this.config.name + `",
  "version": "0.0.1",
  "scripts": ` + JSON.stringify(pkg.scripts) + `,
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