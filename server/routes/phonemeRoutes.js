const router = require('express').Router();

const db = require('../../db');

router.get('/', (req, res, next) => {
  db.phonemes
    .findAll({
      attributes: ['phoneme', 'description', 'uniCode'],
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

router.post('/', (req, res, next) => {
  Phoneme.create(req.body)
    .then((phoneme) => {
      res.send(phoneme);
    })
    .catch(next);
});

module.exports = router;
