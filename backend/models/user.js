// The mongoose library is imported at the top of the file, along with the bcryptjs and jsonwebtoken libraries which are used for password hashing and JSON Web Tokens (JWTs) respectively.
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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

const User = mongoose.model('User', UserSchema);
export default User;
