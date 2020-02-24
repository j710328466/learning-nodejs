const inert = require("inert")
const vision = require('vision')
const pkg = require('../package.json')
const hapiSwagger = require('hapi-swagger')

module.exports = [
    inert,
    vision,
    {
        register: hapiSwagger,
        options: {
            info: {
                title: '接口文档',
                version: pkg.version
            },
            // 定义接口以 tags 属性定义分组
            grouping: 'tags',
            tags: [
                { name: 'tests', description: '测试相关' }
            ]
        }
    }
]