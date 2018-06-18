var should = require("should");
var request = require("supertest");
var app = require("../../index.js");
var mongoose = require("mongoose");
var Book = require("../../models/bookModel");
var agent = request.agent(app);

describe('book test', function () {
	it('should allow a book to be posted and return a read and _id', function (done) {
		this.timeout(10000);
		var bookPost = {title: 'asdsad123', author: '1234', genre: 'asdasd'};
		
		agent.post('/api/books')
			.send(bookPost)
			.expect(200)
			.end(function (err, results) {
				results.status.should.equal(200);
				results.body.read.should.equal(false);
				results.body.should.have.property('_id');
				done();
			})
	});
	
	it('should be able to get the book added based on _id', function (done) {
		this.timeout(10000);
		var bookPost = {title: 'asdsad123', author: '1234', genre: 'asdasd'};
		
		var book = new Book(bookPost);
		book.save(function (err, book) {
			agent.get('/api/books/' + book._id)
				.expect(200)
				.end(function (err, results) {
					results.body.should.have.property('title');
					results.body.should.have.property('author');
					results.body.should.have.property('genre');
					results.body.should.have.property('_id');
					done();
				});
		});
	});
	
	it('should be able to get all the books added', function (done) {
		this.timeout(10000);
		var bookPost1 = {title: 'asdsad123', author: '1234', genre: 'asdasd'};
		var bookPost2 = {title: 'asdnan', author: '2344', genre: 'asdasd'};
		
		var book1 = new Book(bookPost1);
		var book2 = new Book(bookPost2);
		book1.save(function (err1, book1) {
			book2.save(function (err2, book2) {
				agent.get('/api/books/')
					.expect(200)
					.end(function (err, results) {
						results.status.should.equal(200);
						results.body.should.be.instanceof(Array).and.have.lengthOf(2);
						done();
					});
			});
		});
	});
	
	it('should be able to delete the book', function (done) {
		this.timeout(10000);
		var bookPost = {title: 'asdsad123', author: '1234', genre: 'asdasd'};
		
		var book = new Book(bookPost);
		book.save(function (err1, book1) {
			agent.delete('/api/books/' + book._id)
				.expect(204)
				.end(function (err, results) {
					results.status.should.equal(204);
					done();
				});
		});
	});
	
	it('should be able to update the book', function (done) {
		this.timeout(10000);
		var bookPost = {title: 'asdsad123', author: '1234', genre: 'asdasd'};
		
		var book = new Book(bookPost);
		book.save(function (err1, book1) {
			agent.put('/api/books/' + book._id)
				.send({author: "naren"})
				.expect(200)
				.end(function (err, results) {
					results.status.should.equal(200);
					results.body.author.should.equal('naren');
					done();
				});
		});
	});
	
	it('should not be able to find the book', function (done) {
		this.timeout(10000);
	
		agent.get('/api/books/5b265eaae19e501e8080b73f')
			.expect(404)
			.end(function (err, results) {
				results.status.should.equal(404);
				done();
			});
	});
	
	afterEach(function (done) {
		Book.remove().exec();
		done();
	});
});