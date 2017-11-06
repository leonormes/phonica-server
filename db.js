const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/server/config/config.json`)[env];
const db = {};

const sequelize = new Sequelize(process.env[config.use_env_variable]);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models/tables
db.phonemes = require('./server/models/phoneme')(sequelize, Sequelize);
db.graphemes = require('./server/models/grapheme')(sequelize, Sequelize);
db.word = require('./server/models/word')(sequelize, Sequelize);

// Relationships
db.graphemes.belongsTo(db.phonemes);
db.phonemes.hasMany(db.graphemes);

module.exports = db;
