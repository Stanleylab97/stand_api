'use strict';
module.exports = (sequelize, DataTypes) => {
  const Commande = sequelize.define('Commande', {
    qte: DataTypes.INTEGER,
    montant: DataTypes.INTEGER
  }, {});
  Commande.associate = function(models) {
    // associations can be defined here
    models.Commande.belongsTo(models.User)
  };
  return Commande;
};