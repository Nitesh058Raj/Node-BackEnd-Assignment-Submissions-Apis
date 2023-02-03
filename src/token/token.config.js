import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Response from '../domain/response.js';
import HttpStatus from '../domain/httpstatus.js';
import logger from '../util/logger.js';
// import database from '../config/mysql.config.js';
// import QUERY from '../query/query.js';

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
           // logger.info(authData);
           // logger.info(authData["role"]);
           // logger.info(authData.role);
        });
        
     } else {

        return res.status(HttpStatus.FORBIDDEN.code)
                    .send(new Response(HttpStatus.FORBIDDEN.code) )
        
     } 
     next();

}; 


// Userid checking will determine the teachers (t1, t2, ...., tn) or students (s1, s2, ..., sn) 
export function verifyUserId(user_id, token ) {
    // req.token
    logger.info(`UserId is being verified...`);
    logger.info(typeof(user_id));
    //logger.info(token)
    jwt.verify(token, SECRETE_KEY, (error, authData) => {
        //logger.info(token)
        if (error) {
            logger.info(`Error: ${error}`);
            return false;
        }
        logger.info(token)
           // JSON.stringify()    
        if ((authData.user_id) == (user_id).toString() ){ // this x
            logger.info(`GG`);
            return "GG";
        }  else { 
            logger.info(`UserId Auth : ${authData.user_id}`);
            logger.info(`UserId Non : ${user_id}`);
            return "false";
        }
    });
}; 


export const verifyTeacher = ( req, res, next) => {
    
    logger.info(`VerifyTeacher...`);
    jwt.verify(req.token, SECRETE_KEY, (error, authData) => {
        if (error) {
            return res.status(HttpStatus.FORBIDDEN.code)
                       .send(new Response(HttpStatus.FORBIDDEN.code)) 
        }
        //logger.info(authData);
        if (authData.role !== 'teacher')
        {
            return res.status(HttpStatus.FORBIDDEN.code)
                       .send(new Response(HttpStatus.FORBIDDEN.code)) 
        }

    });
    next();
};


export const verifyStudent = ( req, res, next) => {
 
    jwt.verify(req.token, SECRETE_KEY, (error, authData) => {
        if (error) {
            return res.status(HttpStatus.FORBIDDEN.code)
                       .send(new Response(HttpStatus.FORBIDDEN.code));
        }
        // For Every Student
        if (authData.role !== 'student')
        {
            return res.status(HttpStatus.FORBIDDEN.code)
                       .send(new Response(HttpStatus.FORBIDDEN.code));
        }    

    });
    
    next();
};

/*
export const verifyAll = ( req, res, next) => {
    
    logger.info(`veriFy...`);
    jwt.verify(req.token, SECRETE_KEY, (error, authData) => {
        if (error) {
            return res.status(HttpStatus.FORBIDDEN.code)
                       .send(new Response(HttpStatus.FORBIDDEN.code)) 
        }
    });

    next();

};
//export default {createToken, verifyToken}; 
*/
