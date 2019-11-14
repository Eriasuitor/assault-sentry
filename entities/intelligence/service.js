const fs = require('fs')
const lodash = require('lodash')
const config = require('../../config')

let intelligences = syncIntelligences()

/**
 * @param {{key: string, type: string, data: JSON}[]} toAdd
 */
exports.report = (toAdd) => {
  intelligences = lodash.concat(toAdd, intelligences)
  intelligences = lodash.uniqBy(intelligences, 'key')
  fs.writeFileSync(config.dataFile, JSON.stringify(intelligences))
}

exports.getIntelligences = () => {
  return intelligences
}

/**
 * @return {any}
 */
function syncIntelligences() {
  return JSON.parse(fs.readFileSync(config.dataFile).toString())
}
