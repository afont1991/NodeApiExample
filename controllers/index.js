
import * as user from './UserController';
import * as subscription from './SubscriptionController';

// utils contains access to global items like database and braintree that were configured during server start
export default (app, utils) => {

  // catch all protected routes (/api/v1/protected/*) and check auth status before forwarding to controller
  // ===================================================================
  // TODO: Verify that this is ok to do
  // ===================================================================
  app.get('/api/v1/protected/*', (req, res, next) => {
    if(req.isAuthenticated()){
      next()
    } else {
      return res.status(403).send('not authed');
    }
  });
  app.post('/api/v1/protected/*', (req, res, next) => {
    if(req.isAuthenticated()){
      next()
    } else {
      return res.status(403).send('not authed');
    }
  });


  app.post('/api/v1/user/create', (req, res, next) => {
    user.create(req, res, utils).catch((err)=>{
      return res.send({status: 'error', message: 'Error creating user', details: err});
    });
  });

  app.post('/api/v1/user/subscribe', (req, res, next) => {
    user.create(req, res, utils).catch((err)=>{
      return res.send({status: 'error', message: 'Error creating user', details: err});
    });
  });

  app.post('/api/v1/user/resend_verification', (req, res, next) => {
    user.resendVerification(req, res, utils).catch((err)=>{
      return res.send({status: 'error', message: 'Error resending verification code', details: err});
    });
  });

  app.post('/api/v1/user/verify', (req, res, next) => {
    user.verify(req, res, utils).catch((err)=>{
      return res.send({status: 'error', message: 'Verification Failed', details: err});
    });
  });

  app.get('/api/v1/subscription/client_token', (req, res, next) => {
    subscription.clientToken(req, res, utils).catch((err)=>{
      return res.send({status: 'error', message: 'Failed to generate client token from braintree', details: err});
    });
  });

  app.post('/api/v1/protected/subscription/create', (req, res, next) => {
    subscription.create(req, res, utils).catch((err)=>{
      return res.send({status: 'error', message: 'Failed to create braintree user and subscription', details: err});
    });
  });

  app.post('/api/v1/protected/subscription/cancel', (req, res, next) => {
    subscription.cancel(req, res, utils).catch((err)=>{
      return res.send({status: 'error', message: 'Failed to cancel subscription', details: err});
    });
  });

  // Catch all 404 not found route
  app.get('*', (req, res) => { res.status(404).send('Invalid Route'); });
  app.post('*', (req, res) => { res.status(404).send('Invalid Route'); });

  return app;
}
