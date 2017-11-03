module.exports = (sequelize, DataTypes) => {
  const Grapheme = sequelize.define('Grapheme', {
    grapheme: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: 'id'
    }
  });
  Grapheme.associate = models => {
    Grapheme.belongsTo(models.Phoneme, {
      foreignKey: 'phonemeId'
    });
  };

  return Grapheme;
};
