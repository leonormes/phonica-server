const router = require('express').Router();

const db = require('../../db');

router.get('/', (req, res, next) => {
  console.log(db.cardSets);
  db.cardSets
    .findAll({
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
        {
          model: db.phonicSchemes,
          attributes: ['name'],
        },
      ],
    })
    .then(res.send.bind(res))
    .catch(next);
});

module.exports = router;
