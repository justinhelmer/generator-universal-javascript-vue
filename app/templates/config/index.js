module.exports = {
  title: '<%= config.title %>',
  port: process.env.PORT || 3000,
  api: {
    base: '/api',
    <% if (features.keystone) { %>mock: false<% } else { %>mock: true<% } %>
  },
  <% if (features.foundation) { %>foundation: {
    plugins: []
  }<% } %>
};