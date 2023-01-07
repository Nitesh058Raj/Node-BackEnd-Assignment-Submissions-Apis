import express from 'express';

import {getUsers, getUser, createUser} from '../controller/nn.controller.js';

const nnRoute = express.Router();

nnRoute.route('/')
    .get(getUsers)
    .post(createUser);

nnRoute.route('/:id')
    .get(getUser);


export default nnRoute;


