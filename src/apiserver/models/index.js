import Sequelize from 'sequelize';
import ApprisalDefinition from './ApprisalModel';
import { MediaDefinition } from './MediaModel';
import { PostDefinition } from './PostModel';
import { RecipientDefinition } from './RecipientModel';
import { UserDefinition } from './UserModel';
import UserValidation from './UserValidation';

const allConfigs = {
  development: {
    username: 'mdw',
    password: null,
    database: 'socialnotsocial',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
};

/* Set up the general process */
const env = process.env.NODE_ENV || 'development';
const config = allConfigs[env];
let sequelize = null;
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
const db = {};

/* Connect and log in to postgres */
sequelize
  .authenticate()
  .then(() => {
    console.log('Success: Connection to Postgres established .');
  }, function trapError(err) {
    console.log('FAILURE: Unable to connect to the Postgres database:', err);
  });


/* Create the models
 * TODO: This is a manual update nightmare.
 */
const apprisalModel = ApprisalDefinition(sequelize, Sequelize);
db[apprisalModel.name] = apprisalModel;
const mediaModel = MediaDefinition(sequelize, Sequelize);
db[mediaModel.name] = mediaModel;
const postModel = PostDefinition(sequelize, Sequelize);
db[postModel.name] = postModel;
const recipientModel = RecipientDefinition(sequelize, Sequelize);
db[recipientModel.name] = recipientModel;
const userModel = UserDefinition(sequelize, Sequelize);
db[userModel.name] = userModel;
const userValidationModel = UserValidation(sequelize, Sequelize);
db[userValidationModel.name] = userValidationModel;

/* Do associations */
Object.keys(db).forEach(function associateThem(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

/* Push the models to the database */
sequelize
  .sync({ force: true }) //   .sync({ force: true }) <= removed as this drops the table
  .then(() => {
    console.log('Success: Synced models to database.');
  }, function trapSyncError(err) {
    console.log('FAILURE: An error occurred while creating the table:', err);
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

