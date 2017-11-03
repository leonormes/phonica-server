module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Phoneme',
      [
        {
          id: 1,
          phoneme: 's',
          createdAt: new Date(),
          updatedAt: new Date(),
          graphemes: [
            {
              grapheme: 's'
            }
          ]
        },
        {
          include: [grapheme]
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
