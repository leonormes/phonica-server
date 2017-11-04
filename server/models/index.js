const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.json`)[env];

const db = new Sequelize(process.env[config.use_env_variable]);

module.exports = db;
