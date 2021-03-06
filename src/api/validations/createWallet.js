const Joi = require('joi').extend(require('@joi/date'));

module.exports = async (req, res, next) => {
    try {
        const schema = Joi.object({
            name: Joi.string().min(7).trim().required(),
            cpf: Joi.string().length(11).alphanum().trim().required(),
            birthdate: Joi.date().format('DD/MM/YYYY').raw().required(),
            email: Joi.string().email().trim().required(),
            password: Joi.string().min(6).trim().required()
        });

        const { error } = await schema.validate(req.body, { abortEarly: true });
        if(error) throw error;
        
        return next();
    } catch (err) {
        return res.status(400).json({
            name: err.details[0].context.label,
            description: err.message
        });
    }
}