const fs = require('fs')
const lodash = require('lodash')
const config = require('../../config')

/**
 * @param {{key: string, type: 'map' | 'boolean' | 'item', data: JSON}[]}
 */
exports.report = (intelligences) => {
  const existed = exports.getIntelligences()
  existed = lodash.concat(intelligences, existed)
  existed = lodash.uniqBy(existed, 'key')
  fs.writeFileSync(config.dataFile, JSON.stringify(existed))
}

exports.getIntelligences = () => {
    return fs.readFileSync(config.dataFile).toJSON()
}