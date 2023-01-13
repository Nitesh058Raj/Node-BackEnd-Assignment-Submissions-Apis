import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Response from '../domain/response.js';
import HttpStatus from '../domain/HttpStatus.js';

dotenv.config();

const SECRETE_KEY = process.env.SECRETE_KEY || "super_secrete_key";

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
     
        jwt.verify(req.token, SECRETE_KEY, (error, authenticationData) => {
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

