import catchAsyncError from '../../../errors/catchAsyncError.js';
import ErrorHandler from '../../../errors/errorHandler.js';
import models from '../../../models/index.js';
import validators from '../../../utils/validators.js';
import ResponseMessages from '../../../constants/responseMessages.js';

const register = catchAsyncError(async (req, res, next) => {
  let { email, password } = req.body;

  console.log(email);
  console.log(password);

  if (!email) {
    return next(new ErrorHandler(ResponseMessages.EMAIL_REQUIRED, 400));
  }

  if (email && !validators.validateEmail(email)) {
    return next(new ErrorHandler(ResponseMessages.INVALID_EMAIL, 400));
  }

  if (!password) {
    return next(new ErrorHandler(ResponseMessages.PASSWORD_REQUIRED, 400));
  }

  let user = await models.User.findOne({ email });

  if (user) {
    return next(new ErrorHandler(ResponseMessages.ACCOUNT_ALREADY_EXISTS, 400));
  }

  user = await models.User.create({
    email,
    password,
  });

  await user.save();

  res.status(201).json({
    success: true,
    message: ResponseMessages.SIGNUP_SUCCESS,
    user: {
      email: user.email,
    },
  });
});

export default register;
