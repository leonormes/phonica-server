module.exports = (sequelize, DataTypes) => {
  const Flashcard = sequelize.define('flashcard', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
  });
  return Flashcard;
};
