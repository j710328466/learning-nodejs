const JWT = require('jsonwebtoken')
const config = require("config");
const Joi = require("joi")
const { jwtHeaderDefine } = require('../utils/router-helper')
const GROUP_NAME = 'hello'

module.exports = [
  {
    method: "get",
    path: `/${GROUP_NAME}`,
    handler: (req, reply) => {
      console.log(req.auth.credentials);
      reply("hapi");
    },
    config: {
      tags: ["api", GROUP_NAME],
      description: "测试hello",
      validate: {
        ...jwtHeaderDefine
      },
      auth: false
    }
  },
  {
    method: "POST",
    path: `/${GROUP_NAME}/createJWT`,
    handler: async (request, reply) => {
      const generateJWT = jwtInfo => {
        const payload = {
          userId: jwtInfo.userId,
          exp: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60
        };
        return JWT.sign(payload, config.get("jwtSecret"));
      };

      reply(
        generateJWT({
          userId: 1
        })
      );
    },
    config: {
      tags: ["api", GROUP_NAME],
      description: "用于测试的用户 JWT 签发",
      auth: false // 约定此接口不参与 JWT 的用户验证，会结合下面的 hapi-auth-jwt 来使用
    }
  }
];