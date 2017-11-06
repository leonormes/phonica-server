module.exports = (sequelize, DataTypes) => {
  const Word = sequelize.define('Word', {
    word: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      field: 'id',
    },
  });
  return Word;
};
