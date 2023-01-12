import database from '../config/mysql.config.js';
import Response from '../domain/response.js';
import logger from '../util/logger.js';
import QUERY from '../query/assignments.query.js';
import { createToken } from '../token/token.config.js'

const HttpStatus = {
    OK: {code: 200, status: 'OK'},
    CREATED: {code: 201, status: 'CREATED'},
    NO_CONTENT: {code: 204, status: 'NO_CONTENT'},
    BAD_REQUEST: {code: 400, stat0us: 'BAD_REQUEST'},
    NOT_FOUND: {code: 404, status: 'NOT_FOUND'},
    INTERNAL_SERVER_ERROR: {code: 500, status: 'INTERNAL_SERVER_ERROR'},
    
};

export const getAssignments = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching Assignments`);

    database.query(QUERY.SELECT_ASSIGNMENTS, (error, results) => {
    
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
    database.query(QUERY.SELECT_ASSIGNMENT, [req.params.id], (error, results) => {
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
    logger.info(`${req.method} ${req.originalUrl}, Posting Assignment`);

    database.query(QUERY.CREATE_ASSIGNMENT, Object.values(req.body), (error, results) => {
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

    database.query(QUERY.SELECT_ASSIGNMENT, [req.params.id], (error, results) => {
        if(!results) {

            res.status(HttpStatus.NOT_FOUND.code)

                .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Not Found`)) 
       
        } else {     

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

    database.query(QUERY.SELECT_ASSIGNMENT, [req.params.id], (error, results) => {
        if(!results) {
            
            res.status(HttpStatus.NOT_FOUND.code)

                .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Not Found`)) 
       
        } else if (!results[0]) { 
          
            res.status(HttpStatus.NOT_FOUND.code)

                .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Not Found`)) 
       

        } else {     

            database.query(QUERY.DELETE_ASSIGNMENT, [req.params.id], (error, results) => {
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


export const CreateUser = (req, res) => {

    logger.info(`${req.method} ${req.originalUrl}, Creating User...`);
    
    database.query(QUERY.ADD_USER, Object.values(req.body), (error, results) => { 
        
        if(error) {           
            
            res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
                
                .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `ISE`, {'Error' : error}))   
        
        } else { 
            
            const token = createToken(req.body);
            
            res.status(HttpStatus.OK.code)
               
                .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, { token: token }))
        }
    });
};

export default HttpStatus;
