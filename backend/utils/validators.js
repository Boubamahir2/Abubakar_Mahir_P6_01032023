import mongoose from "mongoose";

const validators = {};

const Numeric = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const startsWithNumber = (str) => {
  return Numeric.includes(str[0]);
};

const emailRegExp =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

validators.validateEmail = (email) => {
  return emailRegExp.test(email);
};

validators.isValidObjectId = (uid) => {
  return mongoose.Types.ObjectId.isValid(uid);
};

validators.validatePassword = (password) => {
  if (password.length < 8 || password.length > 32) return false;

  return true;
};

const nameRegExp = /^[a-zA-Z0-9 ]{3,32}$/;

validators.validateName = (name) => {
  if (name.length < 3 || name.length > 32) return false;

  if (name.startsWith(" ")) return false;

  if (startsWithNumber(name)) return false;

  return nameRegExp.test(name);
};

validators.validateAbout = (about) => {
  if (about.length > 110) return false;

  return true;
};


export default validators;
