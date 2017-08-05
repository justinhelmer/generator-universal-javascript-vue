<% if (features.keystone) { %>const keystone = require('keystone');
require('./models');

keystone.init(require('../config/keystone.config'));
keystone.set('routes', require('./routes'));

keystone.start(() => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('Compiling...');
  }
});<% } else { %>const express = require('express');
const config = require('../config');

const app = express();
require('./routes')(app);

app.listen(config.server.port);<% } %>