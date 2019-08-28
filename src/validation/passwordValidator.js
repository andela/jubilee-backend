import Joi from '@hapi/joi';
import passwordComplexity from 'joi-password-complexity';

export const passwordResetEmailSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required()
});

const complexityOPtions = {
  min: 8,
  max: 250,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 3,
};

export const changePasswordSchema = Joi.object().keys({
  password: new passwordComplexity(complexityOPtions)
    .required(),
  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .options({
      language: {
        any: {
          allowOnly: 'do not match with password!',
        }
      }
    })
});
