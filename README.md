# Introduction Node-BackEnd-Assignment-Submissions-Apis

### Created Apis for task of Assignment management with Security 
<b>Technologies </b> : NodeJS, Express, JsonWebToken, Mysql <br>
<b>Images used </b>: mysql:8.0, node:alpine3.11

## Features : 
  - Authentication with JWT (jsonwebtoken)
  - CRUD operation for assignment(data)
  - 2 tables - assignment & users (for login) in mysql database
  - docker-compose & Dockerfile to generate a docker image
  
## Routes :
  - /assignment/login 
      -  POST 
      -  Create Token (Give in json form in response)    
  - /assignment -> for return all data                         
      -  GET   
      -  Need Token
  - /assignment/:id -> for return a single data         
     -  GET   
     -  Need Token
  - /assignment/:id -> for update a data                   
     -  POST  
     -  Need Token
  - /assignment/delete/:id -> for delete a record    
    -  GET   
    -  Need Token

# Installation 

- git clone     : 
   - https://github.com/Nitesh058Raj/Node-BackEnd-Assignment-Submissions-Apis.git
- docker images : 
   - docker pull niteshraj/assignment_apis_with_jwt:v1 
   - https://hub.docker.com/repository/docker/niteshraj/assignment_apis_with_jwt (For updated versions)
