const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");


const {getAllBooks, createBook, updateBook, deleteBook, getOneBooks} = require("./controller/bookController");

mongoose.connect(process.env.DATABASE_URL).then(() => {
    console.log("Database Connected successfully");
}).catch((err) =>{
    console.error(err);
})

const app = express();

app.use(cors());
app.use(express.json());

app.get("/books",getAllBooks);
app.get("/book/:id",getOneBooks);
app.post("/book",fileUpload(),createBook);
app.patch("/book/:id",fileUpload(),updateBook);
app.delete("/book/:id",deleteBook);

app.listen(process.env.PORT, () =>{
    console.log("Server Running on port 5000");
})