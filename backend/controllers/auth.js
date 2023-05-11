// Import bcrypt to encrypt password
const bcrypt = require('bcrypt');

require('dotenv').config();

// Import User model
const User = require('../models/user');

const jwt = require('jsonwebtoken');


// Signup logic
const signup = (req, res, next) => {
  const cypherEmail = encrypt(req.body.email);
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      // Test if email is valid
      if (!validateEmail(req.body.email)) {
        return res.status(401).json({ message: 'Invalid Email !' });
      }
      if (!checkPasswordStrength(req.body.password)) {
        return res
          .status(401)
          .json({
            message:
              'Password complexity is weak, please check that your password contain at least 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character and 8 characters',
          });
      }
      const user = new User({
        email: cypherEmail,
        password: hash,
      });
      user
        .save()
        .then((userCreated) => {
          userCreated.email = decrypt(userCreated.email);
          res.status(201).json({
            message: 'User created',
            user: userCreated,
          });
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Sign-in logic
const login = (req, res, next) => {
  User.findOne({ email: encrypt(req.body.email) })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User does not exist !' });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ message: 'Invalid password !' });
          }
          user.email = decrypt(user.email);
          res.status(200).json({
            userId: user.id,
            token: jwt.sign(
              { userId: user._id },
              process.env.JWT_TOKEN_SECRET,
              { expiresIn: process.env.JWT_LIFETIME } // User must reconnect after 24h
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

export {signup, login} 
