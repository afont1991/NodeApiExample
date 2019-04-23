import fs from 'fs-extra';
import path from 'path';
import Sequelize from 'sequelize';

export default (env) => {

  const dbConfig = {
    database: env.DB_NAME,
    host: env.DB_HOSTNAME,
    port: env.DB_PORT,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
  }

  // https://github.com/sequelize/sequelize/issues/8417
  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  const Op = Sequelize.Op;
  let sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    dialect: 'postgres',
    host: dbConfig.host,
    port: dbConfig.port,
    operatorsAliases: Op,
    logging: false,
    define: {
      charset: 'utf8',
      collate: 'utf8_general_ci'
    }
  });

  let db = {};
  let modelPath = `${process.cwd()}/models`;
  let files = fs.readdirSync(modelPath);

  files.forEach((file) => {
    if(file !== 'index.js'){
      let model = sequelize.import(path.join(modelPath, file));
      db[model.name] = model;
    }
  });

  // http://docs.sequelizejs.com/manual/tutorial/associations.html
  Object.keys(db).forEach((modelName) => {
    if('associate' in db[modelName]) {
      db[modelName].associate(db)
    }
  })

  let sequelizeDb = Object.assign(db, {sequelize, Sequelize});

  // http://docs.sequelizejs.com/manual/tutorial/models-definition.html#database-synchronization
  sequelizeDb.sequelize.sync({force: true});

  return sequelizeDb;

}
