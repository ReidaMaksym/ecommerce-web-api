const expressJwt = require('express-jwt')

//protection function 

function authJwt() {
    // if the token is generated by MY secret, he will 
    //get access to the API
    // if token based on differe secret, the API won't work
    const secret = process.env.secret
    return expressJwt({
        secret,
        algorithms: ['HS256']
    })
}

module.exports = authJwt