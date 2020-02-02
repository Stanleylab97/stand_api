//Imports
var bcrypt=require('bcrypt-nodejs');
var jwt   =require('../utils/jwt.utils');
var models=require('../models');

//Routes
module.exports={
    register:function(req,res){
    //parameters
    var id=req.body.id;
     var nom=req.body.nom;  
     var email=req.body.email;
     var password= req.body.password==undefined ? 12345678:req.body.password;
     

     if(nom==null || email==null){
        return res.status(400).json({'error':'Paramètre(s) manquant(s)'})
     }

     models.User.findOne({ 
         attributes:['email'],
         where:{email:email}
     })
     .then(function(userFound){
        if(!userFound){
            bcrypt.hash(password,5,function(err,bcryptedPassword){
                var newUser=models.User.create({
                    id:id,
                    nom:nom,
                    email:email,
                    password:bcryptedPassword
                })
                .then(function(newUser){
                    return res.status(201).json({
                        'userId':newUser.id
                    })
                })
                .catch(function(err){
                    return res.status(500).json({'error':'L\'utilisateur n\'a pas pu être ajouté'});
                })
            })

        }else{
            return res.status(409).json({'error':'Un utilisateur existe déjà avec cet email'})
        }
     })
     .catch(function(err){
        return res.status(500).json({'error':'Impossible de vérifier l\'utilisateur'})
     });
      
    },
    login:function(req,res){
        var email=req.body.email;
        var password=req.body.password;
        
        if(email==null || password==null){
            return res.status(400).json({'error':'missing parameters'})
        }

        models.User.findOne({
            where:{email:email}
        })
        .then(function(userFound){
            if(userFound){
                bcrypt.compare(password,userFound.password,function(errBycrypt,resBycrypt){
                if(resBycrypt){
                    return res.status(200).json({
                        'userId':userFound.id,
                        'token':jwtUtils.generateTokenForUser(userFound)
                    });   
                }else{
                    return res.status(403).json({'error':'invalid password'});
                }    
                })
            }
        })
        .catch(function(err){
            return res.status(500).json({'error':'unaable to verify user'})
        });
    },
    getUser:function(req,res){

    },
    getUsers:function(req,res){

    },
    updateUser:function(req,res){

    },
    deleteUser:function(req,res){

    }
    
}