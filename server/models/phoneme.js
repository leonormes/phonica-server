const Sequelize = require('sequelize');
const db = require('../../db');

const Phoneme = db.define('Phoneme', {
  phoneme: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    field: 'id',
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  uniCode: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  vowel: {
    type: Sequelize.BOOLEAN,
    allNull: false,
  },
});

module.exports = Phoneme;
