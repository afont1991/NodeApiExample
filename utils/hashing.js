import crypto from 'crypto';

export function password(password){
  return crypto
    .createHmac('sha256', '!wowSecretsWOW!')
    .update(password)
    .digest('hex');
}
