const Joi = require("joi");
const GROUP_NAME = 'world'

module.exports = [
    {
        method: 'post',
        path: `/${GROUP_NAME}`,
        handler: async (req, reply) => {
            reply('post world')
        },
        config: {
            tags: ['api', GROUP_NAME],
            description: '测试校验',
            validate: {
                payload: {
                    goodsList: Joi.array().items(
                        Joi.object().keys({
                            goods_id: Joi.number().integer(),
                            count: Joi.number().integer(),
                        }),
                    ),
                },
                headers: Joi.object({
                    authorization: Joi.string().required(),
                }).unknown()
            }
        }
    },
    {
        method: 'get',
        path: `/${GROUP_NAME}/{orderId}/pay`,
        handler: async (req, reply) => {
            reply('post world a')
        },
        config: {
            tags: ['api', GROUP_NAME],
            description: '测试world2',
            validate: {
                query: {
                    limit: Joi.number().integer().min(1).default(10).description('每页的条目数'),
                    page: Joi.number().integer().min(1).default(1).description('页码数'),
                },
                params: {
                    orderId: Joi.string().required(),
                },
            },
        }
    }
]