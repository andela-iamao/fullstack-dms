Fullstack-dms API
=================
[![Build Status](https://travis-ci.org/andela-aawa/fullstack-dms.svg?branch=staging)](https://travis-ci.org/andela-aawa/fullstack-dms)
[![Code Climate](https://codeclimate.com/repos/58d66e5fd315de027d00160e/badges/476cf2c94d6f0ed1a4ab/gpa.svg)](https://codeclimate.com/repos/58d66e5fd315de027d00160e/feed)
[![Coverage Status](https://coveralls.io/repos/github/andela-aawa/fullstack-dms/badge.svg?branch=staging)](https://coveralls.io/github/andela-aawa/fullstack-dms?branch=staging)
[![Issue Count](https://codeclimate.com/repos/58d66e5fd315de027d00160e/badges/476cf2c94d6f0ed1a4ab/issue_count.svg)](https://codeclimate.com/repos/58d66e5fd315de027d00160e/feed)

DMS is an application that helps users manage their documents in an organized way. A User can be able to upload a document, edit it and share it with other users. Aside from enabling users to properly document their work with regard to category, the application permits users to work collaboratively on documents.

Document Management System provides a restful API and friend users interface for users to create and manage documents giving different privileges based on user roles and managing authentication using JWT. The API has routes, each dedicated to a single task that uses HTTP response codes to indicate API status and errors.


Development
-----------
This application has been created using Nodejs environment and implementing [**Express**](http://expressjs.com/) as the routing framework and [**Sequelize**](), an object modeling package, to interact with Relation Database. Authentication has been implemented. For this version, only local strategy has been used. [**JWT tokens**](https://jwt.io/) have also been used to authenticate routes.

Features
-----------
- Sign up/Login
- create document
- Delete a document
- View other peoples public documents
- Search for documents (real time)
- With admin access you manage users and change user roles

## API Documentation Link
[API Documentation](https://andela-aawa.github.io/fullstack-dms/.)