module.exports = app => {
  require('./static')(app);
 <% if (features.keystone) { %> require('../keystone')(app);<% } %>
 <% if (features.proxy) { %> require('../proxy')(app);<% } %>
  require('./app')(app);
};