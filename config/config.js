const path = require('path')

module.exports = {
  app: {
    port: 9878
  },
  jwt: {
    key: 'xxx',
    expiresIn: '1d'
  },
  database: {
    username: 'root',
    password: null,
    database: 'assault-sentry',
    host: '127.0.0.1',
    dialect: 'mysql',
    define: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci'
    }
  },
  dataFile: path.resolve('intelligences.json'),
  preference: {}
}
