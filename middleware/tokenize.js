var jwt = require('jsonwebtoken');
const JWT_SECRET = 'OpalMentoringApplicationBuiltByRakesh';

const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    if (req._parsedUrl.pathname == "/auth/createuser" || req._parsedUrl.pathname == "/auth/login") {
        next();
    }
    else {
        if (!req.headers.authorization) {
            return res.status(401).send('Unauthorized access');
        }
        const token = req.headers.authorization.split(' ')[1]
        if (token === 'null') {
            return res.status(401).send('Unauthorized access');
        }
        const payload = jwt.verify(token, JWT_SECRET)
        if (!payload) {
            return res.status(401).send('Unauthorized access');
        }
        req.user = payload.user;
        next();
    }

}


module.exports = fetchuser;