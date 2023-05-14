const Sauce = require("../models/sauce");

//*****************Logique Métier************** *

exports.likeSauce = (req, res, next) => {
  //contenu de la requête like dislike envoyé par le navigateur
  const sauceLikeObject = req.body;

  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      //like = +1 (like +1 l'utilisateur ajoute un like)

      if (!sauce.usersLiked.includes(req.body.userId) && req.body.like == 1) {
        // l'userId n'est pas dans le tableau [usersLiked] de BDD et la requête like = +1

        console.log("ok like +1");

        // Mise à jour de l'objet sauce dans BDD
        Sauce.updateOne(
          { _id: req.params.id },
          {
            $inc: { likes: 1 }, // l'opérateur mongoDB $ inc incrémente un champ d'un valeur spécifiée, ici likes +1
            $push: { usersLiked: req.body.userId }, // l'opérateur mongoDB push pour ajouter l'id de l'utilisateur dans le tableau usersLiked
            _id: req.params.id,
          }
        )
          .then(() => res.status(201).json({ message: "sauce +1 like" }))
          .catch((error) => {
            res.status(400).json({ error });
          });
      }

      // like = 0 (si l'utilisateur annule son like)

      if (sauce.usersLiked.includes(req.body.userId) && req.body.like == 0) {
        // l'userId est le tableau [usersLiked] de la BDD et la requête like = 0

        console.log("ok like = 0");

        // Mise à jour de l'objet sauce dans BDD
        Sauce.updateOne(
          { _id: req.params.id },
          {
            $inc: { likes: -1 }, // l'opérateur mongoDB $ inc incrémente un champ d'un valeur spécifiée, ici likes -1
            $pull: { usersLiked: req.body.userId }, // l'opérateur mongoDB pull pour supprimer l'id de l'utilisateur dans le tableau userLiked
            _id: req.params.id,
          }
        )
          .then(() => res.status(201).json({ message: "sauce 0 like" }))
          .catch((error) => {
            res.status(400).json({ error });
          });
      }

      //like = -1 (dislike = +1 l'utilisateur ajoute un dislike)
      if (
        !sauce.usersDisliked.includes(req.body.userId) &&
        req.body.like == -1
      ) {
        // l'userId n'est pas dans le tableau [usersDisliked] de BDD et la requête like = -1

        console.log("ok dislike +1");

        // Mise à jour de l'objet sauce dans BDD
        Sauce.updateOne(
          { _id: req.params.id },
          {
            $inc: { dislikes: 1 }, // l'opérateur mongoDB $ inc incrémente un champ d'un valeur spécifiée, ici dislikes +1
            $push: { usersDisliked: req.body.userId }, // l'opérateur mongoDB push pour ajouter l'id de l'utilisateur dans le tableau usersDisliked

            _id: req.params.id,
          }
        )
          .then(() => res.status(201).json({ message: "sauce +1 dislike" }))
          .catch((error) => {
            res.status(400).json({ error });
          });
      }

      // dislike = 0 (si l'utilisateur annule son dislike)

      if (sauce.usersDisliked.includes(req.body.userId) && req.body.like == 0) {
        // l'userId est le tableau [usersLiked] de la BDD et la requête like = 0

        console.log("ok dislike = 0");

        // Mise à jour de l'objet sauce dans BDD
        Sauce.updateOne(
          { _id: req.params.id },
          {
            $inc: { dislikes: -1 }, // l'opérateur mongoDB $ inc incrémente un champ d'un valeur spécifiée, ici dislikes -1
            $pull: { usersDisliked: req.body.userId }, // l'opérateur mongoDB pull pour supprimer l'id de l'utilisateur dans le tableau userDisliked
            _id: req.params.id,
          }
        )
          .then(() => res.status(201).json({ message: "sauce 0 like" }))
          .catch((error) => {
            res.status(400).json({ error });
          });
      }
    })
    .catch((error) => res.status(404).json({ error }));
};
