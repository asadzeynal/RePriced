const Sequelize = require('sequelize');

const connectionString = process.env.DB_URL;

const sequelize = new Sequelize(connectionString, {
  logging: false,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 20000,
    acquire: 200000,
  },
});

sequelize.sync().then(() => {
  console.log('Database Synced');
});

module.exports = sequelize;
