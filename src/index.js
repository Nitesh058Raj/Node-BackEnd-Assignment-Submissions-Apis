import express from 'express';
import ip from 'ip';
import dotenv from 'dotenv';
import cors from 'cors';

import Response from './domain/response.js';
import HttpStatus from './controller/nn.controller.js';
import logger from './util/logger.js';

dotenv.config();
const PORT = process.env.SERVER_PORT || 3000;
const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());


app.get('/', (req, res) => {res.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'API MSG', {user:'Nit'} ))});


app.listen(PORT, () => logger.info(`Server running on : ${ip.address()} : ${PORT}`));

