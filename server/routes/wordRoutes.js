const router = require('express').Router();

const db = require('../../db');

router.get('/', (req, res, next) => {
  db.words
    .findAll({
      include: [
        {
          model: db.graphemes,
        },
      ],
    })
    .then(res.send.bind(res))
    .catch(next);
});

module.exports = router;
