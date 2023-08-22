const Book = require("../model/Book");


const getAllBooks = async(req, res, next) =>{
    let books;
    try {
        books = await Book.find();
        // res.json(books)
        
    } catch (err) {
        console.log(err) 
        // res.json(err)
    }

    if(!books){
        return res.status(404).json({message : "No products found"})

    }
    return res.status(200).json({books})
}

const getById = async (req,res, next) =>{
    const id = req.params.id
    let book;

    try {
        book = await Book.findById(id);
        
    } catch (error) {
        console.log(error)
    }

    if(!book){
        return res.status(404).json({message : "No Book by id  found"})

    }
    return res.status(200).json({book})
}



const addBook = async(req, res, next) => {
    const { name, author, description, price , available, image, quantity } = req.body;
    let book;

    try {
        book = new Book(
            {
                name,
                author,
                description, price , available, image,quantity
            }
        );
        await book.save()
    } catch (error) {
        console.log(error)
    }

    if(!book){
        return res.status(500).json({message : "Unable to add"})

    }
    return res.status(201).json({book})

}

const updateBook = async(req,res, next) =>{
    const id = req.params.id;
    const { name, author, description, price , available, image, quantity} = req.body;
    let book;
    try {
        book = await Book.findByIdAndUpdate(id, 
            {name, author, description, price , 
                available , image, quantity})
        book = await book.save()
    } catch (error) {
        console.log(error)
    }

     if(!book){
        return res.status(404).json({message : "Unable to Update this id"})

    }
    return res.status(200).json({book})
}

const deleteBook = async(req,res, next) =>{
    const id = req.params.id;
    
    let book;
    try {
        book = await Book.findByIdAndDelete(id)
        
    } catch (error) {
        console.log(error)
    }

     if(!book){
        return res.status(404).json({message : "Unable to delete this id book"})

    }
    return res.status(200).json({message : " Deleted Successfully"})
}

exports.getAllBooks = getAllBooks;
exports.addBook = addBook;
exports.getById = getById;
exports.updateBook = updateBook;
exports.deleteBook = deleteBook;

























