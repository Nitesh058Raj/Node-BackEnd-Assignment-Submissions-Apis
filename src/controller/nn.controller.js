import database from '../config/mysql.config.js';
import Response from '../domain/response.js';
import logger from '../util/logger.js';
import QUERY from '../query/nn.query.js';

const HttpStatus = {
    OK: {code: 200, status: 'OK'},
    CREATED: {code: 201, status: 'CREATED'},
    NO_CONTENT: {code: 204, status: 'NO_CONTENT'},
    BAD_REQUEST: {code: 400, stat0us: 'BAD_REQUEST'},
    NOT_FOUND: {code: 404, status: 'NOT_FOUND'},
    INTERNAL_SERVER_ERROR: {code: 500, status: 'INTERNAL_SERVER_ERROR'},
    
};


export const getUsers = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching User`);

    database.query(QUERY.SELECT_USERS, (error, results) => {
        if(!results) {

            res.status(HttpStatus.OK.code)
                .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `No User Found`))
       
        } else {     

             res.status(HttpStatus.OK.code)                                                                        
                 .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `All User Found`,{ User: results}))
        
        }
    
    });

};


export const getUser = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching User`);
    // db.query( query ,params(? = []) )
    database.query(QUERY.SELECT_USER, [req.params.id], (error, results) => {
        if(!results[0]) {

            res.status(HttpStatus.NOT_FOUND.code)
                .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `id : ${req.params.id}  was  not found ` ))       
        } else {     

             res.status(HttpStatus.OK.code)                                                                        
                 .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `User Found`,{ User: results}))  
        }
    
    });

};

export const createUser = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching User`);

    database.query(QUERY.CREATE_USER, Object.values(req.body), (error, results) => {
        if(!results) {

            res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
                .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `ISError`)) 
       
        } else {     

             res.status(HttpStatus.CREATED.code)                                                                        
                 .send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, `User Created`,{ User: results})) 
        
        }
    
    });

};


export default HttpStatus;
