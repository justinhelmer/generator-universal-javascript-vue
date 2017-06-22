var Generator = require('yeoman-generator');
var path = require('path');

const resolve = (file = '') => path.resolve(__dirname, '../node_modules/universal-javascript-vue', file);

module.exports = class extends Generator {
  copy() {
    const src = resolve();
    const dest = this.destinationRoot();

    this.fs.copy(src + '/**/*', dest, {
      globOptions: {
        dot: true,

        ignore: [
          resolve('node_modules') + '/**/*',
          resolve('.npmignore')
        ],
      }

    });

    this.fs.copy(src + '/.npmignore', dest + '/.gitignore');
  }
};