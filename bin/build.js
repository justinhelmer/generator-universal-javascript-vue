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

    featureWrap('foundation', '- _(optional)_ Full [Foundation](http://foundation.zurb.com/) integration\n'),
    featureWrap('fontawesome', '- _(optional)_ Full [Font Awesome](http://fontawesome.io/) integration\n'),
    featureWrap('keystone', '- _(optional)_ Full content management system (CMS) built on [KeystoneJS](http://keystonejs.com/)\n'),
    featureWrap('proxy', '- _(optional)_ Centralized API proxy using [Axios](https://github.com/vuejs/vuex), with ready-to-go [data prefetching](https://ssr.vuejs.org/en/data.html) and a built-in mock server using [JSON Server](https://github.com/typicode/json-server).\n'),

    featureWrap('foundation', `client: {
    // only applicable if using Foundation (yeoman generator option)
    foundation: {
      plugins: [] // JS plugins to bundle with the client
    }
  },`),

    featureWrap('keystone', `// only applicable if using KeystoneJS (yeoman generator option)
    keystone: {
      base: '/cms',
      mock: false
    },`),

    featureWrap('proxy', `// only applicable if using the API proxy (yeoman generator option)
    proxy: {
      base: '/api',
      target: 'https://api.example-host.com',
      headers: {},
      mock: true
    }`),
  ]))
  .then(() => templatize('config/index.js', [
    {
      search: 'Universal JavaScript - Vue',
      replace: '<%= config.title %>'
    },

    featureWrap('foundation', `client: {
    foundation: {
      plugins: [] // JS plugins to bundle with the client
    }
  },`),

    featureWrap('keystone', `keystone: {
      base: '/cms',
      mock: false
    },`),

    featureWrap('proxy', `proxy: {
      base: '/api',
      target: '',
      headers: {},
      mock: true
    }`),
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
      require('./lib/foundation')({
        plugins: config.client.foundation.plugins || []
      });
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
    featureWrap('keystone', `<div class="top-bar-right">
                <ul class="menu align-right">
                    <li>
                        <a href="/keystone">
                            <i class="fa fa-cog"></i><span class="show-for-medium">Admin Dashboard</span>
                        </a>
                    </li>
                </ul>
            </div>`),

    featureWrap('foundation', ' class="top-bar"'),
    featureWrap('foundation', ' class="top-bar-left"'),
    featureWrap('foundation', ' class="top-bar-right"'),
    featureWrap('foundation', ' class="menu"'),
    featureWrap('foundation', ' class="menu align-right"'),
    featureWrap('foundation', '<i class="fa fa-home"></i><span class="show-for-medium">Home</span>', 'Home'),
    featureWrap('foundation', '<i class="fa fa-cog"></i><span class="show-for-medium">Admin Dashboard</span>', 'Admin Dashboard'),

    featureWrap('foundation', `@import '../../css/settings';

    $white: get-color(white);

    a {  color: $white;  }
    i { margin-right: 1em; }

    @include breakpoint(small only) {
        .menu.align-right li:last-child i {
            margin: 0;
        }
    }`),
  ]))
  .then(() => templatize('src/components/home.vue', [
    featureWrap('foundation', ' class="grid-container grid-container-padded"'),
    featureWrap('foundation', ' class="grid-y"'),
    featureWrap('foundation', `@import '../css/settings';

    $black: get-color(black);`, '\n    $black: #000;')
  ]))
  .then(() => templatize('src/components/items.vue', [
    featureWrap('keystone', '/cms/item', '/api/item'),
    featureWrap('foundation', ' class="grid-container grid-container-padded"'),
    featureWrap('foundation', ' class="grid-y"')
  ]))
  .then(() => templatize('src/components/item.vue', [
    featureWrap('keystone', '/cms/item', '/api/item'),
    featureWrap('foundation', ' class="grid-container grid-container-padded"'),
    featureWrap('foundation', ' class="grid-y"')
  ]))
  .then(() => templatize('server/index.js', [
    featureWrap('keystone', `const keystone = require('keystone');
require('./models');

keystone.init(require('../config/keystone.config'));
keystone.set('routes', require('./routes'));

keystone.start(() => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('Compiling...');
  }
});`, `const express = require('express');
const config = require('../config');

const app = express();
require('./routes')(app);

app.listen(config.server.port);`)
  ]))
  .then(() => templatize('server/routes/index.js', [
    featureWrap('keystone', ' require(\'../keystone\')(app);'),
    featureWrap('proxy', ' require(\'../proxy\')(app);'),
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
