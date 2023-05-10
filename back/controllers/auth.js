import catchAsyncError, { ErrorHandler } from '../constants/errors.js';
import models from '../models/index.js';
import validators from '../constants/validators.js';
import ResponseMessages from '../constants/responseMessages.js';
import utility from '../constants/utility.js';

// The controller function is called register, which is an asynchronous function wrapped with catchAsyncError to handle any errors that might occur during the execution of this function.
// this function ensures that the user's email is encrypted before it is stored in the database, and it validates the email and password fields before creating a new user document.
const register = catchAsyncError(async (req, res, next) => {
  const password = req.body.password;
  // The utility.encrypt function is called to encrypt the email address before it is stored in the database. The function takes the email address as an argument and returns an encrypted string.
  const encryptedEmail = utility.encrypt(req.body.email);
  //check if email provided by the user
  if (!req.body.email) {
    return next(new ErrorHandler(ResponseMessages.EMAIL_REQUIRED, 400));
  }
  // validate email
  if (req.body.email && !validators.validateEmail(req.body.email)) {
    return next(new ErrorHandler(ResponseMessages.INVALID_EMAIL, 400));
  }
  //check if password provided by the user
  if (!password) {
    return next(new ErrorHandler(ResponseMessages.PASSWORD_REQUIRED, 400));
  }
  // validate password
  if (password && !validators.checkPasswordStrength(password)) {
    return next(new ErrorHandler(ResponseMessages.PASSWORD_STRENGTH, 400));
  }

  let user = await models.User.findOne({
    email: utility.encrypt(req.body.email),
  });

  if (user) {
    return next(new ErrorHandler(ResponseMessages.ACCOUNT_ALREADY_EXISTS, 400));
  }

  user = await models.User.create({
    email: encryptedEmail,
    password,
  });

  await user.save();
  res.status(201).json({
    success: true,
    message: ResponseMessages.SIGNUP_SUCCESS,
    user: {
      email: utility.decrypt(user.email),
    },
  });
});

const login = catchAsyncError(async (req, res, next) => {
  if (!req.body.email) {
    return next(new ErrorHandler(ResponseMessages.EMAIL_REQUIRED, 400));
  }
  

  // validate email

 let user = await models.User.findOne({
    email: utility.encrypt(req.body.email),
  }).select('+password');
  if (!user) {
    return next(new ErrorHandler(ResponseMessages.INCORRECT_EMAIL, 400));
  }
  
  if (!req.body.password) {
    return next(new ErrorHandler(ResponseMessages.PASSWORD_REQUIRED, 400));
  }

  const isMatch = await user.comparePassword(req.body.password);

  if (!isMatch) {
    return next(new ErrorHandler(ResponseMessages.INCORRECT_PASSWORD, 400));
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
    expiresAt = tokenObj.expiresAt;
  }

  res.status(200).json({
    message: ResponseMessages.LOGIN_SUCCESS,
    user: {
      email: user.email,
    },
    token: token,
  });
});

const logout = catchAsyncError(async (req, res, next) => {});

export { register, login, logout };
