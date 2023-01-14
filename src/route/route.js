import express from 'express';

import {getAssignments, getAssignment, createAssignment, updateAssignment, deleteAssignment } from '../controller/assignments.controller.js';
import { createUser } from '../controller/users.controller.js';
import {getSubmissions, getSubmission, createSubmission, updateSubmission, deleteSubmission} from '../controller/submissions.controller.js';
import { verifyToken } from '../token/token.config.js';

const asRoute = express.Router();

asRoute.route('/auth')
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
    .post( verifyToken, createSubmission)

asRoute.route('/submission/:id')
    .get( verifyToken, getSubmission)
    .post( verifyToken, updateSubmission);

asRoute.route('/submission/delete/:id')
    .get( verifyToken, deleteSubmission);

export default asRoute;


