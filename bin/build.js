// Convert the sourcecode of universal-javascript-vue into a workable template
const _ = require('lodash');
const fs = require('fs-extra');
const path = require('path');

const modulePath = path.resolve(__dirname, '../node_modules/universal-javascript-vue');
const templatePath = path.resolve(__dirname, '../app/templates');

fs.remove(templatePath)
  .then(() => fs.copy(modulePath, templatePath))
  .then(() => fs.remove(templatePath + '/package.json'))
  .then(() => templatize('README.md', [
    {
      search: '# Universal JavaScript - Vue',
      replace: '# <%= config.title %>'
    },

    featureWrap('foundation', '- _(optional)_ Full [Foundation](http://foundation.zurb.com/) integration\n'),
    featureWrap('fontawesome', '- _(optional)_ Full [Font Awesome](http://fontawesome.io/) integration\n'),
    featureWrap('keystone', '- _(optional)_ Full content management system (CMS) built on [KeystoneJS](http://keystonejs.com/), including API routes for authenticating and retrieving data\n'),

    featureWrap('keystone', 'If using [KeystoneJS](http://keystonejs.com/), you must also install [MongoDB](https://docs.mongodb.com/manual/installation/).\n'),
    featureWrap('keystone', `#### If using [KeystoneJS](http://keystonejs.com/) (yeoman generator option):

When serving in **production** mode, the assumption is that a \`mongo\` instance is already running, at the url specified by \`config/keystone.config.js\`:

\`\`\`js
module.exports = {
  // ...
  'mongo': 'mongodb://localhost:27017/' + pkg.name,
  // ...
};
\`\`\`

You can also launch the a local \`mongo\` instance using:

\`\`\`bash
npm run db
\`\`\`
> Simply an alias for \`mongod\`
`),

    featureWrap('foundation', `// only applicable if using Foundation (yeoman generator option)
  foundation: {
    plugins: [] // JS plugins to bundle with the client
  }`),

    featureWrap('keystone', '- `config/keystone.config.js` - configuration passed to [KeystoneJS](http://keystonejs.com/docs/configuration/), if enabled\n')
  ]))
  .then(() => templatize('config/index.js', [
    {
      search: 'Universal JavaScript - Vue',
      replace: '<%= config.title %>'
    },

    featureWrap('foundation', `foundation: {
    plugins: []
  }`),

    featureWrap('keystone', 'mock: false', 'mock: true')
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
        plugins: config.foundation.plugins || []
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
    @include foundation-forms;
    @include foundation-button;
    @include foundation-visibility-classes;
    @include foundation-flex-classes;
    @include motion-ui-transitions;
    @include motion-ui-animations;`),

    featureWrap('foundation', `h1 {
        border-bottom: $hr-border;
    }

    .content {
        background: $white;
        border: 1px solid $light-gray;
        max-width: $global-width;
        margin: 0 auto;

        @include -zf-breakpoint-value('auto', $grid-container-padding) {
            padding: 0 rem-calc($-zf-bp-value) / 2
        }
    }`),

    featureWrap('fontawesome', '@import \'font-awesome\';')
  ]))
  .then(() => templatize('src/components/global/header.vue', [
    featureWrap('foundation', ' class="top-bar"'),
    featureWrap('foundation', ' class="top-bar-left"'),
    featureWrap('foundation', ' class="top-bar-right"'),
    featureWrap('foundation', ' class="menu"'),
    featureWrap('foundation', ' class="menu align-right"'),
    featureWrap('foundation', '<i class="fa fa-home"></i><span class="show-for-medium">Home</span>', 'Home'),
    featureWrap('foundation', '<i class="fa fa-user"></i><span class="show-for-medium">Profile</span>', 'Profile'),
    featureWrap('foundation', '<i class="fa fa-sign-in"></i><span class="show-for-medium">Login</span>', 'Login'),
    featureWrap('foundation', '<i class="fa fa-sign-out"></i><span class="show-for-medium">Logout</span>', 'Logout'),

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
    featureWrap('foundation', ' class="content"'),
    featureWrap('foundation', ' class="button"')
  ]))
  .then(() => templatize('src/components/items.vue', [
    featureWrap('keystone', '/cms/item', '/api/item'),
    featureWrap('foundation', ' class="content"')
  ]))
  .then(() => templatize('src/components/item.vue', [
    featureWrap('keystone', '/cms/item', '/api/item'),
    featureWrap('foundation', ' class="content"'),
    featureWrap('foundation', ' class="button"')
  ]))
  .then(() => templatize('src/components/login.vue', [
    featureWrap('foundation', ' class="content"')
  ]))
  .then(() => templatize('src/components/profile.vue', [
    featureWrap('foundation', ' class="content"'),
    featureWrap('keystone', '<a v-if="user.canAccessKeystone" href="/keystone/signin" class="button">Admin Dashboard</a>')
  ]))
  .then(() => templatize('server/index.js', [
    featureWrap('keystone', `const keystone = require('keystone');
require('./keystone/models');

keystone.init(require('../config/keystone.config'));
keystone.set('routes', require('./routes'));

keystone.start();`, `const express = require('express');
const config = require('../config');

const app = express();
require('./routes')(app);

app.listen(config.port);`)
  ]))
  .then(() => templatize('server/routes/api/index.js', [
    featureWrap('keystone', 'require(\'./query\')(app, base);')
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
