const router = require('express').Router();

const db = require('../../db');

router.get('/', (req, res, next) => {
  db.words
    .findAll({
      attributes: ['word'],
      include: [
        {
          model: db.graphemes,
          attributes: ['grapheme'],
        },
      ],
    })
    .then(res.send.bind(res))
    .catch(next);
});

module.exports = router;
