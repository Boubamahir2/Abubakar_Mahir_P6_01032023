import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import uniqueValidator from 'mongoose-unique-validator';

// A new UserSchema object is created using the mongoose.Schema() method. This defines the shape of the user data that will be stored in the database. In this case, the schema has two fields: email and password.
const UserSchema = new mongoose.Schema(
  {
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

UserSchema.plugin(uniqueValidator);

// A pre hook is defined on the UserSchema object using the pre() method. This hook is executed before a new user is saved to the database, and it hashes the user's password using bcryptjs.
UserSchema.pre('save', async function () {
  // console.log(this.modifiedPaths())
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Two instance methods are defined on the UserSchema object using the methods property. The createJWT() method creates a JWT for the user, and saves a record of the token in the database.
UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

// The comparePassword() method compares a given password to the user's hashed password to determine if they match.
UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

const User = mongoose.model('User', UserSchema);
export default User;
