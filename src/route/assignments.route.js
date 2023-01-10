import express from 'express';

import {getAssignments, getAssignment, createAssignment, updateAssignment, deleteAssignment, addUser } from '../controller/assignments.controller.js';
import { verifyToken } from '../token/token.config.js';

const asRoute = express.Router();

asRoute.route('/login')
    .post(addUser)

asRoute.route('/')
    .get( verifyToken, getAssignments)
    .post( verifyToken, createAssignment);

asRoute.route('/:id')
    .get( verifyToken, getAssignment)
    .post( verifyToken, updateAssignment);

asRoute.route('/delete/:id')
    .get( verifyToken, deleteAssignment)


export default asRoute;


