const ResponseMessages = {};

/// Required Field Response Messages
ResponseMessages.FIELD_REQUIRED = 'This field is required';
ResponseMessages.EMAIL_REQUIRED = 'Email is required';
ResponseMessages.EMAIL_USERNAME_REQUIRED = 'Email or username is required';
ResponseMessages.PASSWORD_REQUIRED = 'Password is required';
ResponseMessages.FIRST_NAME_REQUIRED = 'First name is required';
ResponseMessages.LAST_NAME_REQUIRED = 'Last name is required';
ResponseMessages.USERAME_REQUIRED = 'Username is required';
ResponseMessages.CONFIRM_PASSWORD_REQUIRED = 'Confirm password is required';



/// Incorrect Response Messages
ResponseMessages.INCORRECT_EMAIL = 'No user found with this email';
ResponseMessages.INCORRECT_USERNAME = 'Incorrect username';
ResponseMessages.INCORRECT_PASSWORD = 'Incorrect password';
ResponseMessages.INCORRECT_PHONE = 'Incorrect phone';
ResponseMessages.INCORRECT_CURRENT_PASSWORD = 'Incorrect current password';
ResponseMessages.INCORRECT_OLD_PASSWORD = 'Incorrect old password';

/// Success Response Messages
ResponseMessages.SUCCESS = 'Success';
ResponseMessages.LOGIN_SUCCESS = 'Login success';
ResponseMessages.SIGNUP_SUCCESS = 'Signup success';
ResponseMessages.LOGOUT_SUCCESS = 'Logout success';
ResponseMessages.OTP_SEND_SUCCESS = 'OTP sent successfully';
ResponseMessages.OTP_VERIFY_SUCCESS = 'OTP verified successfully';
ResponseMessages.EMAIL_SEND_SUCCESS = 'Email sent successfully';
ResponseMessages.EMAIL_CHANGE_SUCCESS = 'Email changed successfully';
ResponseMessages.USERNAME_CHANGE_SUCCESS = 'Username changed successfully';
ResponseMessages.PASSWORD_CHANGE_SUCCESS = 'Password changed successfully';
ResponseMessages.PASSWORD_RESET_SUCCESS = 'Password reset successfully';
ResponseMessages.PHONE_CHANGE_SUCCESS = 'Phone changed successfully';
ResponseMessages.ACCOUNT_VERIFY_SUCCESS = 'Account verified successfully';
ResponseMessages.ACCOUNT_REACTIVATE_SUCCESS = 'Account reactivated successfully';
ResponseMessages.ACCOUNT_DEACTIVATE_SUCCESS = 'Account deactivated successfully';
ResponseMessages.PROFILE_PICTURE_UPLOAD_SUCCESS = 'Profile picture uploaded successfully';
ResponseMessages.BACKGROUND_PICTURE_UPLOAD_SUCCESS = 'Background picture uploaded successfully';
ResponseMessages.PROFILE_PICTURE_REMOVE_SUCCESS = 'Profile picture removed successfully';



/// Failure Response Messages
ResponseMessages.FAILURE = 'Failure';
ResponseMessages.LOGIN_FAILURE = 'Login failure';
ResponseMessages.SIGNUP_FAILURE = 'Signup failure';
ResponseMessages.LOGOUT_FAILURE = 'Logout failure';;

