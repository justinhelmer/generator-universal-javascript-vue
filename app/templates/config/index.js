module.exports = {
  title: '<%= config.title %>',
  client: {
    foundation: {
      plugins: []
    }
  },
  server: {
    port: process.env.PORT || 3000,
    <% if (features.keystone) { %>keystone: {
      base: '/cms',
      mock: false
    },<% } %>
    <% if (features.proxy) { %>proxy: {
      base: '/api',
      target: '',
      headers: {},
      mock: true
    }<% } %>
  }
};