# cosi-300a-project-backend

## Overview
This is an express application that defines several RESTful and authentication routes. The application is deployed on AWS EC2, the address is:
http: //ec2-3-20-239-197.us-east-2.compute.amazonaws.com

## How to run the application
You can clone this github repository to your local environment, and run:

### `npm install`

to install all dependencies.

After installing all dependencies, run:
### `npm run dev`
It runs the app in the development mode.<br />
After seeing DB connection successfult, you can access the APIs below on http://localhost:4000


## Schema
### User

The user schema defines the attributes of an user object, also provides function to save a user into the User database. We use bcrypt to encrypt password before saving the user.

**username: string**

**password: string**

### Submission

The submission schema contains the path, the username and the code of the submission:

**path: string**

**user: string**

**code: string**


## APIs

### POST /authenticate
This route will perform authentication with the input username and password.

### POST /register
This route will register a user with given username and password.

### POST /
This route will create a new submission record in the database.

### GET /find
This route will find a submission by username and path

### GET /findByUserName
This route will find all submissions of a user by username
