import database from '../config/mysql.config.js';
import Response from '../domain/response.js';
import logger from '../util/logger.js';
import QUERY from '../query/query.js';
import HttpStatus from '../domain/httpstatus.js';


import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const SECRETE_KEY = process.env.SECRETE_KEY || "super_secrete_key";


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

    jwt.verify(req.token, SECRETE_KEY, (error, authData) => {
                
        if (error) {
            logger.info(`Error: ${error}`);
            return res.status(HttpStatus.FORBIDDEN.code)
                .send(new Response(HttpStatus.FORBIDDEN.code));
        }
            
        if ((authData.user_id) == (req.body.teacher_id).toString() ){ // this x
            console.log(Boolean(10));
            
        }  else { 
            
            return res.status(HttpStatus.FORBIDDEN.code)
                .send(new Response(HttpStatus.FORBIDDEN.code));
        }
    });


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

export const assignAssignment = (req,res) => {

    for (let i = 0; i < req.body.studentid.length; i++) {
        text += req.body.studentid[i] + "<br>";
      

    database.query(QUERY.Assign.PROVIDE, [...Object.values(req.body.assignment_id), [req.body.studentid[i]]], (error, results) => {
        if(!results) {

            res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)

                .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `ISError`, {'Error' : error})) 
       
        } else {     

             res.status(HttpStatus.CREATED.code)                                                                        
                 .send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, `Assignment Created`,{ Assignment: results})) 
        
        }
    });
}

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

            database.query(QUERY.ASSIGNMENT.UPDATE, [...Object.values(req.body), req.params.id], (error, results) => {
                if(error)
                {
                    
                  res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
                      .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `ISError`, {'Error' : error})) 
       
                } else {
                    res.status(HttpStatus.CREATED.code)                                                                        
                        .send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, `Assignment Updated`,{ Assignment: results})) 
                }
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

