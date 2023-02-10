
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

/*
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
    */

/*
// Userid checking will determine the teachers (t1, t2, ...., tn) or students (s1, s2, ..., sn) 
export async function verifyUserId(user_id, token ) {
    // req.token
    logger.info(`UserId is being verified...`);
    logger.info(typeof(user_id));
    //logger.info(token)
    await jwt.verify(token, SECRETE_KEY, (error, authData) => {
        //logger.info(token)
        if (error) {
            logger.info(`Error: ${error}`);
            return {result : false};
        }
        logger.info(token)
           // JSON.stringify()    
        if ((authData.user_id) == (user_id).toString() ){ // this x
            console.log(Boolean(10));
            return {result : true};
        }  else { 
            logger.info(`UserId Auth : ${authData.user_id}`);
            logger.info(`UserId Non : ${user_id}`);
            return {result : false};
        }
    });
}; 
*/
// import database from '../config/mysql.config.js';
// import QUERY from '../query/query.js';
