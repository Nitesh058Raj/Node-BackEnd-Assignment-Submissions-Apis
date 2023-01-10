# Node-BackEnd-Assignment-Submissions-Apis

features : 
  - Authentication with jsonwebtoken
  - CRUD for assignment(data)
  - 2 databases - assignment & users(for login) in mysql (using mysql docker image mysql:8.0)
  - docker-compose & Dockerfile to generate a docker image
  
routes :
  - /assignment -> for return all data               |  GET
  - /assignment/:id -> for return a single data      |  GET
  - /assignment/:id -> for update a data             |  POST
  - /assignment/delete/:id -> for delete a record    |  GET
  - /assignment/login --> to create a Token          |  POST
