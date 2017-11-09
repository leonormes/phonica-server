module.exports = (sequelize, DataTypes) => {
  const CardSet = sequelize.define('card_set', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
  });
  return CardSet;
};
