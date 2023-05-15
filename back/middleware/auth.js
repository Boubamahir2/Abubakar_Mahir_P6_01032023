import jwt from 'jsonwebtoken';
import ResponseMessages from '../constants/responseMessages.js';

const authenticateUser = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(400).json({
        success: false,
        message:ResponseMessages.AUTH_TOKEN_REQUIRED,
      });
    }
    const token = req.headers.authorization.split(' ')[1];
 
    if (!token) {
      return res.status(400).json({
        success: false,
        message: ResponseMessages.AUTH_TOKEN_REQUIRED,
      });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.auth = { userId: payload.id };
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: ResponseMessages.INVALID_EXPIRED_TOKEN,
    });
  }
};

export default authenticateUser;
