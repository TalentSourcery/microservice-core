import { celebrate, Joi } from 'celebrate';

const signupValidator = celebrate({
  body: Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .max(64)
      .required(),
    password: Joi.string()
      .min(8)
      .max(64)
      .required(),
    name: Joi.string()
      .max(64),
  }),
});

const authenticateValidator = celebrate({
  body: Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .max(64)
      .required(),
    password: Joi.string()
      .min(8)
      .max(64)
      .required(),
  }),
});

const updateValidator = celebrate({
  body: Joi.object({
    email: Joi.string().forbidden(), // Emails are IDs, hence should not be updated
    password: Joi.string()
      .min(8)
      .max(64),
    name: Joi.string()
      .max(64),
  }),
});

// All of these are middleware (a.k.a. functions)
export {
  signupValidator,
  authenticateValidator,
  updateValidator,
};
