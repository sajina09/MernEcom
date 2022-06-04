const express = require("express");
const router = express.Router();

const book = require("../model/Book");

router.get("/", async (req, res, next) => {
  let books;
  try {
      /*  filters db according to argument 
       since no argument returns all book */
      books = await book.find();
  } catch (err) {
      console.log("Error in getting book : ", err);
  }

  if(!books){
      return res.status(400).json({message : "No books found"})
  }
 return res.status(200).json({
     books
 })
});

module.exports = router ;
