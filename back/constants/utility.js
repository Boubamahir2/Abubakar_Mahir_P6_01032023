import jwt from 'jsonwebtoken';
import models from '../models/index.js';
// import Crypto-js to encrypt email
import CryptoJS from 'crypto-js';

const utility = {};

utility.generateAuthToken = async (user) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  const decodedData = jwt.decode(token);

  const authToken = await models.AuthToken.create({
    token: token,
    user: user._id,
    expiresAt: decodedData.exp,
  });

  return authToken;
};

// Check Username Availability
utility.checkUsernameAvailable = async (username) => {
  let user = await models.User.findOne({ username });

  if (user) {
    return false;
  }
  return true;
};

utility.deleteExpiredAuthTokens = async () => {
  console.log('[cron] task to delete expired auth tokens has started.');
  const authTokens = await models.AuthToken.find({
    expiresAt: { $lt: Date.now() },
  });

  if (authTokens.length > 0) {
    for (let i = 0; i < authTokens.length; i++) {
      await authTokens[i].remove();
    }
  } else {
    console.log('[cron] No expired auth tokens found.');
  }
};

// POST OWNER
utility.checkIfPostOwner = async (sauceId, user) => {
  const sauce = await models.Sauce.findById(sauceId).select('owner');

  if (sauce.owner.toString() === user._id.toString()) {
    return true;
  }

  return false;
};

utility.checkEmailAvailable = async (email) => {
  let user = await models.User.findOne({ email });

  if (user) {
    return false;
  }

  return true;
};

// CHECK IF SAME USER
utility.checkIfSameUser = async (user, userId) => {
  if (user._id.toString() === userId.toString()) {
    return true;
  }

  return false;
};

//  encrypt email using crypto-js AES
utility.encrypt = (string)=> {
  const encryptedEmail = CryptoJS.AES.encrypt(
    string,
    CryptoJS.enc.Base64.parse(process.env.CRYPTOJS_KEY),
    {
      iv: CryptoJS.enc.Base64.parse(process.env.CRYPTOJS_IV),
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  return encryptedEmail.toString();
}

// Decrypt email that has been encrypted by 'encrypt()'
utility.decrypt = (encrypted_string)=> {
  const bytes = CryptoJS.AES.decrypt(
    encrypted_string,
    CryptoJS.enc.Base64.parse(process.env.CRYPTOJS_KEY),
    {
      iv: CryptoJS.enc.Base64.parse(process.env.CRYPTOJS_IV),
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  return bytes.toString(CryptoJS.enc.Utf8);
}

export default utility;