const IntelligenceService = require('./service')
// eslint-disable-next-line no-unused-vars
const express = require('express')

/**
 * @param {express.request} req
 */
exports.getIntelligences = async (req) => {
  return IntelligenceService.getIntelligences()
}

/**
 * @param {express.request} req
 */
exports.report = async (req) => {
  return IntelligenceService.report(req.body)
}
