# Introduction

### Created APIs for Assignment management with Authentication 
<b>Authentication:</b> `JsonWebToken (JWT)` </br>
<b>Runtime:</b> `NodeJS` </br>
<b>Framework:</b> `ExpressJS` </br>
<b>Database</b> : `Mysql` </br>
<b>Images used </b>: </br>
    &emsp; `mysql:8.0` </br>
    &emsp; `node:alpine3.11` </br>
<hr> 

### Features : 
  > - Authentication with JWT (jsonwebtoken)</br>
  > - CRUD operation for assignment & submission</br>
  > - 3 Tables
  >  * Assignments
  >  * Users
  >  * Submissions
  
<hr>

### Routes :

> #### Authentication 
- `/api/auth`
    -  POST 
    -  Returns Token in response

> #### Assignment
  - `/api/assignment`        
      -  GET  &emsp; Return all data   
      -  POST&emsp; Create a record   
  - `/api/assignment/:id` 
    -  GET &emsp; Return a single data 
    -  POST &emsp; Update a data 
  - `/api/assignment/delete/:id` 
     -  GET   
     -  Delete a record
     
> #### Sort     
  - `api/assignment/due`
     - GET
     - Return data sorted with due dates
  - `api/assignment/grade`
     - GET
     - Return data sorted with grade
     
> #### Submission     
  - `/api/submission`        
     -  GET  &emsp; Return all data   
     -  POST &emsp; Create a record     
  - `/api/submission/:id` 
     -  GET &emsp; Return a single data 
     -  POST &emsp; Update a data
  - `/api/submission/delete/:id` 
     -  GET   
     -  Delete a record
     
<hr>
