const router = require('express').Router();

const Phoneme = require('../models/index').Phoneme;

router.get('/', (req, res, next) => {
  Phoneme.findAll({
    where: req.query,
  })
    .then(res.send.bind(res))
    .catch(next);
});

module.exports = router;
