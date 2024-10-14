const jwt = require('jsonwebtoken');
const secret = "kishan@1156";

function authMiddleware(req,res,next){
    const token = req.header('Authentication');
    if(!token){
        return res.status(401).json('message: No token Authentication denied');
    }
    try {
        const decode = jwt.verify(token,secret);
        req.voter = decode.voterId;
        next();

    } catch (error) {
      return res.status(401).json('mesaage: Invaild token');     
    }
}

module.exports = authMiddleware;