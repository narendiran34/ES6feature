const bookController = function (Book) {
  const post = function (req, res) {
    const book = new Book(req.body);

    if (!req.body.title) {
      res.status(400);
      res.send('Title is required');
    }

    book.save((err) => {
      if (err) {
        res.status(500);
        res.send(err);
      } else {
        res.status(200);
        res.send(book);
      }
    });
  };

  const get = function (req, res) {
    const query = req.query;
    Book.find(query, (err, books) => {
      if (err) {
        res.status(500);
        res.send(err);
      } else {
        res.status(200);
        res.json(books);
      }
    });
  };

  const put = function (req, res) {
    if (req.body._id) {
      delete req.body._id;
    }
    for (const p in req.body) {
      req.book[p] = req.body[p];
    }
    req.book.save((err, book) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200);
        res.json(book);
      }
    });
  };

  const remove = function (req, res) {
    req.book.remove((err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(204);
        res.send('removed');
      }
    });
  };

  return {
    post,
    get,
    put,
    remove,
  };
};

module.exports = bookController;
