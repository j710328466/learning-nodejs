const hello = require('./hello')
const world = require("./world")

module.exports = [
    ...hello,
    ...world
]