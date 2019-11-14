const joi = require('joi')
const {IntelligenceType, IntelligenceLevel} = require('../enum/intelligence')

exports.ButtonSchema = () => joi.object().keys({
  type: joi.string(),
  title: joi.string(),
  callback: joi.object().keys({
    url: joi.string(),
    method: joi.string().valid('GET', 'PUT', 'POST', 'DELETE').uppercase().default('GET'),
    noQuestion: joi.boolean().default(false).description('invoke api directly with default params'),
    defaultParams: joi.object().default({}),
    params: joi.array().items(
        joi.object().keys({
          title: joi.string(),
          type: joi.string(),
          key: joi.string()
        })
    ),
    confirmTitle: joi.string()
  }).requiredKeys('url', 'method'),
  level: joi.string().valid(...Object.values(IntelligenceLevel)).default(IntelligenceLevel.Info)
}).required('type')

exports.IntelligenceSchema = () => joi.object().keys({
  key: joi.string(),
  type: joi.string().valid(...Object.values(IntelligenceType)),
  expiredAt: joi.date(),
  data: joi
      .when('type',
          {
            is: joi.string().equal(IntelligenceType.Map),
            then: exports.MapIntelligenceDataSchema()
          }
      )
      .when('type',
          {
            is: joi.string().equal(IntelligenceType.Boolean),
            then: exports.BooleanIntelligenceDataSchema()
          }
      )
      .when('type',
          {
            is: joi.string().equal(IntelligenceType.Item),
            then: exports.ItemIntelligenceDataSchema()
          }
      )
}).requiredKeys('key', 'type', 'data')

exports.MapIntelligenceDataSchema = () => joi.object().keys({
  title: joi.string(),
  value: joi.number(),
  suffix: joi.string(),
  level: joi.string().valid(...Object.values(IntelligenceLevel)).default(IntelligenceLevel.Success)
})

exports.BooleanIntelligenceDataSchema = () => joi.object().keys({
  title: joi.string(),
  success: joi.boolean(),
  desc: joi.object({
    success: joi.object().default('正常'),
    failed: joi.string().default('异常')
  }).default({})
})

exports.ItemIntelligenceDataSchema = () => joi.object().keys({
  maps: joi.array().items(exports.MapIntelligenceDataSchema()),
  items: joi.array().items(
      joi.object().keys({
        title: joi.string(),
        buttons: joi.array().items(
            exports.ButtonSchema()
        )
      })
  ),
  buttons: joi.array().items(exports.ButtonSchema())
})
