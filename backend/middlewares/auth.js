require('dotenv').config();
import { verify } from "jsonwebtoken";

export default (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = verify(token, process.env.JWT_TOKEN_SECRET);
    const userId = decodedToken.userId;
    req.auth = {
      userId: userId,
    };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
