const User = require("../model/user");

const currentUser = async (token) => {
  return await User.findOne({ token });
};

const findById = async (id) => {
  return await User.findById(id);
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const findUserByVerifyToken = async (verificationToken) => {
  return await User.findOne({ verificationToken });
};

const create = async (options) => {
  const user = new User(options);
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

const updateAvatar = async (id, avatar, idUserCloud = null) => {
  return await User.updateOne({ _id: id }, { avatar, idUserCloud });
};

const updateTokenVerify = async (id, verify, verificationToken) => {
  return await User.updateOne({ _id: id }, { verify, verificationToken });
};

module.exports = {
  currentUser,
  findById,
  findByEmail,
  findUserByVerifyToken,
  create,
  updateToken,
  updateAvatar,
  updateTokenVerify,
};
