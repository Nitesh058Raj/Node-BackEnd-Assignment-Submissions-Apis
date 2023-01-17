import database from '../config/mysql.config.js';
import Response from '../domain/response.js';
import logger from '../util/logger.js';
import QUERY from '../query/query.js';
import { createToken } from '../token/token.config.js';
import HttpStatus from '../domain/httpstatus.js';

export const createUser = (req, res) => {

    logger.info(`${req.method} ${req.originalUrl}, Creating User...`);
    
    database.query(QUERY.USER.CREATE, Object.values(req.body), (error, results) => { 
        
        if(error) {           
            
            res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
                
                .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `ISE`, {'Error' : error}))   
        
        }
    });
            
    const token = createToken(req.body.email);
            
    res.status(HttpStatus.OK.code)
               
       .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, { token: token }))
    
};

