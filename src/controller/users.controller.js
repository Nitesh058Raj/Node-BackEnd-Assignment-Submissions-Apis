import database from "../config/mysql.config.js";
import Response from "../domain/response.js";
import logger from "../util/logger.js";
import QUERY from "../query/query.js";
import { createToken } from "../token/token.config.js";
import HttpStatus from "../domain/httpstatus.js";

export const createUser = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl} , Creating User...`);

  database.query(QUERY.USER.CREATE, Object.values(req.body), (error, results) => {
    if(!results) {

        res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)

            .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `ISError`, {'Error' : error})) 
   
    } else {     
      logger.info(`User created...`);
      database.query(QUERY.USER.EMAIL, [req.body.email], (error, results) => {
        if (error) {
          res
            .status(HttpStatus.NOT_FOUND.code)
    
            .send(
              new Response(
                HttpStatus.NOT_FOUND.code,
                HttpStatus.NOT_FOUND.status,
                `Not Found`
              )
            );
          
        } else {
         
          const token = createToken(JSON.stringify(results[0]));
          logger.info(token);
    
          res.status(HttpStatus.OK.code).send(
            new Response(HttpStatus.OK.code, HttpStatus.OK.status, {
              token: token,
            })
          );
          
        }
      });
    }
});


};
