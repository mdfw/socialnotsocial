import Sequelize from 'sequelize';
import Apprisal from './ApprisalModel';
import Media from './MediaModel';
import Post from './PostModel';
import Recipient from './RecipientModel';
import User from './UserModel';

const allConfigs = {
  development: {
    username: 'mdw',
    password: null,
    database: 'calmcomment',
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
const apprisalModel = Apprisal(sequelize, Sequelize);
db[apprisalModel.name] = apprisalModel;
const mediaModel = Media(sequelize, Sequelize);
db[mediaModel.name] = mediaModel;
const postModel = Post(sequelize, Sequelize);
db[postModel.name] = postModel;
const recipientModel = Recipient(sequelize, Sequelize);
db[recipientModel.name] = recipientModel;
const userModel = User(sequelize, Sequelize);
db[userModel.name] = userModel;


/* Do associations */
Object.keys(db).forEach(function associateThem(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

/* Push the models to the database */
sequelize
  .sync() //   .sync({ force: true }) <= removed as this drops the table
  .then(() => {
    console.log('Success: Synced models to database.');
  }, function trapSyncError(err) {
    console.log('FAILURE: An error occurred while creating the table:', err);
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

