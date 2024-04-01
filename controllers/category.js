const Category = require('../models/Category')

const fs = require('fs')

exports.createCategory = (req, res, next) => {
   const categoryObjet = JSON.parse(req.body.category)
   delete categoryObjet._id
   delete categoryObjet._userId
   const category = new Category({
      ...categoryObjet,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}:${req.get('host')}/image/${req.file.filename}`
   })
    category.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  }

  exports.getOneCategory = (req, res, next) => {
    Category.findOne({ _id: req.params.id })
      .then(category => res.status(200).json(category))
      .catch(error => res.status(404).json({ error }));
  }

  exports.getAllCategorys = (req, res, next) => {
    Category.find()
      .then(categorys => res.status(200).json(categorys))
      .catch(error => res.status(400).json({ error }));
  } 

  exports.modifyCategory = (req, res, next) => {
    const categoryObjet = req.file ? {
        ...JSON.parse(req.body.category),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  
    delete categoryObjet._userId;
    Category.findOne({_id: req.params.id})
        .then((category) => {
            if (category.userId != req.auth.userId) {
                res.status(401).json({ message : 'Not authorized'});
            } else {
                Category.updateOne({ _id: req.params.id}, { ...categoryObjet, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Objet modifié!'}))
                .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
 };

 exports.deleteCategory = (req, res, next) => {
  Category.findOne({ _id: req.params.id})
      .then(category => {
          if (category.userId != req.auth.userId) {
              res.status(401).json({message: 'Not authorized'});
          } else {
              const filename = category.imageUrl.split('/images/')[1];
              fs.unlink(`images/${filename}`, () => {
                  category.deleteOne({_id: req.params.id})
                      .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                      .catch(error => res.status(401).json({ error }));
              });
          }
      })
      .catch( error => {
          res.status(500).json({ error });
      });
};