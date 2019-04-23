import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import sequelizeStore from 'connect-session-sequelize'
import session from 'express-session';

export default (app, { env, database, hashing } ) => {

  // set up session store
  let SequelizeStore = sequelizeStore(session.Store);
  app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: env.SESSION_SECRET,
    store: new SequelizeStore({
      db: database.sequelize
    })
  }));

  // http://www.passportjs.org/docs/configure/
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy( { usernameField: 'email' }, async (email, password, done) => {

    const userQuery = {
      where: {
        email: email,
        password: hashing.password(password)
      }
    };

    let userInstance = await new Promise((resolve) => {
      return resolve(database.User.findOne(userQuery)); // checking database for user
    }).catch((err) => { return done(null, false); });

    if(!userInstance){  return done(null, false); }

    const authUser = userInstance.toJSON();

    return done(null, authUser);

  }));

  passport.serializeUser( (user, done) => {
    return done(null, user.id);
  });

  passport.deserializeUser( async (id, done) => {

    const userQuery = {
      where: {
        id: id,
      }
    };

    let userInstance = await database.User.findOne(userQuery);

    return done(null, userInstance.toJSON());

  });

  app.post('/api/v1/user/login', passport.authenticate('local'), (req, res) => {
    res.send({ user: req.user });
  });

  app.get('/api/v1/user/logout', (req, res, next) => {
    req.logout()
    req.session.destroy()
    return res.send({ status: 'success', message: 'logged out' });
  });

  return app;
}