/// Other Response Messages
ResponseMessages.AUTH_TOKEN_REQUIRED = 'Auth token is required';
ResponseMessages.AUTH_PARAM_REQUIRED = 'Auth param is required';
ResponseMessages.USERAME_NOT_AVAILABLE = 'Username not available';
ResponseMessages.PASSWORDS_DO_NOT_MATCH = 'Passwords do not match';
ResponseMessages.EMAIL_ALREADY_USED = 'Email already used';
ResponseMessages.USERNAME_ALREADY_USED = 'Username already used';
ResponseMessages.ACCOUNT_ALREADY_EXISTS = 'Account already exists with this email';
ResponseMessages.ACCOUNT_NOT_FOUND = 'Account not found';
ResponseMessages.ACCOUNT_NOT_VERIFIED = 'Account not verified';
ResponseMessages.ACCOUNT_SUPERADMIN = 'Superadmin account';
ResponseMessages.ACCOUNT_ADMIN = 'Admin account';
ResponseMessages.ACCOUNT_USER = 'User account';
ResponseMessages.ACCOUNT_MODERATOR = 'Moderator account';
ResponseMessages.EMAIL_ALREADY_EXISTS = 'Email already exists';
ResponseMessages.EMAIL_ALREADY_ASSOSIATED = 'Email already associated with another account';
ResponseMessages.VALID_TOKEN = 'Valid token';
ResponseMessages.CORRECT_PASSWORD = 'Correct password';


ResponseMessages.NOT_AUTHORIZED = 'Not authorized';
ResponseMessages.UNAUTHORIZED_ACCESS = 'Unauthorized access';
ResponseMessages.UNAUTHORIZED_ACCESS_MESSAGE = 'You are not authorized to access this resource';

ResponseMessages.AUTH_TOKEN_NOT_FOUND = 'Auth token not found';

/// Invalid Response Messages
ResponseMessages.INVALID_LEGAL_NAME = 'Invalid legal name';
ResponseMessages.INVALID_FIRST_NAME = 'Invalid first name';
ResponseMessages.INVALID_LAST_NAME = 'Invalid last name';
ResponseMessages.INVALID_ABOUT_LENGTH = 'Invalid about length';
ResponseMessages.INVALID_EXPIRED_TOKEN = 'Invalid or expired token';
ResponseMessages.INVALID_EMAIL = 'Invalid email';
ResponseMessages.INVALID_USERNAME = 'Invalid username';
ResponseMessages.INVALID_PASSWORD = 'Invalid password';
ResponseMessages.INVALID_FIRST_NAME_LENGTH = 'First name must be at least 3 characters';
ResponseMessages.INVALID_LAST_NAME_LENGTH = 'Last name must be at least 3 characters';
ResponseMessages.INVALID_USERNAME_LENGTH = 'Username must be between 3-15 characters';
ResponseMessages.INVALID_CREDENTIALS = 'Invalid credentials';
ResponseMessages.INVALID_TOKEN = 'Invalid token';
ResponseMessages.EXPIRED_TOKEN = 'Expired token';
ResponseMessages.INVALID_REQUEST = 'Invalid request';
ResponseMessages.INVALID_PARAMETERS = 'Invalid parameters';
ResponseMessages.INVALID_EMAIL = 'Invalid email';
ResponseMessages.INVALID_PASSWORD = 'Invalid password';
ResponseMessages.INVALID_USERNAME = 'Invalid username';
ResponseMessages.INVALID_USER = 'Invalid user';
ResponseMessages.INVALID_USER_ID = 'Invalid user id';
ResponseMessages.INVALID_POST_ID = 'Invalid post id';
// verify your account';
ResponseMessages.UNAUTHORIZED = 'You are not authorized to perform this operation';
ResponseMessages.NOT_FOUND = 'Not found';
ResponseMessages.SIGNUP_EMAIL_VERIFICATION_SUCCESS = 'Signup email verification success';
ResponseMessages.SIGNUP_EMAIL_VERIFICATION_FAILURE = 'Signup email verification failure';
ResponseMessages.SIGNUP_EMAIL_VERIFICATION_FAILURE_ALREADY_VERIFIED = 'Signup email verification failure - already verified';
ResponseMessages.SIGNUP_EMAIL_VERIFICATION_FAILURE_EXPIRED = 'Signup email verification failure - expired';
ResponseMessages.SIGNUP_EMAIL_VERIFICATION_FAILURE_INVALID = 'Signup email verification failure - invalid';
ResponseMessages.SIGNUP_EMAIL_VERIFICATION_FAILURE_NOT_FOUND = 'Signup email verification failure - not found';

export default ResponseMessages;