import bodyParser from 'body-parser';
import express from 'express';

import controllers from './controllers'
import utils from './utils';

// set .env vars
// https://www.npmjs.com/package/dotenv
import { config as envConfig } from 'dotenv';
envConfig();
const env = process.env;

// Configure global utilities (like database/sequelize and braintree )
utils(env).then((configuredUtils)=>{

  // Express set up
  let app = express();
  app.engine('html', require('hogan-express'));
  app.set('view engine', 'html');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", env.SITE_URL || '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
  });

  // set up authintication with passport
  app = auth(app, configuredUtils);

  // Configuring Routes/Endpoints
  app = controllers(app, configuredUtils);

  app.listen(env.PORT || 3000);
  console.log(`I am server. Hear me listening on port: ${env.PORT || 3000}`);

}).catch((err)=>{

  console.log("Error during server setup");
  console.log(err);

});
