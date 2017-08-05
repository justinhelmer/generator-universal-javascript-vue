// Convert the sourcecode of universal-javascript-vue into a workable template
const _ = require('lodash');
const fs = require('fs-extra');
const path = require('path');

const modulePath = path.resolve(__dirname, '../node_modules/universal-javascript-vue');
const templatePath = path.resolve(__dirname, '../app/templates');

fs.remove(templatePath)
  .then(() => fs.copy(modulePath, templatePath))
  .then(() => fs.move(templatePath + '/.npmignore', templatePath + '/.gitignore'))
  .then(() => fs.remove(templatePath + '/package.json'))
  .then(() => templatize('README.md', [
    {
      search: '# Universal JavaScript - Vue',
      replace: '# <%= config.title %>'
    },

    featureWrap('foundation', '- (optional) [Foundation](http://foundation.zurb.com/) integration\n'),
    featureWrap('fontawesome', '- (optional) [Font Awesome](http://fontawesome.io/) integration\n')
  ]))
  .then(() => templatize('config/index.js', [
    {
      search: 'Universal JavaScript - Vue',
      replace: '<%= config.title %>'
    }
  ]))
  .then(() => templatize('config/css-loader.config.js', [
    featureWrap('fontawesome', `alias: {
        '../fonts': path.resolve(__dirname, '../node_modules/font-awesome/fonts'),
      }`
    ),

    featureWrap('foundation', `path.resolve(__dirname, '../node_modules/motion-ui/src'),
        path.resolve(__dirname, '../node_modules/foundation-sites/scss'),`
    ),

    featureWrap('fontawesome', 'path.resolve(__dirname, \'../node_modules/font-awesome/scss\')')
  ]))
  .then(() => templatize('config/webpack.base.config.js', [
    featureWrap('fontawesome', `{ test: /\\.woff(2)?(\\?v=[0-9]\\.[0-9]\\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\\.(ttf|eot|svg)(\\?v=[0-9]\\.[0-9]\\.[0-9])?$/, loader: 'file-loader' }`
    )
  ]))
  .then(() => templatize('src/app.vue', [

    featureWrap('foundation', `beforeMount: function () {
      require('./lib/foundation')();
    }`),

    featureWrap('foundation', `@import \'./css/settings\';
    @import \'foundation\';
    @import \'motion-ui\';

    @include foundation-global-styles;
    @include foundation-menu;
    @include foundation-top-bar;
    @include foundation-xy-grid-classes;
    @include foundation-typography;
    @include foundation-visibility-classes;
    @include foundation-flex-classes;
    @include motion-ui-transitions;
    @include motion-ui-animations;`),

    featureWrap('fontawesome', '@import \'font-awesome\';')
  ]))
  .then(() => templatize('src/components/global/header.vue', [
    featureWrap('foundation', ' class="top-bar"'),
    featureWrap('foundation', ' class="menu"'),
    featureWrap('foundation', '<i class="fa fa-home"></i><span class="show-for-medium">Home</span>', 'Home'),

    featureWrap('foundation', `@import '../../css/settings';

    $white: get-color(white);`, '\n    $white: #fff;')
  ]))
  .then(() => templatize('src/components/home.vue', [
    featureWrap('foundation', ' class="grid-container grid-container-padded"'),
    featureWrap('foundation', ' class="grid-y"'),
    featureWrap('foundation', `@import '../css/settings';

    $black: get-color(black);`, '\n    $black: #000;')
  ]))
  .then(() => templatize('src/components/items.vue', [
    featureWrap('foundation', ' class="grid-container grid-container-padded"'),
    featureWrap('foundation', ' class="grid-y"')
  ]))
  .then(() => templatize('src/components/item.vue', [
    featureWrap('foundation', ' class="grid-container grid-container-padded"'),
    featureWrap('foundation', ' class="grid-y"')
  ]));

function featureWrap(feature, search, disabled) {
  let replace = '<% if (features.' + feature + ') { %>' + search;

  if (disabled) {
    replace += '<% } else { %>' + disabled;
  }

  replace += '<% } %>';

  return { search, replace };
}

function templatize(filepath, replacements) {
  const fullpath = path.join(templatePath, filepath);

  return fs.readFile(fullpath, 'utf8')
    .then(data => {
      let result = data;

      replacements.forEach(replacement => {
        result = result.replace(replacement.search, replacement.replace);
      });

      return result;
    })
    .then(result => fs.writeFile(fullpath, result, 'utf8'));
}
