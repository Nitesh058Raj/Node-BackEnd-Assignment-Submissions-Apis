import express from 'express';

import {getAssignments, getAssignment, createAssignment, updateAssignment, deleteAssignment } from '../controller/assignments.controller.js';

const asRoute = express.Router();

asRoute.route('/')
    .get(getAssignments)
    .post(createAssignment);

asRoute.route('/:id')
    .get(getAssignment)
    .post(updateAssignment);

asRoute.route('/delete/:id')
    .get(deleteAssignment)

export default asRoute;


