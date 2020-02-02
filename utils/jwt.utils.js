
var jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET='kjblmtrjbvsqeb354645b6b7xgtry5';
module.exports={
    generateTokenForUser:function(userData){
        return jwt.sign({
            userId:userData.id,
            email:userData.email,
            nom:userData.nom
        },
        JWT_SIGN_SECRET,
        {
            expiresIn:'1h'
        })  
    }
}
