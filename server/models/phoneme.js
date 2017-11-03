module.exports = (sequelize, DataTypes) => {
  const Phoneme = sequelize.define('Phoneme', {
    phoneme: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Phoneme.associate = (models) => {
    Phoneme.hasMany(models.Grapheme, {
      foreignKey: 'phonemeId',
      as: 'grapheme',
    });
  };
  return Phoneme;
};
