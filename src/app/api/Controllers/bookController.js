var bookController = function (Book) {
	var post = function (req, res) {
		var book = new Book(req.body);
		
		if (!req.body.title) {
			res.status(400);
			res.send("Title is required");
		}
		
		book.save(function (err) {
			if (err) {
				res.status(500);
				res.send(err);
			}
			else {
				res.status(200);
				res.send(book);
			}
		});
	};
	
	var get = function(req, res) {
		const query = req.query;
		Book.find(query, function (err, books) {
			if (err) {
				res.status(500);
				res.send(err);
			}
			else {
				res.status(200);
				res.json(books);
			}
		});
	};
	
	var put = function(req, res) {
		if (req.body._id) {
			delete req.body._id;
		}
		for (var p in req.body) {
			req.book[p] = req.body[p];
		}
		req.book.save(function (err, book) {
			if (err) {
				res.status(500).send(err);
			}
			else {
				res.status(200);
				res.json(book);
			}
		});
	};
	
	var remove = function (req, res) {
		req.book.remove(function (err) {
			if (err) {
				res.status(500).send(err);
			}
			else {
				res.status(204);
				res.send("removed");
			}
		});
	};
	
	return {
		post: post,
		get: get,
		put: put,
		remove: remove
	};
}

module.exports = bookController;