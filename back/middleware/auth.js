import jwt from 'jsonwebtoken';
import ResponseMessages, {
  ErrorHandler,
} from '../constants/responseMessages.js';

const authenticateUser = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(400).json({
        success: false,
        message: 'AUTH PARAM REQUIRED',
      });
    }
    const token = req.headers.authorization.split(' ')[1];
 
    if (!token) {
      return next(new ErrorHandler(ResponseMessages.AUTH_TOKEN_REQUIRED, 400));
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(payload);
    req.auth = { userId: payload.id };
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      success: false,
      message: ResponseMessages.INVALID_EXPIRED_TOKEN,
    });
  }
};

export default authenticateUser;
