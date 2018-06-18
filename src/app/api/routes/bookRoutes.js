const express = require("express");

const bookRouter = express.Router();
const debug = require("debug")('index:routes');
const mongoose= require ("mongoose");

function libraryRouter () {
	var db;
	if (process.env.ENV == 'Test') {
		db = mongoose.connect("mongodb://localhost/bookAPI_test");
	}
	else {
		db = mongoose.connect("mongodb://localhost/bookAPI");
	}
	
	var Book = require("../../models/bookModel");

	var bookController = require("../Controllers/bookController")(Book);
	bookRouter.route('/books')
		.post(bookController.post)
		.get(bookController.get);
		
	bookRouter.use('/books/:bookId', function (req, res, next) {
		Book.findById(req.params.bookId, function (err, book) {
			if (err) {
				res.status(500);
				res.send(err);
			}
			else if (book) {
				req.book = book;
				next();
			}
			else {
				res.status(404);
				res.send('no book found');
			}
		});
	});
	
	bookRouter.route('/books/:bookId')
		.put(bookController.put)
		.get(function (req, res) {
			res.json(req.book);
		})
		.delete(bookController.remove);
		
	return bookRouter;
}

module.exports = libraryRouter;
