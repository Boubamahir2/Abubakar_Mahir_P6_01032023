/**************** Déclarations et Importations***************** */

const Sauce = require("../models/sauce");
const fs = require("fs-extra"); //Package pour accéder et interagir avec le système de fichiers

/********************** logique metier ************************************* */

/***********Création d'une nouvelle sauce ************ */

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    likes: 0,
    dislikes: 0,
    usersLiked: [" "],
    usersdisLiked: [" "],
  });
  //enregister la sauce dans la base de donnée en appelant la méthode save
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce enregistrée" }))
    .catch((error) => res.status(400).json({ error }));
};

/*********** Modification d'une sauce *********** */
exports.updateSauce = (req, res, next) => {
/* si on modifie le fichier image, récupérer le nom du fichier image sauce actuelle et suppression
  pour éviter d'avoir un fichier inutile dans le dossier images */
  if (req.file) {
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        const filename = sauce.imageUrl.split("/images")[1];
        //suppression de l'image de la sauce car elle va être remplacer par la nouvelle image de sauce
        // On utilise la méthode unlink du package fs qui supprime un fichier ou un lien symbolique
        fs.unlink(`images/${filename}`, (err) => {
          if (err) throw err;
        });
      })
      .catch((error) => res.status(400).json({ error }));
  } else {
  }
  
  //l'objet qui va être envoyé dans la base de donnée
  // Vérification si le user modifie l'image en regardant si le req.file existe et on traite la nouvelle image
  // s'il n'existe pas, on traite simplement l'objet entrant
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(res.status(200).json({ message: "Sauce modifiée" }))
    .catch((error) => res.status(400).json({ error }));
};

/********** Récupération de toutes les sauces ************ */

exports.getAllSauces = (req, res, next) => {
  // utilisation de la méthode find() pour avoir la liste complete
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(404).json({ error }));
};

/********* Récuperation d'une seul sauce ************** */

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }) // nous utilisons l'ID que nous recevons en paramètres pour accéder à la Sauce correspondant dans la BDD

    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

/********** Suppression d'une sauce ********************** */
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }) // nous utilisons l'ID que nous recevons en paramètres pour accéder à la Sauce correspondant dans la BDD

    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1]; // On récupère avec la méthode split le nom ficher image dans l'URL

      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(res.status(200).json({ message: "Sauce supprimée" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};
