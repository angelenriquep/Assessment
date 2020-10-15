'use strict'

const { Router } = require('express')
const { isAuthenticated } = require('./auth')
const moment = require('moment');

const router = new Router()

// Get a time response in the format required
router.get('/', isAuthenticated, async function getTime (req, res) {
    const timeResponse = {
        properties: {
            epoch: {
                description: moment().unix(),
                type: "number"
            }
        },
        required: ["epoch"],
        type: "object"
    };
    res.status(200).send(timeResponse);
})

module.exports = router