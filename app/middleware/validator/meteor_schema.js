import Joi from "joi";

const meteorSchema = Joi.object({
    date: Joi.string()
        .isoDate()
        .optional()
        .messages({
            'string.isoDate': 'date must be in ISO format YYYY-MM-DD'
        }),
    count: Joi.string()
        .valid('true', 'false')
        .optional()
        .messages({
            'any.only': 'count must be either true or false',
            'string.empty': 'count cannot be empty',
        }),
    wereDangerousMeteors: Joi.string()
        .valid('true', 'false')
        .optional()
        .messages({
            'any.only': 'wereDangerousMeteors must be either true or false',
            'string.empty': 'wereDangerousMeteors cannot be empty',
        }),
}).unknown();

export {meteorSchema};