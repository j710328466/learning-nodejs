import cheerio from 'cheerio'
import superagent from 'superagent'
const router = require('express').Router()

// 爬取cnode
router.get('/', function (req, res, next) {
    superagent.get('https://cnode.org/')
        .end(function(err, sres) {
            if (err) return next(err)
            console.log(sres.text)
            let $ = cheerio.load(sres.text)
            let items = []
            $('#topic_list .topic_title').each(function(idx, ele) {
                let $ele = $(ele)
                items.push({
                    title: $ele.attr('title'),
                    href: $ele.attr('href')
                })
            })
            res.send(items)
        })
})

module.exports = router
