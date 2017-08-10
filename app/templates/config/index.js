module.exports = {
  title: '<%= config.title %>',
  port: process.env.PORT || 3000,
  api: {
    base: '/api',
    mock: true
  },
  <% if (features.foundation) { %>foundation: {
    plugins: []
  }<% } %>
};