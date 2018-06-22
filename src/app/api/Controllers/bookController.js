const bookController = function (Book) {
	
	/**
	* @swagger
	* /api/books:
	*   post:
	*     description: Adds a book to the library
	*     tags:
	*       - Books
	*     produces:
	*       - application/json
	*     parameters:
	*        - in: body
	*          name: body
	*          schema:
	*            type: object
	*            properties:
	*              title:
	*                type: string
	*              author:
	*                type: string
	*              genre:
	*                type: string
	*              read:
	*                type: boolean
	*     responses:
	*        "201":
	*           description: Added the book successfully.
	*        "400":
	*           description: Bad request. Invalid input. Missing/Incorrect input.
	*        "500":
	*           description: Unable to process the request.
	*/
  const post = function (req, res) {
    const book = new Book(req.body);

    if (!req.body.title) {
      res.status(400);
      res.send('Title is required');
    }

    book.save((err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201);
        res.send(book);
      }
    });
  };

	/**
	* @swagger
	* /api/books/{bookId}:
	*   get:
	*     description: Gets a book from the library by ID
	*     tags:
	*       - Books
	*     produces:
	*       - application/json
	*     parameters:
	*        - in: path
	*          name: bookId
	*          description: id of the book
	*     responses:
	*        "200":
	*           description: Returns the book if available. Returns message if unavailable.
	*        "500":
	*           description: Unable to process the request.
	*/
	
	/**
	* @swagger
	* /api/books:
	*   get:
	*     description: Gets all the books from the library
	*     tags:
	*       - Books
	*     produces:
	*       - application/json
	*     responses:
	*        "200":
	*           description: Returns the book if available. Returns message if unavailable.
	*        "500":
	*           description: Unable to process the request.
	*/
	
  const get = function (req, res) {
    const query = req.query;
    Book.find(query, (err, books) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200);
        res.json(books);
      }
    });
  };

	/**
	 * @swagger
	 * /api/books/{bookId}:
	 *   put:
	 *     description: Updating a book based on given book ID.
	 *     tags:
	 *       - Books
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - in: path
	 *         name: bookId
	 *         description: The id of the book.
	 *       - in: body
	 *         name: body
	 *         schema:
	 *            type: object
	 *            properties:
	 *              title:
	 *                type: string
	 *              author:
	 *                type: string
	 *              genre:
	 *                type: string
	 *              read:
	 *                type: boolean
	 *     responses:
	 *        "200":
	 *           description: Updated successfully.
	 *        "500":
	 *           description: Unable to process the request.
	 */
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

	/**
	 * @swagger
	 * /api/books/{bookId}:
	 *   delete:
	 *     description: Removes a book from the library
	 *     tags:
	 *       - Books
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - in: path
	 *         name: bookId
	 *         description: The id of the book.
	 *     responses:
	 *        "200":
	 *           description: Deleted the book successfully. Book is not available.
	 *        "500":
	 *           description: Unable to process the request.
	 */
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
