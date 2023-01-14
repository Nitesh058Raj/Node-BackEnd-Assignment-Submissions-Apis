import database from '../config/mysql.config.js';
import Response from '../domain/response.js';
import logger from '../util/logger.js';
import QUERY from '../query/query.js';
import HttpStatus from '../domain/httpstatus.js';


export const getSubmissions = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching Assignments`);

    database.query(QUERY.SUBMISSION.SELECT_ALL, (error, results) => {
    
        if(!results) {

            res.status(HttpStatus.OK.code)
                .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `No Assignments are Found`))
       
        } else {     

             res.status(HttpStatus.OK.code)                                                                        
                 .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `All Assignments: `,{ Assignments: results}))
        
        }
    
    });

};


export const getSubmission= (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching Assignments`);
    // db.query( query ,params(? = []) )
    database.query(QUERY.SUBMISSION.SELECT, [req.params.id], (error, results) => {
        if(!results[0]) {

            res.status(HttpStatus.NOT_FOUND.code)
                .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `id : ${req.params.id}  was  not found ` ))       
        } else {     

             res.status(HttpStatus.OK.code)                                                                        
                 .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Assignment Found`,{ Assignment: results}))  
 
        }
    });
};


export const createSubmission = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, Posting Assignment`);

    database.query(QUERY.SUBMISSION.CREATE, Object.values(req.body), (error, results) => {
        if(!results) {

            res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)

                .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `ISError`, {'Error' : error})) 
       
        } else {     

             res.status(HttpStatus.CREATED.code)                                                                        
                 .send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, `Assignment Created`,{ Assignment: results})) 
        
        }
    });

};


export const updateSubmission = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, Checking for Assignment`);

    database.query(QUERY.SUBMISSION.SELECT, [req.params.id], (error, results) => {
        if(!results) {

            res.status(HttpStatus.NOT_FOUND.code)

                .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Not Found`)) 
       
        } else {     

            database.query(QUERY.SUBMISSION.UPDATE, [...Object.values(req.body), req.params.id], (error, results) => {
                if(error)
                {
                    
                  res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
                    .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `ISError`, {'Error' : error})) 
       
                } 
                res.status(HttpStatus.CREATED.code)                                                                        
                 .send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, `Assignment Updated`,{ Assignment: results})) 
            })
        }
    });
};


export const deleteSubmission = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, Checking for Assignment`);

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
                res.status(HttpStatus.CREATED.code)                                                                        
                 .send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, `Assignment deleted`)) 
            })
        }
    });

};
