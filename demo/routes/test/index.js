const router = require('express').Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('1')
})

module.exports = router
