const should = require('should');
const request = require('supertest');
const app = require('../../index.js');
const mongoose = require('mongoose');
const Book = require('../../models/bookModel');

const agent = request.agent(app);

describe('book test', () => {
  it('should allow a book to be posted and return a read and _id', function (done) {
    this.timeout(10000);
    const bookPost = { title: 'asdsad123', author: '1234', genre: 'asdasd' };

    agent.post('/api/books')
      .send(bookPost)
      .expect(200)
      .end((err, results) => {
        results.status.should.equal(200);
        results.body.read.should.equal(false);
        results.body.should.have.property('_id');
        done();
      });
  });

  it('should be able to get the book added based on _id', function (done) {
    this.timeout(10000);
    const bookPost = { title: 'asdsad123', author: '1234', genre: 'asdasd' };

    const book = new Book(bookPost);
    book.save((err, book) => {
      agent.get(`/api/books/${book._id}`)
        .expect(200)
        .end((err, results) => {
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
    const bookPost1 = { title: 'asdsad123', author: '1234', genre: 'asdasd' };
    const bookPost2 = { title: 'asdnan', author: '2344', genre: 'asdasd' };

    const book1 = new Book(bookPost1);
    const book2 = new Book(bookPost2);
    book1.save((err1, book1) => {
      book2.save((err2, book2) => {
        agent.get('/api/books/')
          .expect(200)
          .end((err, results) => {
            results.status.should.equal(200);
            results.body.should.be.instanceof(Array).and.have.lengthOf(2);
            done();
          });
      });
    });
  });

  it('should be able to delete the book', function (done) {
    this.timeout(10000);
    const bookPost = { title: 'asdsad123', author: '1234', genre: 'asdasd' };

    const book = new Book(bookPost);
    book.save((err1, book1) => {
      agent.delete(`/api/books/${book._id}`)
        .expect(204)
        .end((err, results) => {
          results.status.should.equal(204);
          done();
        });
    });
  });

  it('should be able to update the book', function (done) {
    this.timeout(10000);
    const bookPost = { title: 'asdsad123', author: '1234', genre: 'asdasd' };

    const book = new Book(bookPost);
    book.save((err1, book1) => {
      agent.put(`/api/books/${book._id}`)
        .send({ author: 'naren' })
        .expect(200)
        .end((err, results) => {
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
      .end((err, results) => {
        results.status.should.equal(404);
        done();
      });
  });

  afterEach((done) => {
    Book.remove().exec();
    done();
  });
});
