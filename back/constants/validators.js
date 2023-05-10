import mongoose from "mongoose";

const validators = {};


const emailRegExp =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

validators.validateEmail = (email) => {
  return emailRegExp.test(email);
};

validators.isValidObjectId = (uid) => {
  return mongoose.Types.ObjectId.isValid(uid);
};

// Check password complexity
validators.validatePassword = (password) => {
  if (password.length < 8 || password.length > 32) return false;
  return true;
};

// Check password complexity
validators.checkPasswordStrength = (password) =>{
  let strength = 0;
  // contain at least 1 lowercase letter
  if (password.match(/(?=.*[a-z])/)) {
    strength += 1;
  }

  // contain at least 1 uppercase letter
  if (password.match(/(?=.*[A-Z])/)) {
    strength += 1;
  }

  // contain at least 1 number
  if (password.match(/[0-9]+/)) {
    strength += 1;
  }

  // contain at least 1 special character
  if (password.match(/[$@#&!]+/)) {
    strength += 1;
  }
  
  // At least 8 characters long
  if (password.length > 7) {
    strength += 1;
  }

  if (strength < 4) {
    return false;
  } else if (strength < 5){
    return true;
  } else {
    return true;
  }
}



export default validators;
