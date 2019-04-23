import Validator from 'validatorjs';
import PasswordValidator from 'password-validator';

// Custom rules
// https://www.npmjs.com/package/validatorjs#registering-custom-validation-rules
Validator.register('phone', function(value, requirement, attribute) {
    return value.match(/^\d{3}-\d{3}-\d{4}$/);
}, 'The phone number is not in the format XXX-XXX-XXXX.');

Validator.register('password', function(value, requirement, attribute) {
  let PasswordRules = new PasswordValidator();
  PasswordRules
    .is().min(8)
    .is().max(100)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().not().spaces()
  return PasswordRules.validate(value);
}, 'Password must be a minimum length of 8 characters with at least one number, one uppercase letter, and one lowercase letter');

export function signup(data){
  const rules = {
    first_name: 'required',
    last_name: 'required',
    phone: 'required|phone',
    email: 'required|email',
    password: 'required|password'
  };
  let signupValidation = new Validator(data, rules);
  return signupValidation;
}
