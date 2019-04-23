
export async function create(req, res, { database, env, hashing, validation, sms } ) {

  const Op = database.Sequelize.Op;
  let signupForm = req.body;
  let validateForm = validation.signup(signupForm);

  if(!validateForm.passes()){ // validating form input
    throw validateForm.errors
  };

  const newUser = {
    email: signupForm.email,
    password: hashing.password(signupForm.password),
    phone: signupForm.phone,
    first_name: signupForm.first_name,
    last_name: signupForm.last_name,
  };

  // check for duplicate user
  const userQuery = {
    where: {
      [Op.or]: [
        { email: newUser.email, },
        { phone: newUser.phone, },
      ],
    },
  };

  if(await database.User.findOne(userQuery)){
    throw 'User with email/phone already registered';
  };

  // User created
  const savedUser = await database.User.create(newUser);

  // https://www.twilio.com/docs/api/verify/rest
  const phoneVerification = await sms.sendVerification(signupForm, env); // Sending sms verification code

  return res.send({status: 'success', message: 'user created and sms verification sent', details: null});

}

export async function resendVerification(req, res, { database, env, sms }){

  // check to make sure phone number is associated with non verified user
  const userQuery = {
    where: {
      phone: req.body.phone,
      verified: false
    },
  };

  if(await database.User.findOne(userQuery)){

    const phoneVerification = await sms.sendVerification(req.body, env);
    return res.send({status: 'success', message: 'sms verification resent'});

  } else {

    return res.send({status: 'error', message: 'no non verified user with that phone number found'});

  }

}

export async function verify(req, res, { database, env, sms }){

  // will throw err if verification fails
  await sms.checkVerification(req.body, env);

  const updateUser = {
    verified: true,
  };

  const userQuery = {
    where: {
      phone: req.body.phone,
    }
  };

  await database.User.update(updateUser, userQuery);

  // ===================================================================
  // TODO: Create pseudo contract and return wallet information to user
  // ===================================================================

  return res.send({status: 'success', message: 'User verified TODO create and return wallet information', details: null});

}
