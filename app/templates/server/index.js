<% if (features.keystone) { %>const keystone = require('keystone');
require('./keystone/models');

keystone.init(require('../config/keystone.config'));
keystone.set('routes', require('./routes'));

keystone.start();<% } else { %>const express = require('express');
const config = require('../config');

const app = express();
require('./routes')(app);

app.listen(config.port);<% } %>