const Sequelize = require('sequelize');
const db = require('../../db');

const Grapheme = db.define('Grapheme', {
  grapheme: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    field: 'id',
  },
});

module.exports = Grapheme;
