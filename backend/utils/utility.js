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
