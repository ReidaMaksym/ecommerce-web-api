const expressJwt = require('express-jwt')

//protection function 

function authJwt() {
    // if the token is generated by MY secret, he will 
    //get access to the API
    // if token based on differe secret, the API won't work
    const secret = process.env.secret
    const api = process.env.API_URL
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            {
                // url: `${api}/products`, 
                url: /api\/products(.*)/,
                methods: [
                    'GET',
                    'OPTIONS'
                ]
            },
            {
                url: /api\/categories(.*)/,
                methods: [
                    'GET',
                    'OPTIONS'
                ]
            },
            {
                url: `/login`,
                methods: [
                    'GET',
                    'OPTIONS'
                ]
            },
            {
                url: `/`,
                methods: [
                    'GET',
                    'OPTIONS'
                ]
            },
            {
                url: `/products`,
                methods: [
                    'GET',
                    'OPTIONS'
                ]
            },
            {
                url: `/api/users/profile`,
                methods: [
                    'GET',
                    'OPTIONS'
                ]
            },
            `${api}/users/login`,
            `${api}/users/register`
        ]
    })
}

async function isRevoked(req, payload, done){
    if(!payload.isAdmin){
        done(null, true)
    }

    done()
}

module.exports = authJwt