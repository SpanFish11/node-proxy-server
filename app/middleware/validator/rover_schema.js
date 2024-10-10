import Joi from "joi";

const roverSchema = Joi.object({
    user_id: Joi.string()
        .required()
        .messages({
            'string.empty': 'user_id cannot be empty',
            'any.required': 'user_id is required',
        }),
    user_name: Joi.string()
        .required()
        .messages({
            'string.empty': 'user_name cannot be empty',
            'any.required': 'user_name is required',
        }),
    api_key: Joi.string()
        .required()
        .messages({
            'string.empty': 'api_key cannot be empty',
            'any.required': 'api_key is required',
        }),
}).unknown();

export {roverSchema};