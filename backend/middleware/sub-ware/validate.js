
const { check, validationResult } = require('express-validator');

exports.validateDeliveryPerson = [
  check('email').isEmail().withMessage('Email is invalid'),
  check('phone_number').isMobilePhone().withMessage('Phone number is invalid'),
  check('status').isIn(['active', 'inactive']).withMessage('Status must be active or inactive'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
