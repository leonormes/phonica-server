const router = require('express').Router();

const db = require('../../db');

router.get('/', (req, res, next) => {
  db.cardSets
    .findAll({
      include: [
        {
          model: db.flashcards,
        },
        {
          model: db.phonicSchemes,
        },
      ],
    })
    .then(res.send.bind(res))
    .catch(next);
});

module.exports = router;
