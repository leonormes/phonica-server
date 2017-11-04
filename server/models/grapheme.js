// module.exports = (sequelize, DataTypes) => {
//   const Grapheme = sequelize.define('Grapheme', {
//     grapheme: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       field: 'id'
//     }
//   });
//   Grapheme.associate = models => {
//     Grapheme.belongsTo(models.Phoneme, {
//       foreignKey: 'phonemeId'
//     });
//   };

//   return Grapheme;
// };
const Sequelize = require('sequelize');
const db = require('./index');

const Grapheme = db.define('Grapheme', {
  grapheme: {
    type: Sequelize.STRING,
    allowNull: false
  },
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    field: 'id'
  }
});

module.exports = Grapheme;
