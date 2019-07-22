const router = require('express').Router()

/* GET users listing. */
router.get('/123', function (req, res, next) {
    res.render('index', { title: '活动模板', users: ['张三', '李四'] });
});

module.exports = router;
