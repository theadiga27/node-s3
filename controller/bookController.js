const Book = require("../model/bookModel");
const { v4} = require("uuid");
const { putObject } = require("../util/putObject");
const { deleteObject } = require("../util/deleteObject");
const { getObject } = require("../util/getObject");

exports.getAllBooks = async (req,res) =>{
    try {
        const book = await Book.find().sort({ _id: -1 });
        
        if(!book){
            return res.status(400).json({
                "status": "error",
                "data": book,
            });
        }

        return res.status(200).json({
            "status":"success",
            "data": book,
        });
    } catch (err) {
        console.error(err);
    }
}

exports.getOneBooks = async (req,res) =>{
    try {
        const {id}= req.params;
        const book = await Book.findById(id);
        
        if(!book){
            return res.status(400).json({
                "status": "error",
                "data": book,
            });
        }

        //Get Object from S3 Bucket
        await getObject(book.key);
        //
        return res.status(200).json({
            "status":"success",
            "data": book,
        });
    } catch (err) {
        console.error(err);
    }
}

exports.createBook = async(req,res) => {
    try {
        const {name,author} = req.body;
        const {file} = req.files;
        const fileName = "images/"+v4();

        if(!name || !author || !file){
            return res.status(400).json({
                "status": "error",
                "data": "name,author and file required"
            })
        }
        //Upload image to S3
        const {url,key} = await putObject(file.data,fileName);
        //



        if(!url || !key){
            return res.status(400).json({
                "status": "error",
                "data": "Image is not uploaded",
            });
        }

        const book = await Book.create({name,author,imageUrl:url,key});
        
        if(!book){
            return res.status(400).json({
                "status": "error",
                "data": book,
            });
        }

        return res.status(201).json({
            "status":"success",
            "data": book,
        })
    } catch (err) {
        console.error(err);
    }
}

exports.updateBook = async (req,res) => {
    try {
        const {id} = req.params;
        const {name,author} = req.body;
        const {file} = req.files;

        const book = await Book.findById(id);
        if(!book){
            return res.status(400).json({
                "status": "error",
                "data": book,
            })
        }
        
        //Upload file to S3
        const data = await putObject(file.data,book.key);
        //
        
        const updatedBook = await Book.findByIdAndUpdate(id,{name,author,imageUrl:data.url,key:data.key},{
            new:true,
        });
       
        if(!updatedBook){
            return res.status(400).json({
                "status": "error",
                "data": updatedBook,
            })
        }

        return res.status(200).json({
            "status":"success",
            "data":updatedBook,
        });
    } catch (err) {
        console.error(err);
    }
}

exports.deleteBook = async (req,res) =>{
    try {
        const {id} = req.params;
        const book = await Book.findById(id);
        if(!book){
            return res.status(400).json({
                "status": "error",
                "data": book,
            })
        }

        //Delete Object in S3 Bucket
        const data = await deleteObject(book.key);
        //

        if(data.status != 204){
            return res.status(400).json({
                "status": "error",
                "data": data.data,
            })
        }

        const deletedBook = await Book.findByIdAndDelete(id,{
            new:true,
        });

        if(!deletedBook){
            return res.status(400).json({
                "status": "error",
                "data": book,
            })
        }

        return res.status(204).json({
            "status": "success",
            "data": null,
        })
    } catch (err) {
        console.error(err);
    }
}