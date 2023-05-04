const createTokenUser = (user) => {
  return { name: user.username, userId: user._id, role: user.role };
};

export default createTokenUser;
