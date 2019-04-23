import request from 'superagent';

export function sendVerification(form, env){

  const options = {
    api_key: env.AUTHY_API_KEY,
    via: form.verification_type || 'sms',
    country_code: form.country_code || 1,
    phone_number: form.phone,
  }

  return request
    .post('https://api.authy.com/protected/json/phones/verification/start')
    .send(options)
    .set('X-Authy-API-Key', env.AUTHY_API_KEY)
    .set('accept', 'json');
}

export function checkVerification(form, env){

  const options = {
    api_key: env.AUTHY_API_KEY,
    country_code: form.country_code || 1,
    phone_number: form.phone,
    verification_code: form.verification_code,
  }

  return request
    .get('https://api.authy.com/protected/json/phones/verification/check')
    .send(options)
    .set('X-Authy-API-Key', env.AUTHY_API_KEY)
    .set('accept', 'json');
}
