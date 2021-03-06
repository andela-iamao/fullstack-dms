# fullstack-dms
[![Build Status](https://travis-ci.org/andela-aawa/fullstack-dms.svg?branch=staging)](https://travis-ci.org/andela-aawa/fullstack-dms)
[![Code Climate](https://codeclimate.com/repos/58d66e5fd315de027d00160e/badges/476cf2c94d6f0ed1a4ab/gpa.svg)](https://codeclimate.com/repos/58d66e5fd315de027d00160e/feed)
[![Test Coverage](https://codeclimate.com/repos/58d66e5fd315de027d00160e/badges/476cf2c94d6f0ed1a4ab/coverage.svg)](https://codeclimate.com/repos/58d66e5fd315de027d00160e/coverage)
[![Issue Count](https://codeclimate.com/repos/58d66e5fd315de027d00160e/badges/476cf2c94d6f0ed1a4ab/issue_count.svg)](https://codeclimate.com/repos/58d66e5fd315de027d00160e/feed)

Document Management System API contains several API end points that allows users to create, edit, retrieve and delete documents. It also offers a way to ensure that only authorized users can perform certain operations.

Development
-----------
The application was developed with [NodeJs](http://nodejs.org) and [Express](http://expressjs.com) is used for routing. The [Postgres](http://postgresql.com) database was used with [sequelize](http://sequelizejs.com) as the ORM

Installation
------------
1.  Ensure you have NodeJs and postgres installed
2.  Clone the repository `git clone https://github.com/andela-aawa/fullstack-dms.git`
3.  Change your directory `cd fullstack-dms`
4.  Install all dependencies `npm install`
5.  Run tests  `npm test`
6.  Run integration test `npm run e2e`
7.  Start the app `npm start` and use [postman](https://www.getpostman.com/) to consume the API


## API ENDPOINTS
**Users**

Request type | Endpoint | Action 
------------ | -------- | ------
POST | [/users](#create-users) | Create a new user
GET | [/users](#get-users) | Get all users
GET | [/users/:id](#get-a-user) | Get details of a specific user
PUT | [/users/:id](#update-user) | Edit user details
DELETE | [/users/:id](#delete-user) | Remove a user from storage
POST | [/users/login](#login) | To log a user in
GET| [/users/:id/documents](#get-usersdoc) | To get document of a specific user
GET| [/users/search/:email](#get-userbyemail) | To get a user by email
GET | [/search/users](#search-user) | Search for a user

**Roles**

Request type | Endpoint | Action 
------------ | -------- | ------
POST | [/roles](#create-role) | Create a new role
GET | [/roles](#get-roles) | Get all created roles
PUT | [/role/:id](#update-role) | To edit a role
PATCH | [/role/:id](#update-role) | To edit a role
GET | [/role/:id](#get-a-role) | To get a role

**Documents**

Request type | Endpoint | Action 
------------ | -------- | ------ 
POST | [/documents](#create-document) | Create a new document
GET | [/documents](#get-documents) | Retrieve all documents 
GET | [/documents/:id](#get-a-document) | Retrieve a specific document
PUT | [/documents/:id](#update-document) | Update a specific document
DELETE | [/documents/:id](#delete-document) | Remove a specific document from storage
GET | [/documents?offset=1&limit=10](#get-documents) | Retrieve maximum of first 10 documents
GET | [/search/documents/](#search-document) | Search for a document

**Search**

Request type | Endpoint | Action 
------------ | -------- | ------

Users
-----

## Create Users
To create a new user, make a **POST** request to `/users`
#### Request
```
{
    "username": "john.doe",
    "firstName": "Doe",
    "lastName": "John",
    "email": "john.doe@gmail.com",
    "password":"password"
}
```

#### Response
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjE1LCJFbWFpbCI6ImFkYUBnbWFpbC5jb20iLCJSb2xlSWQiOjEsImlhdCI6MTQ5MTIyMTk4NiwiZXhwIjoxNDkxMjU3OTg2fQ.MtqGTyA5q7zrs7pgbKwtsVUqiTyWYcH6KINgnQK8KJA",
  "expiresIn": "10h",
  "user": {
    "id": 15,
    "username": "john.doe",
    "firstname": "Doe",
    "lastname": "John",
    "email": "john.doe@gmail.com",
    "password": "$2a$10$.jAF5xr2IGeZDyUOsivN2etYd8HaUPwvVc3bjPlI0quQEZy5yexN2",
    "RoleId": 2,
    "updatedAt": "2017-04-03T12:19:45.740Z",
    "createdAt": "2017-04-03T12:19:45.740Z"
  }
}
```

## Get Users
Fetches all users' details,
#### Request
  - Endpoint: **GET**: `/users`
  - Requires `Authorization` header to be set
#### Response
```
  "result": [
  {
    "id": 3,
    "username": "desmoline",
    "firstName": "Awa",
    "lastName": "Assahna",
    "email": "assahna.awa@aun.edu.ng",
    "RoleId": 1,
    "createdAt": "2017-04-21T05:30:39.815Z",
    "updatedAt": "2017-04-21T05:43:44.880Z",
    "Role": {
      "id": 1,
      "title": "admin",
      "createdAt": "2017-04-21T05:28:57.307Z",
      "updatedAt": "2017-04-21T05:28:57.307Z"
    }
  },
  {
    "id": 1,
    "username": "Augustine66",
    "firstName": "Llewellyn",
    "lastName": "Hackett",
    "email": "Candida40@gmail.com",
    "RoleId": 1,
    "createdAt": "2017-04-21T05:28:57.732Z",
    "updatedAt": "2017-04-21T05:28:57.732Z",
    "Role": {
      "id": 1,
      "title": "admin",
      "createdAt": "2017-04-21T05:28:57.307Z",
      "updatedAt": "2017-04-21T05:28:57.307Z"
    }
  },
  {
    "id": 4,
    "username": "awa",
    "firstName": "Assahna",
    "lastName": "Awa",
    "email": "awa@awa.com",
    "RoleId": 2,
    "createdAt": "2017-04-21T06:45:03.572Z",
    "updatedAt": "2017-04-21T06:45:03.572Z",
    "Role": {
      "id": 2,
      "title": "regular",
      "createdAt": "2017-04-21T05:28:57.307Z",
      "updatedAt": "2017-04-21T05:28:57.307Z"
    }
  },
  {
    "id": 2,
    "username": "Fermin_Torphy",
    "firstName": "Will",
    "lastName": "Wehner",
    "email": "Lambert.Batz@gmail.com",
    "RoleId": 2,
    "createdAt": "2017-04-21T05:28:57.752Z",
    "updatedAt": "2017-04-21T05:28:57.752Z",
    "Role": {
      "id": 2,
      "title": "regular",
      "createdAt": "2017-04-21T05:28:57.307Z",
      "updatedAt": "2017-04-21T05:28:57.307Z"
    }
  }
]
```


## Get A User
#### Request
  - Endpoint: **GET**: `/users/:id`
  - Requires `Authorization` header to be set
#### Response
```
{
    "id": 3,
    "username": "desmoline",
    "firstName": "Awa",
    "lastName": "Assahna",
    "email": "assahna.awa@aun.edu.ng",
    "RoleId": 1,
    "createdAt": "2017-04-21T05:30:39.815Z",
    "updatedAt": "2017-04-21T05:43:44.880Z"
}
```
## Update user
#### Request
  - Enpoint: **PUT**: `/users/:id`
  - Requires `Authorization` header to be set
```
{
  "RoleId": 2
}
```
#### Response
```
{
  "id": 4,
  "username": "awa",
  "firstName": "Assahna",
  "lastName": "Awa",
  "email": "awa@awa.com",
  "RoleId": 2,
  "createdAt": "2017-04-21T06:45:03.572Z",
  "updatedAt": "2017-04-21T06:45:03.572Z"
}
```

## Delete user
#### Request
  - Enpoint: **DELETE**: `/users/:id`
  - Requires `Authorization` header to be set
#### Response

```
{
  "message": "User deleted successfully."
}
```

## User login
### Request 
 - Endpoint: **POST**: `/users/login`
```
{
    "username": "desmoline",
    "password":"password"
}
``` 

### Response 
``` 
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjMsIlJvbGVJZCI6MSwiaWF0IjoxNDkyNzczMzc4LCJleHAiOjE0OTI4NTk3Nzh9.6C9u-1ylQOUpTQDVPm0TmIuVmDaP2PdMMgMxLkP1sjI",
  "expiresIn": 86400
}
```

# Get user's Document 
### Request
  - Enpoint: **GET**: `/users/documents`
  - Requires `Authorization` header to be set
  
### Response 
```
    [
      {
        "id": 1,
        "title": "consectetur",
        "content": "enim ex velit",
        "access": "public",
        "OwnerId": 3,
        "RoleId": 2,
        "createdAt": "2017-04-21T05:31:16.778Z",
        "updatedAt": "2017-04-21T05:31:16.778Z"
      },
      {
        "id": 2,
        "title": "Re act Test Full Rendering API",
        "content": "Re\nact Test Full Rendering API",
        "access": "public",
        "OwnerId": 3,
        "RoleId": 2,
        "createdAt": "2017-04-21T05:33:01.265Z",
        "updatedAt": "2017-04-21T05:33:01.265Z"
      },
      {
        "id": 3,
        "title": "et",
        "content": "aut debitis omnis",
        "access": "public",
        "OwnerId": 3,
        "RoleId": 2,
        "createdAt": "2017-04-21T05:34:15.168Z",
        "updatedAt": "2017-04-21T05:34:15.168Z"
      },
      {
        "id": 4,
        "title": "similique",
        "content": "Aut dolorum quos",
        "access": "public",
        "OwnerId": 3,
        "RoleId": 2,
        "createdAt": "2017-04-21T05:36:09.373Z",
        "updatedAt": "2017-04-21T05:49:32.626Z"
      }
    ]
```

ROLES
-----
## Create Role
#### Request
  - Endpoint **POST** `/roles`
  - Requires `Authorization` header to be set
Body (application/json)
```
{
  "title": "author"
}
```
#### Response
Body (application/json)
```
{
  "id": 3,
  "title": "author",
  "updatedAt": "2017-04-21T11:24:44.344Z",
  "createdAt": "2017-04-21T11:24:44.344Z"
}
```

## Get Roles
#### Request
  - Endpoint **GET** `/roles`
  - Requires `Authorization` header to be set

#### Response
Body (application/json)
```
[
  {
    "id": 1,
    "title": "admin",
    "createdAt": "2017-04-21T05:28:57.307Z",
    "updatedAt": "2017-04-21T05:28:57.307Z"
  },
  {
    "id": 2,
    "title": "regular",
    "createdAt": "2017-04-21T05:28:57.307Z",
    "updatedAt": "2017-04-21T05:28:57.307Z"
  },
  {
    "id": 3,
    "title": "author",
    "createdAt": "2017-04-21T11:24:44.344Z",
    "updatedAt": "2017-04-21T11:24:44.344Z"
  }
]
```

## Update Role
#### Request
  - Endpoint **POST** `/roles/:id`
  - Requires `Authorization` header to be set
Body (application/json)
```
{
  "title": "Account Manager"
}
```
#### Response
Body (application/json)
```
{
  "id": 3,
  "title": "Account Manager",
  "createdAt": "2017-04-21T11:24:44.344Z",
  "updatedAt": "2017-04-21T11:24:52.344Z"
}
```

DOCUMENTS
---------
## Create Document
#### Request
  - Endpoint **POST** `/documents`
  - Requires `Authorization` header to be set
```
{
  "title": "Marvel",
  "content": "Diary of a movie addict",
  "access": "public"
}
```
#### Response
  - Body `(application/json)`
```
{
  "id": 5,
  "title": "Marvel",
  "content": "Diary of a movie addict",
  "access": "public",
  "OwnerId": 3,
  "RoleId": 1,
  "updatedAt": "2017-04-21T11:29:49.031Z",
  "createdAt": "2017-04-21T11:29:49.031Z"
}
```
## Get Documents
#### Request
  - Endpoint **GET** `/documents`
  - Optional queries **page** (for the page number) && **limit** (number of documents per page)
  - Requires `Authorization` header to be set

#### Response
```
[
  {
    "id": 5,
    "title": "Marvel",
    "content": "Diary of a movie addict",
    "access": "public",
    "OwnerId": 3,
    "RoleId": 1,
    "createdAt": "2017-04-21T11:29:49.031Z",
    "updatedAt": "2017-04-21T11:29:49.031Z"
  },
  {
    "id": 4,
    "title": "similique",
    "content": "Aut dolorum quos",
    "access": "public",
    "OwnerId": 3,
    "RoleId": 2,
    "createdAt": "2017-04-21T05:36:09.373Z",
    "updatedAt": "2017-04-21T05:49:32.626Z"
  },
  {
    "id": 3,
    "title": "et",
    "content": "aut debitis omnis",
    "access": "public",
    "OwnerId": 3,
    "RoleId": 2,
    "createdAt": "2017-04-21T05:34:15.168Z",
    "updatedAt": "2017-04-21T05:34:15.168Z"
  },
  {
    "id": 2,
    "title": "Re act Test Full Rendering API",
    "content": "Re\nact Test Full Rendering API",
    "access": "public",
    "OwnerId": 3,
    "RoleId": 2,
    "createdAt": "2017-04-21T05:33:01.265Z",
    "updatedAt": "2017-04-21T05:33:01.265Z"
  },
  {
    "id": 1,
    "title": "consectetur",
    "content": "enim ex velit",
    "access": "public",
    "OwnerId": 3,
    "RoleId": 2,
    "createdAt": "2017-04-21T05:31:16.778Z",
    "updatedAt": "2017-04-21T05:31:16.778Z"
  }
]
```

## Get A Document
#### Request
  - Endpoint **GET** `/documents/:id` where id is the id of the document
  - Requires `Authorization` header to be set

##### Response
```
{
    "id": 1,
    "title": "consectetur",
    "content": "enim ex velit",
    "access": "public",
    "OwnerId": 3,
    "RoleId": 2,
    "createdAt": "2017-04-21T05:31:16.778Z",
    "updatedAt": "2017-04-21T05:31:16.778Z"
}
```

## Update Document
#### Request
  - Endpoint **PUT** `/documents/:id` id is the id of the document
  - Requires `Authorization` header to be set
```
{
  "title": "The accountant",
}
```
##### Response
```
{
  "id": 1,
  "title": "The accountant",
  "content": "enim ex velit",
  "access": "public",
  "OwnerId": 3,
  "RoleId": 2,
  "createdAt": "2017-04-21T05:31:16.778Z",
  "updatedAt": "2017-04-21T11:33:18.850Z"
}
```

## Delete Document
#### Request
  - Endpoint **DELETE** `/documents/:id`id of the document
  - Requires `Authorization` header to be set
#### Response
```
{
  message: 'Document deleted successfully.'
}
```

Search
-----

## Search Users
#### Request
  - Endpoint **GET** `/search/users?q=simi`
  - Requires `Authorization` header to be set
#### Response
```
[
  {
    "id": 3,
    "username": "desmoline",
    "firstName": "Awa",
    "lastName": "Assahna",
    "email": "assahna.awa@aun.edu.ng",
    "RoleId": 1,
    "createdAt": "2017-04-21T05:30:39.815Z",
    "updatedAt": "2017-04-21T05:43:44.880Z"
  },
  {
    "id": 4,
    "username": "awa",
    "firstName": "Assahna",
    "lastName": "Awa",
    "email": "awa@awa.com",
    "RoleId": 2,
    "createdAt": "2017-04-21T06:45:03.572Z",
    "updatedAt": "2017-04-21T06:45:03.572Z"
  }
]
```

## Search Documents
#### Request
  - Endpoint **GET** `/search/documents?q=accountant`
  - Requires `Authorization` header to be set
#### Response
```
[
  {
    "id": 1,
    "title": "The accountant",
    "content": "enim ex velit",
    "access": "public",
    "OwnerId": 3,
    "RoleId": 2,
    "createdAt": "2017-04-21T05:31:16.778Z",
    "updatedAt": "2017-04-21T11:33:18.850Z"
  }
]
```