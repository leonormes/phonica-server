const router = require('express').Router();

const db = require('../../db');

router.get('/', (req, res, next) => {
  db.phonemes
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

router.post('/', (req, res, next) => {
  Phoneme.create(req.body)
    .then((phoneme) => {
      res.send(phoneme);
    })
    .catch(next);
});

module.exports = router;
