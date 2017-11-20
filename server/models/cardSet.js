module.exports = (sequelize, DataTypes) => {
  const CardSet = sequelize.define('card_set', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
    },
    phase: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
  });
  return CardSet;
};
