const should = require('should');
const sinon = require('sinon');

describe('Book Controller Tests:', () => {
  describe('Post', () => {
    it('should not allow empty title on post', () => {
      const Book = function (book) {
        this.save = function () {};
      };

      const req = {
        body: {
          author: 'naren',
        },
      };

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
      };

      const bookController = require('../Controllers/bookController')(Book);

      bookController.post(req, res);
      res.status.calledWith(400).should.equal(true, 'Bad Status ');
      res.send.calledWith('Title is required').should.equal(true);
    });
  });
});
