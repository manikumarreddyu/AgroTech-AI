const Joi = require('joi');

// Validation schema for supplier data
const supplierValidationSchema = Joi.object({
  name: Joi.string().required(),
  contactInfo: Joi.object({
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  }).required(),
  address: Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    postalCode: Joi.string().required(),
  }).required(),
  productsSupplied: Joi.array().items(Joi.string()).required(),
  status: Joi.string().valid('active', 'inactive').default('active'),
});

const validateSupplierData = (req, res, next) => {
  const { error } = supplierValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: 'Validation Error', details: error.details });
  }
  next();
};

module.exports = validateSupplierData;
