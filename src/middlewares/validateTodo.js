const joi = require("joi")
const AppError = require('../utils/AppError')
const todoSchema = joi.object({
    title:
        joi.string().trim().required(),
    completed:
        joi.boolean().required()
})

const validateCreateTodo = (req, res, next) => {
    const { error } = todoSchema.validate(req.body)
    if (error) {
        const errorMessage = error.details[0].message
        return next(new AppError(errorMessage, 400))
    }
    next()
}
module.exports = { validateCreateTodo }