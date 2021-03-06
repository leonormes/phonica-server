const router = require('express').Router();

const db = require('../../db');

router.get('/', (req, res, next) => {
  db.phonicSchemes
    .findAll({
      attributes: ['name', 'description'],
      include: [
        {
          model: db.cardSets,
          attributes: ['name'],
          include: [
            {
              model: db.flashcards,
              attributes: ['order'],
              include: [
                {
                  model: db.graphemes,
                  attributes: ['grapheme'],
                },
              ],
            },
          ],
        },
      ],
    })
    .then(res.send.bind(res))
    .catch(next);
});

module.exports = router;
