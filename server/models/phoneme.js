module.exports = (sequelize, DataTypes) => {
  const Phoneme = sequelize.define('Phoneme', {
    phoneme: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: 'id',
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    uniCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    vowel: {
      type: DataTypes.BOOLEAN,
      allNull: false,
    },
  });
  return Phoneme;
};
