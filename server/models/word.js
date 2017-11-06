module.exports = (sequelize, DataTypes) => {
  const Word = sequelize.define('Word', {
    word: {
      type: DataTypes.STRING,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
  });
  return Word;
};
