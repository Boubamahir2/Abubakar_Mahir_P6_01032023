import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'email is required'],
    trim: true,
    unique: true,
    max: 40,
  },
  password: {
    type: String,
    required: [true, 'Please enter a password.'],
    minlength: [8, 'password must be at least 8 characters.'],
    select: false,
  },
  
},
{ timestamps: true }

);


UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = async function () {
  const token = jwt.sign(
    { userId: this._id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );

  const decodedData = jwt.decode(token);

  const authToken = await models.AuthToken.create({
    token: token,
    user: this._id,
    expiresAt: decodedData.exp,
  });

  return authToken;
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};


const User = mongoose.model('User', UserSchema);
export default User;