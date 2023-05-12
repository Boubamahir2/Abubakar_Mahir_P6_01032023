class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

export { ErrorHandler };

const ResponseMessages = {};

/// Required Field Response Messages
ResponseMessages.FIELD_REQUIRED = 'This field is required';
ResponseMessages.EMAIL_REQUIRED = 'Email is required';
ResponseMessages.EMAIL_USERNAME_REQUIRED = 'Email or username is required';
ResponseMessages.PASSWORD_REQUIRED = 'Password is required';
ResponseMessages.PASSWORD_STRENGTH =
  'Password complexity is weak, please check that your password contain at least 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character and 8 characters minimum';

/// Incorrect Response Messages
ResponseMessages.INCORRECT_EMAIL = 'No user found with this email';
ResponseMessages.INCORRECT_PASSWORD = 'Incorrect password';
/// Success Response Messages
ResponseMessages.SUCCESS = 'Success';
ResponseMessages.LOGIN_SUCCESS = 'Login success';
ResponseMessages.SIGNUP_SUCCESS = 'Signup success';
ResponseMessages.LOGOUT_SUCCESS = 'Logout success';

/// Failure Response Messages
ResponseMessages.FAILURE = 'Failure';
ResponseMessages.LOGIN_FAILURE = 'Login failure';
ResponseMessages.SIGNUP_FAILURE = 'Signup failure';
ResponseMessages.LOGOUT_FAILURE = 'Logout failure';

/// Other Response Messages
ResponseMessages.AUTH_TOKEN_REQUIRED = 'Auth token is required';
ResponseMessages.EMAIL_ALREADY_USED = 'Email already used';
ResponseMessages.ACCOUNT_ALREADY_EXISTS =
  'Account already exists with this email';
ResponseMessages.ACCOUNT_NOT_FOUND = 'Account not found';
ResponseMessages.EMAIL_ALREADY_EXISTS = 'Email already exists';
ResponseMessages.EMAIL_ALREADY_ASSOSIATED =
  'Email already associated with another account';
ResponseMessages.VALID_TOKEN = 'Valid token';
ResponseMessages.CORRECT_PASSWORD = 'Correct password';

ResponseMessages.NOT_AUTHORIZED = 'Not authorized';
ResponseMessages.UNAUTHORIZED_ACCESS = 'Unauthorized access';
ResponseMessages.UNAUTHORIZED_ACCESS_MESSAGE =
  'You are not authorized to access this resource';

ResponseMessages.AUTH_TOKEN_NOT_FOUND = 'Auth token not found';

/// Invalid Response Messages
ResponseMessages.INVALID_EXPIRED_TOKEN = 'Invalid or expired token';
ResponseMessages.INVALID_EMAIL = 'Invalid email';
ResponseMessages.INVALID_PASSWORD = 'Invalid password';
ResponseMessages.INVALID_CREDENTIALS = 'Invalid credentials';
ResponseMessages.INVALID_TOKEN = 'Invalid token';
ResponseMessages.EXPIRED_TOKEN = 'Expired token';
ResponseMessages.INVALID_REQUEST = 'Invalid request';
ResponseMessages.INVALID_PARAMETERS = 'Invalid parameters';
ResponseMessages.INVALID_EMAIL = 'Invalid email';
ResponseMessages.INVALID_PASSWORD = 'Invalid password';
// verify your account';
ResponseMessages.UNAUTHORIZED =
  'You are not authorized to perform this operation';
ResponseMessages.NOT_FOUND = 'Not found';

export default ResponseMessages;
