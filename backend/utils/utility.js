import jwt from 'jsonwebtoken';
import models from '../models/index.js';
import ResponseMessages from '../constants/responseMessages.js';

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
utility.checkIfPostOwner = async (postId, user) => {
  const post = await models.Post.findById(postId).select('owner');

  if (post.owner.toString() === user._id.toString()) {
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

export default utility;