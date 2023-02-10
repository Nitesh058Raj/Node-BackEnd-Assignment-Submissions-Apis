import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Response from '../domain/response.js';
import HttpStatus from '../domain/httpstatus.js';
import logger from '../util/logger.js';

// GETTING THE SECRETE_KEY 
dotenv.config();
const SECRETE_KEY = process.env.SECRETE_KEY || "super_secrete_key";


export function createToken(x) {
   
    return jwt.sign(x , SECRETE_KEY)

};

export const verifyToken = ( req, res, next) => {

    logger.info(`Start auth`);

    const bearerHeader = req.headers["authorization"];
    
    //typeof bearerHeader !== undefined
    if (typeof bearerHeader !== "undefined") {
        // Token -->  Bearer <Encrypted_Token>
        const bearer = bearerHeader.split(" ");
        const btoken = bearer[1];
        req.token = btoken;
        logger.info(`Token extracted...`);
       //jwt.verify <-- [with route <-- if..else] <-- for teacher/student
        logger.info(`veriFy...`);
        jwt.verify(req.token, SECRETE_KEY, (error, authData) => {
            if (error) {
                return res.status(HttpStatus.FORBIDDEN.code)
                        .send(new Response(HttpStatus.FORBIDDEN.code)) 
            }
            req.auth = authData; 
        });
        
     } else {

        return res.status(HttpStatus.FORBIDDEN.code)
                    .send(new Response(HttpStatus.FORBIDDEN.code) )
        
     } 
     next();

}; 


export const verifyTeacher = ( req, res, next) => {

    if (req.auth.role !== 'teacher')
    {
            return res.status(HttpStatus.FORBIDDEN.code)
                       .send(new Response(HttpStatus.FORBIDDEN.code)) 
    }
    next();
   
};


export const verifyStudent = ( req, res, next) => {

    if (req.auth.role !== 'student')
    {
            return res.status(HttpStatus.FORBIDDEN.code)
                       .send(new Response(HttpStatus.FORBIDDEN.code)) 
    }
    next();
 
};

