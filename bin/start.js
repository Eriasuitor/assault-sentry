const app = require('../app')
const config = require('../config')
const Logger = require('../utils/logger')
const mkdirp = require('mkdirp')

mkdirp.sync(config.dataFile)
app.listen(config.app.port, () => Logger.info('server started', {port: config.app.port}))
