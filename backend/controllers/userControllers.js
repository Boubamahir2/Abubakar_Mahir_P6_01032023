/************** Déclarations et importation ******************/
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const cryptojs = require("crypto-js"); //Déclaration et importation du package crypto-js pour chiffrer déchiffrer l'email dans la base de donnée
require("dotenv").config(); //importation pour utilisation des variables

/********************** Controllers ***************************** */

// signup pour enregistrer un nouvel utilisateur
exports.signup = (req, res, next) => {
  //chiffrer l'email dans la base de donnée
  const emailCryptoJs = cryptojs
    .HmacSHA512(req.body.email, `${process.env.CRYPTOJS_EMAIL_KEY}`)
    .toString();

  // bcrypt pour hasher le mot de passe
  bcrypt
    .hash(req.body.password, 10) // salt = 10 => combien de fois sera exécuté l'algorithme de hashage
    .then((hash) => {
      // ce qui sera enregistré dans mongoDB
      const user = new User({
        email: emailCryptoJs,
        password: hash,
      });
      // pour l'enregistrer dans la base de donnée
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Login pour controller la validité de l'utilisateur qui se connecte

exports.login = (req, res, next) => {
  const emailCryptoJs = cryptojs
    .HmacSHA512(req.body.email, `${process.env.CRYPTOJS_EMAIL_KEY}`)
    .toString();

  // chercher avec la méthode findOne() de mongoDB le mail de l'utilsateur chiffré dans la base de donnée collection User s'il existe
  User.findOne({ email: emailCryptoJs })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      // le user existe on utilise la methode compare() de bcrypt pour comparé le mdp envoyé par l'utilisateur
      // avec le hash qui est enregistré avec le user dans la base de donnée
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            // reçoit un booleean true ou false
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              // 3 arguments
              { userId: user._id }, // user id
              process.env.SECRET_TOKEN, // la clé de chiffrement du token
              { expiresIn: "24h" } // le temps de validé du token
            ),
          });
        })
        .catch((error) => res.status(500).json({ error })); // erreur serveur
    })
    .catch((error) => res.status(500).json({ error })); // erreur serveur
};
