import express from 'express';

import {getAssignments, getAssignment, createAssignment, updateAssignment, deleteAssignment } from '../controller/assignments.controller.js';
import { createUser } from '../controller/users.controller.js';
import {getSubmissions, getSubmission, createSubmission, updateSubmission, deleteSubmission} from '../controller/submissions.controller.js';
import { verifyToken, verifyStudent, verifyTeacher } from '../token/token.config.js';

const asRoute = express.Router();

asRoute.route('/auth')
    .post(createUser)

asRoute.route('/users')
    .get( verifyToken, getUsers)

asRoute.route('/assignment')
    .get( verifyToken, verifyTeacher, getAssignments)
    .post( verifyToken, verifyTeacher, createAssignment);

asRoute.route('/assignment/:id')
    .get( verifyToken, verifyTeacher, getAssignment)
    .post( verifyToken, verifyTeacher, updateAssignment);

asRoute.route('/assignment/delete/:id')
    .get( verifyToken, verifyTeacher, deleteAssignment)

asRoute.route('/submission')
    .get( verifyToken, verifyStudent, getSubmissions)
    .post( verifyToken, verifyStudent, createSubmission)

asRoute.route('/submission/:id')
    .get( verifyToken, verifyStudent, getSubmission)
    .post( verifyToken, verifyStudent, updateSubmission);

asRoute.route('/submission/delete/:id')
    .get( verifyToken, verifyStudent, deleteSubmission);

export default asRoute;


