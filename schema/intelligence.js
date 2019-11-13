const joi = require('joi')
const { IntelligenceType, IntelligenceLevel } = require('../enum/intelligence')

exports.ButtonSchema = () => joi.object().keys({
    type: joi.string(),
    title: joi.string(),
    valueType: joi.string(),
    callbackUrl: joi.string(),
    level: joi.string().valid(...Object.values(IntelligenceLevel)).default(IntelligenceLevel.Info)
}).required('type')

exports.IntelligenceSchema = () => joi.object().keys({
    key: joi.string(),
    type: joi.string().valid(...Object.values(IntelligenceType)),
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
    key: joi.string(),
    values: joi.string(),
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
                exports.buttonSchema()
            )
        })
    ),
    buttons: joi.array().items(exports.buttonSchema())
})