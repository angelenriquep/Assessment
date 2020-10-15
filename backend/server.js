'use strict'

const http = require('http')
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const bodyParser = require('body-parser')
const { time } = require('./api')
const promMid = require ('express-prometheus-middleware')
const logger = require ('morgan')

const app = express()
const server = http.createServer(app)
const port = +process.env.PORT || 8000

app.use(helmet())
app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/time', time)
app.use(promMid({
    metricsPath: '/metrics',
    collectDefaultMetrics: true,
    requestDurationBuckets: [0.1, 0.5, 1, 1.5],
    authenticate: req => req.headers.authorization === 'mysecrettoken'
}))
app.use((req, res, next) => {
    if(req.headers.authorization !== 'mysecrettoken') {
        return res.status(403).send({ message: 'Access denied'}) 
    }
    next();
})

module.exports = server

if (!module.parent) {
  server.listen(port, () => {
    console.log(`server listening on http://localhost:${port}`)
  })
}