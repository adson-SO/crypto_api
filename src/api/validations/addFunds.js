const Joi = require('joi').extend(require('@joi/date'));

module.exports = async (req, res, next) => {
    try {
        const schema = Joi.object({
            quoteTo: Joi.string().length(3).trim().required(),
            currentCoin: Joi.string().length(3).trim().required(),
            value: Joi.number().required()
        });

        const { error } = await schema.validate(req.body, { abortEarly: true });
        if (error) throw error;

        return next();
    } catch (err) {
        return res.status(400).json({
            name: err.details[0].context.label,
            description: err.message 
        });
    }
}