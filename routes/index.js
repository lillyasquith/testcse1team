const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {res.send('Hello!')});

router.use('/thread', require('./thread'));

module.exports = router;
