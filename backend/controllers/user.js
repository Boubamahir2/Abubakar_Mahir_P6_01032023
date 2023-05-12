
import utility from '../constants/utility.js'
import ResponseMessages from '../constants/errorResponse.js'


// Import User model
import models from '../models/index.js'

import dotenv  from 'dotenv';
dotenv.config()

// Signup logic
const signup = async (req, res, next) => {
  try {
    const password = req.body.password;
    const encryptedEmail = utility.encrypt(req.body.email);

    if (!req.body.email) {
      return res.status(400).json({ message: ResponseMessages.EMAIL_REQUIRED });
    }

    if (req.body.email && !utility.validateEmail(req.body.email)) {
      return res.status(400).json({ message: ResponseMessages.INVALID_EMAIL });
    }

    if (!password) {
      return res
        .status(400)
        .json({ message: ResponseMessages.PASSWORD_REQUIRED });
    }

    if (password && !utility.checkPasswordStrength(password)) {
      return res
        .status(400)
        .json({ message: ResponseMessages.PASSWORD_STRENGTH });
    }

    let user = await models.User.findOne({
      email: utility.encrypt(req.body.email),
    });

    if (user) {
      return res
        .status(400)
        .json({ message: ResponseMessages.ACCOUNT_ALREADY_EXISTS });
    }

    user = await models.User.create({
      email: encryptedEmail,
      password,
    });

    await user.save();

    return res.status(201).json({
      success: true,
      message: ResponseMessages.SIGNUP_SUCCESS,
      user: {
        email: utility.decrypt(user.email),
      },
    });
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    if (!req.body.email) {
      return res.status(400).json({ message: ResponseMessages.EMAIL_REQUIRED });
    }

    let user = await models.User.findOne({
      email: utility.encrypt(req.body.email),
    }).select('+password');

    if (!user) {
      return res
        .status(400)
        .json({ message: ResponseMessages.INCORRECT_EMAIL });
    }

    if (!req.body.password) {
      console.log(res, 'res');
      return res
        .status(400)
        .json({ message: ResponseMessages.PASSWORD_REQUIRED });
    }

    const isMatch = await user.comparePassword(req.body.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: ResponseMessages.INCORRECT_PASSWORD });
    }

    const authToken = await models.AuthToken.findOne({ user: user._id });

    if (!authToken) {
      const tokenObj = await utility.generateAuthToken(user);
      return res.status(200).json({
        success: true,
        message: ResponseMessages.LOGIN_SUCCESS,
        token: tokenObj.token,
      });
    }

    let token = authToken.token;
    let expiresAt = authToken.expiresAt;

    if (expiresAt < new Date().getTime() / 1000) {
      await authToken.remove();
      const tokenObj = await utility.generateAuthToken(user);

      token = tokenObj.token;
    }

    return res.status(200).json({
      message: ResponseMessages.LOGIN_SUCCESS,
      user: {
        email: user.email,
      },
      token: token,
    });
  } catch (error) {
    console.log(error); // Log the error object
    next(error);
  }
};


export { signup, login};
