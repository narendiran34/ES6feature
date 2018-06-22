Tech Upskilling (Node.js & REST)

Objective:

To build a book library app that supports below functionalities

- Adding a book
- List all books
- Display book for a given book id
- Delete a book
- Update a book for a given book id


Libraries & Frameworks Used:


1.  Express.js
    A web framework for Node.js used to assign handlers for requests, define routes & add middlewares.
	
2.  Mongoose
	NoSQL database. Used as backend to store the book details.

2.  Mocha
    A unit testing framework.

3.  Istanbul
    A tool used to find the code coverage of our application. 

4.  Eslint
    A tool for reporting and fixing styling, errors and enforcing coding standards.

5.  Supertest
    A library for testing http servers.

6. Swagger
    API documentation



API Documentation: 

1. Clone the git repository.
2. Run 'npm install'.
3. Run 'npm run start:dev'.
4. From the browser, go to 'localhost:8009/api-docs'.


Unit Test & Code Coverage: 

C:\Users\pnarendiran\Desktop\Node\ISQ>npm test
<div>
> isq@1.0.0 test C:\Users\pnarendiran\Desktop\Node\ISQ
> nyc gulp test

[10:23:07] Using gulpfile ~\Desktop\Node\ISQ\gulpfile.js
[10:23:07] Starting 'test'...
[10:23:07] Finished 'test' after 14 ms
 7   -_-_-_-__,------,
 0   -_-_-_-__|  /\_/\
 0   -_-_-_-_~|_( ^ .^)
     -_-_-_-_ ""  ""

  7 passing (2s)

-----------------------------|----------|----------|----------|----------|-------------------|
File                         |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
-----------------------------|----------|----------|----------|----------|-------------------|
All files                    |    94.67 |       65 |    95.12 |    94.67 |                   |
 ISQ                         |      100 |      100 |      100 |      100 |                   |
  gulpfile.js                |      100 |      100 |      100 |      100 |                   |
 ISQ/src/app                 |    86.96 |      100 |    33.33 |    86.96 |                   |
  index.js                   |    86.96 |      100 |    33.33 |    86.96 |          34,35,39 |
 ISQ/src/app/api/Controllers |    88.89 |    58.33 |      100 |    88.89 |                   |
  bookController.js          |    88.89 |    58.33 |      100 |    88.89 |     44,92,141,171 |
 ISQ/src/app/api/Tests       |      100 |      100 |      100 |      100 |                   |
  bookControllerTests.js     |      100 |      100 |      100 |      100 |                   |
  bookIntegrationTest.js     |      100 |      100 |      100 |      100 |                   |
 ISQ/src/app/api/routes      |     91.3 |    66.67 |      100 |     91.3 |                   |
  bookRoutes.js              |     91.3 |    66.67 |      100 |     91.3 |             12,25 |
 ISQ/src/app/models          |      100 |      100 |      100 |      100 |                   |
  bookModel.js               |      100 |      100 |      100 |      100 |                   |
-----------------------------|----------|----------|----------|----------|-------------------|

C:\Users\pnarendiran\Desktop\Node\ISQ>
</div>