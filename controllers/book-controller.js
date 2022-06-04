const Book = require("../model/Book")

/* 
Function to get all book
*/

const getAllBooks =  async (req, res, next) => {
    let books;
    try {
        /*  filters db according to argument 
         since no argument returns all book */
        books = await Book.find();
    } catch (err) {
        console.log("Error in getting book : ", err);
    }
  
    if(!books){
        return res.status(400).json({message : "No books found"})
    }
   return res.status(200).json({
       books
   })
  }

 /* Add book to db */ 

 const addBooks = async(req,res,next) => {
     const {bookName,
        author,
        description,
        price,
        available } = req.body;
      let book;
     try{
         book = new Book({
             bookName,
             author,
             description,
             price,
             available,
         });
         await book.save()

     }
     catch(err){
         console.log("Error while adding book : ", err)
     }
     if(!book){
        return res.status(500).json({message:"Unable to add books"})
    }
    return res.status(501).json({book})
 }

exports.getAllBooks = getAllBooks
exports.addBooks = addBooks 