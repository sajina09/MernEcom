const express = require("express");
const router = express.Router();

const booksController = require("../controllers/book-controller")

router.get("/",booksController.getAllBooks);
router.post("/",booksController.addBooks)

module.exports = router ;
