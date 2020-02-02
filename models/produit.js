'use strict';
module.exports = (sequelize, DataTypes) => {
  const Produit = sequelize.define('Produit', {
    libelleProduit: DataTypes.STRING,
    prix: DataTypes.INTEGER
  }, {});
  Produit.associate = function(models) {
    // associations can be defined here
       models.Produit.hasMany(models.Commande)
  };
  return Produit;
};