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
db.words = require('./server/models/word')(sequelize, Sequelize);
db.cardSets = require('./server/models/cardSet')(sequelize, Sequelize);
db.flashcards = require('./server/models/flashcard')(sequelize, Sequelize);
db.phonicSchemes = require('./server/models/phonicScheme')(
  sequelize,
  Sequelize
);

// Relationships
db.phonicSchemes.hasMany(db.cardSets);
db.cardSets.belongsTo(db.phonicSchemes);
db.cardSets.hasMany(db.flashcards);
db.flashcards.belongsTo(db.cardSets);
db.flashcards.hasOne(db.graphemes);
db.graphemes.belongsToMany(db.flashcards, {
  through: 'flashcards_graphemes',
});
db.graphemes.belongsTo(db.phonemes);
db.phonemes.hasMany(db.graphemes);
db.words.belongsToMany(db.graphemes, {
  through: 'word_graphemes',
});
db.graphemes.belongsToMany(db.words, {
  through: 'word_graphemes',
});

module.exports = db;
