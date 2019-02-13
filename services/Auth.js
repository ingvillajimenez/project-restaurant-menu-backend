//Require JWT
const jwt = require('jsonwebtoken');

//crear funcion Auth
const Auth = (request, response, next) => {
    try {
        const token = request.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
        next();
    } catch(error) {
        response
            .status(401)
            .json({
                message: 'Authentication Failed'
            })
    }
}

module.exports = Auth;