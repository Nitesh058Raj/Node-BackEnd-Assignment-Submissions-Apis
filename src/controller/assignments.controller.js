import database from '../config/mysql.config.js';
import Response from '../domain/response.js';
import logger from '../util/logger.js';
import QUERY from '../query/query.js';
import HttpStatus from '../domain/httpstatus.js';
import {verifyUserId} from '../token/token.config.js';

export const getAssignments = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching Assignments...`);

    database.query(QUERY.ASSIGNMENT.SELECT_ALL, (error, results) => {
    
        if(!results) {

            res.status(HttpStatus.OK.code)
                .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `No Assignments are Found`))
       
        } else {     

             res.status(HttpStatus.OK.code)                                                                        
                 .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `All Assignments: `,{ Assignments: results}))
        
        }
    
    });

};


export const getAssignment = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching Assignments`);
    // db.query( query ,params(? = []) )
    database.query(QUERY.ASSIGNMENT.SELECT, [req.params.id], (error, results) => {
        if(!results[0]) {

            res.status(HttpStatus.NOT_FOUND.code)
                .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `id : ${req.params.id}  was  not found ` ))       
        } else {     

             res.status(HttpStatus.OK.code)                                                                        
                 .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Assignment Found`,{ Assignment: results}))  
 
        }
    });
};

export const createAssignment = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, Posting Assignment...`);

    database.query(QUERY.ASSIGNMENT.CREATE, Object.values(req.body), (error, results) => {
        if(!results) {

            res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)

                .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `ISError`, {'Error' : error})) 
       
        } else {     

             res.status(HttpStatus.CREATED.code)                                                                        
                 .send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, `Assignment Created`,{ Assignment: results})) 
        
        }
    });

};


export const updateAssignment = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, Checking for Assignment`);

    database.query(QUERY.ASSIGNMENT.SELECT, [req.params.id], (error, results) => {
        if(!results) {

            res.status(HttpStatus.NOT_FOUND.code)

                .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Not Found`)) 
       
        } else if (!results[0]) { 
          
            res.status(HttpStatus.NOT_FOUND.code)

                .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Not Found`)) 
        }
        else {    

            //verifyUserId(results.teacher_id); 

            database.query(QUERY.UPDATE_ASSIGNMENT, [...Object.values(req.body), req.params.id], (error, results) => {
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



export const deleteAssignment = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, Checking for Assignment`);

    database.query(QUERY.ASSIGNMENT.SELECT, [req.params.id], (error, results) => {
        if(!results) {
            
            res.status(HttpStatus.NOT_FOUND.code)

                .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Not Found`)) 
       
        } else if (!results[0]) { 
          
            res.status(HttpStatus.NOT_FOUND.code)

                .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Not Found`)) 
       

        } else {     
            
           // verifyUserId(results.teacher_id); 

            database.query(QUERY.ASSIGNMENT.DELETE, [req.params.id], (error, results) => {
                if(error)
                {
                    
                  res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
                    .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `ISError`, {'Error' : error})) 
       
                } 
                res.status(HttpStatus.OK.code)                                                                        
                 .send(new Response(HttpStatus.OK.code, HttpStatus.CREATED.status, `Assignment deleted`)) 
            })
        }
    });

};


export const sortAssignmentByDueDate = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching Assignments`);
    // db.query( query ,params(? = []) )
    database.query(QUERY.SORT.DUE_DATE, (error, results) => {
        if(!results) {

            res.status(HttpStatus.NOT_FOUND.code)
                .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Data not found ` ))       
        } else {     

             res.status(HttpStatus.OK.code)                                                                        
                 .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Assignments sorted by due dates`,{ Assignments: results}))  
 
        }
    });
};


export const sortAssignmentByGrade = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching Assignments`);
    // db.query( query ,params(? = []) )
    database.query(QUERY.SORT.GRADE, (error, results) => {
        if(!results) {

            res.status(HttpStatus.NOT_FOUND.code)
                .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Data not found ` ))       
        } else {     

             res.status(HttpStatus.OK.code)                                                                        
                 .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Sorted Assignments Found`,{ Assignments: results}))  
 
        }
    });
};

