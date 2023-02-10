import database from '../config/mysql.config.js';
import Response from '../domain/response.js';
import logger from '../util/logger.js';
import QUERY from '../query/query.js';
import HttpStatus from '../domain/httpstatus.js';


export const getSubmissions = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching Submissions...`);

    database.query(QUERY.SUBMISSION.SELECT_ALL, (error, results) => {
    
        if(!results) {

            res.status(HttpStatus.OK.code)
                .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `No Submmisons are Found`))
       
        } else {     

             res.status(HttpStatus.OK.code)                                                                        
                 .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `All Submisssions :  `,{ Submissions: results}))
        
        }
    
    });

};


export const getSubmission = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching Submission...`);
    // db.query( query ,params(? = []) )
    database.query(QUERY.SUBMISSION.SELECT, [req.params.id], (error, results) => {
        if(!results[0]) {

            res.status(HttpStatus.NOT_FOUND.code)
                .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `id : ${req.params.id}  was  not found ` ))       
        } else {     

             res.status(HttpStatus.OK.code)                                                                        
                 .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Submission Found`,{ Submission: results}))  
 
        }
    });
};


export const createSubmission = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, Posting Submission...`);

    database.query(QUERY.SUBMISSION.CREATE, Object.values(req.body), (error, results) => {
        if(!results) {

            res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)

                .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `ISError`, {'Error' : error})) 
       
        } else {     

             res.status(HttpStatus.CREATED.code)                                                                        
                 .send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, `Submission submited `,{ Submission: results})) 
        
        }
    });

};


export const updateSubmission = async (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, Checking for Submission...`);

    database.query(QUERY.SUBMISSION.SELECT, [req.params.id], async (error, results) => {
        if(!results) {

            res.status(HttpStatus.NOT_FOUND.code)

                .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `No data Found`)) 
            return; 
        } else if (!results[0]) { 
          
            res.status(HttpStatus.NOT_FOUND.code)

                .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Not Found`)) 
       
            return;

        } else {     


            if ((req.auth.user_id) == (Object.values(results[0])[2]).toString() ){ 
                console.log(Boolean(10));
                
            }  else { 
                
                return res.status(HttpStatus.FORBIDDEN.code)
                    .send(new Response(HttpStatus.FORBIDDEN.code));
            }
            
            database.query(QUERY.SUBMISSION.UPDATE, [...Object.values(req.body), req.params.id], (error, results) => {
                if(error)
                {
                    
                  res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
                    .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `ISError`, {'Error' : error})) 
                    return;
                } 
                else {
                    res.status(HttpStatus.CREATED.code)                                                                        
                        .send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, `Submission Updated`,{ S:results}))  
                    return;
                }
            })
        }
    });
};


export const deleteSubmission = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, Checking for Submission`);

    database.query(QUERY.SUBMISSION.SELECT, [req.params.id], (error, results) => {
        if(!results) {
            
            res.status(HttpStatus.NOT_FOUND.code)

                .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Not Found`)) 
       
        } else if (!results[0]) { 
          
            res.status(HttpStatus.NOT_FOUND.code)

                .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Not Found`)) 
       

        } else {     
 
           

            database.query(QUERY.SUBMISSION.DELETE, [req.params.id], (error, results) => {
                if(error)
                {
                    
                  res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
                    .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `ISError`, {'Error' : error})) 
       
                } 
                res.status(HttpStatus.OK.code)                                                                        
                 .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Submission deleted`)) 
            })
        }
    });

};

/*
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();
const SECRETE_KEY = process.env.SECRETE_KEY || "super_secrete_key";
*/

 /*
            jwt.verify(req.token, SECRETE_KEY, (error, authData) => {
                
                if (error) {
                    logger.info(`Error: ${error}`);
                    return res.status(HttpStatus.FORBIDDEN.code)
                        .send(new Response(HttpStatus.FORBIDDEN.code));
                }
                    
                if ((authData.user_id) == (Object.values(results[0])[2]).toString() ){ // this x
                    console.log(Boolean(10));
                    
                }  else { 
                    
                    return res.status(HttpStatus.FORBIDDEN.code)
                        .send(new Response(HttpStatus.FORBIDDEN.code));
                }
            });
            */

