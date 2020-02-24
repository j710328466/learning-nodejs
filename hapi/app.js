const Hapi = require("hapi")
const routes = require('./routes')
const config = require("config")
const pluginSwagger = require('./plugins/hapi-swagger')
const hapiAuthJWT2 = require("hapi-auth-jwt2");
const pluginHapiAuthJWT2 = require("./plugins/hapi-auth-jwt2");

const server = new Hapi.Server()

// 配置服务器启动 host 与端口
server.connection({
  port: config.port,
  host: config.host
});

const init = async () => {
    await server.register([...pluginSwagger, hapiAuthJWT2]);
    pluginHapiAuthJWT2(server);

    server.route(routes)
    // 启动服务
    await server.start()
    console.log("server running at: " + server.info.uri);
}

init()
