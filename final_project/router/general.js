const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  const getBooks = new Promise((resolve, reject) => {
    resolve(res.send(JSON.stringify(books,null,4)));
  });
  getBooks.then(() => console.log("Promise for Task 10 resolved"));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const getBook = new Promise((resolve, reject) => {
    const isbn = req.params.isbn;
    if (books[isbn]) {
      resolve(res.send(books[isbn]));
    } else {
      reject(res.status(404).send("Book not found"));
    }
  });
  getBook.then(() => console.log("Promise for Task 11 resolved")).catch(err => console.log(err));
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const getBookByAuthor = new Promise((resolve, reject) => {
    const author = req.params.author;
    const keys = Object.keys(books);
    const booksByAuthor = [];
    keys.forEach(key => {
      if(books[key].author === author) {
        booksByAuthor.push(books[key]);
      }
    });
    if (booksByAuthor.length > 0) {
      resolve(res.send(booksByAuthor));
    } else {
      reject(res.status(404).send("Author not found"));
    }
  });
  getBookByAuthor.then(() => console.log("Promise for Task 12 resolved")).catch(err => console.log(err));
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const getBookByTitle = new Promise((resolve, reject) => {
    const title = req.params.title;
    const keys = Object.keys(books);
    const booksByTitle = [];
    keys.forEach(key => {
      if(books[key].title === title) {
        booksByTitle.push(books[key]);
      }
    });
    if (booksByTitle.length > 0) {
      resolve(res.send(booksByTitle));
    } else {
      reject(res.status(404).send("Title not found"));
    }
  });
  getBookByTitle.then(() => console.log("Promise for Task 13 resolved")).catch(err => console.log(err));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn].reviews);
});

module.exports.general = public_users;
