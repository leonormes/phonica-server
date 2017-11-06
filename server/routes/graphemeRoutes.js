const router = require('express').Router();

const db = require('../../db');

router.get('/', (req, res, next) => {
  db.graphemes
    .findAll({
      include: [
        {
          model: db.phonemes,
        },
      ],
    })
    .then(res.send.bind(res))
    .catch(next);
});

module.exports = router;
