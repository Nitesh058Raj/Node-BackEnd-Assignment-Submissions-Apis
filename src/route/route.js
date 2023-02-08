import express from 'express';

import { getAssignments, getAssignment, createAssignment, updateAssignment, deleteAssignment, assignAssignment,sortAssignmentByDueDate, sortAssignmentByGrade } from '../controller/assignments.controller.js';
import { createUser } from '../controller/users.controller.js';
import { getSubmissions, getSubmission, createSubmission, updateSubmission, deleteSubmission} from '../controller/submissions.controller.js';
import { verifyToken, verifyTeacher , verifyStudent } from '../token/token.config.js';

const asRoute = express.Router();

asRoute.route('/auth')
    .post(createUser);

asRoute.route('/assignment')
    .get( verifyToken, getAssignments)
    .post( verifyToken, verifyTeacher,  createAssignment);

asRoute.route('/assignment/due')
    .get( verifyToken,  sortAssignmentByDueDate);

asRoute.route('/assignment/grade') 
    .get( verifyToken,  sortAssignmentByGrade);

asRoute.route('/assignment/:id')
    .get( verifyToken,  getAssignment)
    .post( verifyToken, verifyTeacher,  updateAssignment); // verifyUserId --> auth of perticular user 

asRoute.route('/assignment/delete/:id')
    .get( verifyToken,  verifyTeacher,  deleteAssignment);

asRoute.route('/assignment/assign')
    .post( verifyToken,  verifyTeacher,  assignAssignment);


asRoute.route('/submission')
    .get( verifyToken,  getSubmissions)
    .post( verifyToken, verifyStudent, createSubmission);

asRoute.route('/submission/:id')
    .get( verifyToken,  getSubmission)
    .post( verifyToken, verifyStudent,  updateSubmission);

asRoute.route('/submission/delete/:id')
    .get( verifyToken, verifyStudent, deleteSubmission);

export default asRoute;


