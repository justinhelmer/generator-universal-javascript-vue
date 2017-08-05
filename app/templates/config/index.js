require('dotenv').load();

module.exports = {
  template: {
    title: '<%= config.title %>'
  },
  proxy: {
    target: '',
    headers: {},
    mock: true
  }
};