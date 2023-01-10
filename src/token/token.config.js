import jwt from 'jsonwebtoken';

const SECRETE_KEY = "super_secrete_key";


const HttpStatus = {
    OK: {code: 200, status: 'OK'},
    FORBIDDEN: {code: 403, status: 'FDN'}
};

export function createToken(x) {
    
   return jwt.sign(x , SECRETE_KEY)

};

export const verifyToken = ( req, res, next) => {

    const bearerHeader = req.headers["authorization"];
    
    //typeof bearerHeader !== undefined
    if (typeof bearerHeader !== "undefined") {
        // Token -->  Bearer <Encrypted_Token>
        const bearer = bearerHeader.split(" ");
        const btoken = bearer[1];
        req.token = btoken;
     
        jwt.verify(req.token, "Nit_Secret_Key", (error, authenticationData) => {
            if (error) {
            
               return res.status(HttpStatus.FORBIDDEN.code)
                        .send(new Response(HttpStatus.FORBIDDEN.code)) 
    
            }
        });


     } else {

       return  res.status(HttpStatus.FORBIDDEN.code)
                .send(new Response(HttpStatus.FORBIDDEN.code) )
     } 
     next();

};



//export default {createToken, verifyToken}; 

