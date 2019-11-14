const joi = require('joi')
const IntelligenceController = require('./controller')
const {validateSchemas} = require('../../utils/middleware')
const {IntelligenceSchema} = require('../../schema/intelligence')
// eslint-disable-next-line no-unused-vars
const express = require('express')

/**
 * @param {express.application} app
 */
exports.router = (app) => {
  app.get(
      '/intelligences',
      validateSchemas({
        schema: joi.any()
      },
      IntelligenceController.getIntelligences,
      {
        schema: joi.array().items(IntelligenceSchema())
      }
      )
  )

  app.post(
      '/intelligences',
      validateSchemas({
        schema: joi.array().items(IntelligenceSchema())
      },
      IntelligenceController.report,
      {
        schema: joi.any()
      }
      )
  )
}
