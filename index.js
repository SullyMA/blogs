// const http = require('http')
// const express = require('express')
// const app = express()
// const cors = require('cors')
// const mongoose = require('mongoose')

const app = require('./app') // varsinainen Express-sovellus
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})




  