const Book = require("../model/Book");

/* 
Function to get all book
*/

const getAllBooks = async (req, res, next) => {
  let books;
  try {
    /*  filters db according to argument 
         since no argument returns all book */
    books = await Book.find();
  } catch (err) {
    console.log("Error in getting book : ", err);
  }

  if (!books) {
    return res.status(400).json({ message: "No books found" });
  }
  return res.status(200).json({
    books,
  });
};

/* Add book to db */

const addBooks = async (req, res, next) => {
  const { bookName, author, description, price, available } = req.body;
  let book;
  try {
    book = new Book({
      bookName,
      author,
      description,
      price,
      available,
    });
    await book.save();
  } catch (err) {
    console.log("Error while adding book : ", err);
  }
  if (!book) {
    return res.status(500).json({ message: "Unable to add books" });
  }
  return res.status(501).json({ book });
};

/* Get book by id */

const getBookById = async (req, res, next) => {
  const id = req.params.id;
  let book;
  try {
    book = await Book.findById(id);
  } catch (err) {
    console.log("Err in get book by ID : ", err);
  }
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  return res.status(200).json({ book });
};

/* Update a book by its ID */

const updateBook = async (req, res, next) => {
  const id = req.params.id;
  const { bookName, author, description, price, available } = req.body;
  let book;

  try {
    book = await Book.findByIdAndUpdate(id, {
      bookName,
      author,
      description,
      price,
      available,
    });
    book = await Book.save();
  } catch (err) {
    console.log("Err while updating a book : ", err);
  }
  if (!book) {
    return res.status(404).json({ message: "Book update failed" });
  }
  return res.status(201).json({ book });
};

const deleteBook = async (req, res, next) => {
  const id = req.params.id;
  let book;
  try {
    book = await Book.findByIdAndDelete(id);
  } catch (err) {
    console.log("err while deleting a book : ", err);
  }
  if(!book){
      return res.status(404).json({message:"Unable to delete book by ID"})
  }
  return res.status(200).json({message:"Book successfully deleted"})
};

exports.getAllBooks = getAllBooks;
exports.getBookById = getBookById;
exports.addBooks = addBooks;
exports.updateBook = updateBook;
exports.deleteBook = deleteBook;
