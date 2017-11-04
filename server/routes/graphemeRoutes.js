const router = require('express').Router();

const Grapheme = require('../models/grapheme');

router.get('/', (req, res, next) => {
  Grapheme.findAll({
    where: req.query,
  })
    .then(res.send.bind(res))
    .catch(next);
});

module.exports = router;
