'use strict'

function isAuthenticated (req, res, next) {
    const { headers } = req
    const { authorization } = headers

    if(authorization !== 'mysecrettoken') { return res.status(403).send({ message: 'Access denied' }) }

    next()
}

module.exports = {
  isAuthenticated
}