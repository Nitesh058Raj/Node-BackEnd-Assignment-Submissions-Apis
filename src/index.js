import express from 'express';
import ip from 'ip';
import dotenv from 'dotenv';
import cors from 'cors';

import Response from './domain/response.js';
import HttpStatus from './domain/httpstatus.js';
import logger from './util/logger.js';

import asRoute from './route/route.js';

dotenv.config();
const PORT = process.env.SERVER_PORT || 3000;
const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/api', asRoute);

app.get('/', (req, res) => {res.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'API WORKING FINE ' ))});
app.all('*', (req, res) => res.status(HttpStatus.NOT_FOUND.code)
        .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Route Dose not exist'))
);

app.listen(PORT, () => logger.info(`Server running on : ${ip.address()} : ${PORT}`));

