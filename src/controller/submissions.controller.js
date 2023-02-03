import database from '../config/mysql.config.js';
import Response from '../domain/response.js';
import logger from '../util/logger.js';
import QUERY from '../query/query.js';
import HttpStatus from '../domain/httpstatus.js';
import {verifyUserId} from '../token/token.config.js';



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


export const updateSubmission = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, Checking for Submission...`);

    database.query(QUERY.SUBMISSION.SELECT, [req.params.id], (error, results) => {
        if(!results) {

            res.status(HttpStatus.NOT_FOUND.code)

                .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `No data Found`)) 
            return; 
        } else if (!results[0]) { 
          
            res.status(HttpStatus.NOT_FOUND.code)

                .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Not Found`)) 
       
            return;

        } else {     

            // var y = Object.entries(results[0]);
            // var y2 = Object.entries(y[2]);
            // var [key, value] = y[2];
            var new_var = verifyUserId(Object.values(results[0])[2], req.token);
            console.log(new_var);
            logger.info(typeof(new_var));
            new_var = !!(new_var);
            logger.info(typeof(new_var));
            // logger.info(var2);
            if (new_var)
            {
                logger.info(`Good`);
            } else {
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
 
            //verifyUserId(results.student_id); 

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




