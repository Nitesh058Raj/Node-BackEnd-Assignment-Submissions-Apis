import express from 'express';

import {getAssignments, getAssignment, createAssignment, updateAssignment, deleteAssignment, createUser } from '../controller/assignments.controller.js';
import { createUser } from '../controller/users.controller.js';
import { verifyToken } from '../token/token.config.js';

const asRoute = express.Router();

asRoute.route('/authentication')
    .post(createUser)

asRoute.route('/users')
    .get( verifyToken, getUsers)

asRoute.route('/assignment')
    .get( verifyToken, getAssignments)
    .post( verifyToken, createAssignment);

asRoute.route('/assignment/:id')
    .get( verifyToken, getAssignment)
    .post( verifyToken, updateAssignment);

asRoute.route('/assignment/delete/:id')
    .get( verifyToken, deleteAssignment)

asRoute.route('/submission')
    .get( verifyToken, getSubmissions)
    .post( verifyToken, createSubmissio)

export default asRoute;


