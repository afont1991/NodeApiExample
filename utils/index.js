import braintree from 'braintree';
import models from '../models';

import * as sms from './sms';
import * as hashing from './hashing';
import * as validation from './validation';

export default async (env) => {

  // setup sequelize models
  let database = await models(env);

  // braintree
  const braintreeGateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: env.BT_MERCHANT_ID,
    publicKey: env.BT_PUBLIC_KEY,
    privateKey: env.BT_PRIVATE_KEY,
  });

  return {
    braintree: braintreeGateway,
    env: env,
    database: database,
    hashing: hashing,
    sms: sms,
    validation: validation,
  };

}
