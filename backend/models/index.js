import User from './user/User.js';
import Sauce from './sauce/Sauce.js';
import SauceLike from './sauce/SauceLike.js';
import AuthToken from './user/authToken.js';


const models = {};

models.User = User;
models.AuthToken = AuthToken;
models.Sauce = Sauce;
models.SauceLike = SauceLike;

export default models;