const router = require('express').Router()

/* GET users listing. */
router.get('/123', function (req, res, next) {
    res.render('index', { 
        "code": 1000, 
        "data": { 
            "activityBase": { 
                "activityAuthor": "huangweijian", 
                "activityName": "emoji", 
                "activityStatus": false, 
                "activityTimeStatus": "进行中", 
                "activityType": "emoji", 
                "activityUpdateAuthor": "huajiao", 
                "budgetMoney": 0, 
                "createAuthor": "845", 
                "createTime": 1563433513000, 
                "deleted": false, 
                "endTime": 1563811199000, 
                "id": "2c9082ec6c03dbb8016c03e631700005", 
                "marketType": "content", 
                "startTime": 1563724800000, 
                "type": "jimi", 
                "updateAuthor": "2c9082ec6a42a495016a430e6bae001d", 
                "updateTime": 1563788806000, 
                "url": "https://product.jimistore.com/activity/emoji.html", 
                "userInputCompleted": true, 
                "userInputType": "excel", 
                "version": 5 
            }, 
            "activityCollectionConfig": { 
                "activityBaseId": "2c9082ec6c03dbb8016c03e631700005", 
                "backgroundImg": "", 
                "id": "2c9082ec6c03dbb8016c03e633e70007" 
            }, 
            "activityMultButtonConfig": ['1'], 
            "activityNavigationBar": { 
                "activityBaseId": "2c9082ec6c03dbb8016c03e631700005", 
                "alipayMainTitle": "", 
                "alipayShareIconUrl": "", 
                "backgroundImg": "", 
                "createAuthor": "845",
                "createTime": 1563433514000, 
                "deleted": false, 
                "id": "2c9082ec6c03dbb8016c03e633c60006", 
                "isShowShare": false, 
                "title": "标题", 
                "updateAuthor": "845", 
                "updateTime": 1563433514000, 
                "version": 0, 
                "wxMainTitle": "", 
                "wxShareIconUrl": "", 
                "wxSubTitle": "" 
            }, 
            "activityPictureConfigs": [{ 
                "activityBaseId": "2c9082ec6c03dbb8016c03e631700005", 
                "createAuthor": "2c9082ec6a42a495016a430e6bae001d", 
                "createTime": 1563781645000, 
                "deleted": false, 
                "id": "2c9082ec6c189b26016c18a641fc0000", 
                "jumpParams": "null:undefined", 
                "jumpType": "null", 
                "pictureUrl": "https://product.jimistore.com/index/6b8df96c-91de-444b-9ad2-cc4b90ac4852", 
                "updateAuthor": "2c9082ec6a42a495016a430e6bae001d", 
                "updateTime": 1563788672000, 
                "version": 1 
            }, 
            { 
                "activityBaseId": "2c9082ec6c03dbb8016c03e631700005", 
                "createAuthor": "2c9082ec6a42a495016a430e6bae001d", 
                "createTime": 1563781648000, 
                "deleted": false, 
                "id": "2c9082ec6c189b26016c18a64d5c0001", 
                "jumpParams": "null:undefined", 
                "jumpType": "null", 
                "pictureUrl": "https://product.jimistore.com/index/3c2de7fe-db54-4268-b527-b8594f9eb530", 
                "updateAuthor": "2c9082ec6a42a495016a430e6bae001d", 
                "updateTime": 1563788802000, 
                "version": 1 
            },
            { 
                "activityBaseId": "2c9082ec6c03dbb8016c03e631700005", 
                "createAuthor": "2c9082ec6a42a495016a430e6bae001d", 
                "createTime": 1563781648000, 
                "deleted": false, 
                "id": "2c9082ec6c189b26016c18a64dd50002",
                "jumpParams": "", 
                "jumpType": "null", 
                "pictureUrl": "", 
                "updateAuthor": "2c9082ec6a42a495016a430e6bae001d", 
                "updateTime": 1563781648000, 
                "version": 0 
            }], 
            "enterConfigs": [], 
            "moduleId": [
                "share_2c9082ec6c03dbb8016c03e633c60006", 
                "collection_2c9082ec6c03dbb8016c03e633e70007", 
                "img_2c9082ec6c189b26016c18a641fc0000", 
                "img_2c9082ec6c189b26016c18a64d5c0001", 
                "img_2c9082ec6c189b26016c18a64dd50002"
            ], 
            "serviceActivityNotice": [] 
        } 
    })
})

module.exports = router
