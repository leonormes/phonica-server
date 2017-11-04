const router = require('express').Router();

const Phoneme = require('../models/phoneme');

router.get('/', (req, res, next) => {
  Phoneme.findAll({
    where: req.query,
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
