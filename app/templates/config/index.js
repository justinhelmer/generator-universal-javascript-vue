module.exports = {
  title: '<%= config.title %>',
  client: {
    foundation: {
      plugins: []
    }
  },
  server: {
    port: process.env.PORT || 3000,
    keystone: {
      base: '/cms',
      mock: false
    },
    proxy: {
      base: '/api',
      target: '',
      headers: {},
      mock: true
    }
  }
};