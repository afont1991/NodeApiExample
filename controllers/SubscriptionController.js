
export async function clientToken(req, res, { braintree } ){

  const btResponse = await braintree.clientToken.generate({});

  return res.send(btResponse);

}

export async function create(req, res, { braintree, database }){

  const btResponse = await braintree.customer.create({
    firstName: req.user.first_name,
    lastName: req.user.last_name,
    email: req.user.email,
    rex_id: req.user.id,
    paymentMethodNonce: req.body.paymentMethodNonce
  });

  if(!btResponse.success){ throw btResponse }

  const userBraintreeId = btResponse.customer.id;

  const updateUser = {
    braintree_id: userBraintreeId,
  };

  const userQuery = {
    where: {
      id: req.user.id,
    }
  };

  await database.User.update(updateUser, userQuery);

  // ===================================================================
  // TODO: Once billing details are finalized by team this is where transaction is created
  // ===================================================================

  return res.send({status: 'success', message: 'user payment information saved and subscribed'});

}

export async function cancel(req, res, { braintree, database }){
  // ===================================================================
  // TODO: 
  // ===================================================================
  return res.send({status: 'success', message: 'user unsubscribed!'});
}
