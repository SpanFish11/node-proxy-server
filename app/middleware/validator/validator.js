import Exception from "../../utils/exception.js";

const validateBody = (schema) => validate(schema, req => req.body);

const validateQuery = (schema) => validate(schema, req => req.query);

const validate = (schema, getData) => {
    return (req, res, next) => {
        schema.validate(schema, getData(req), {abortEarly: false});

        const {error} = schema.validate(req.query, {abortEarly: false});

        if (error) {
            throw new Exception(400, 'Validation Error', error.details.map(detail => ({
                field: detail.context.label,
                message: detail.message,
            })));
        }

        next();
    }
}

export {validateBody, validateQuery}