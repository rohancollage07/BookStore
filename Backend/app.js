const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/book-routes');
const cors = require('cors');
const app = express()

//Middleware
app.use(express.json());
app.use(cors())
app.use("/books", router)


mongoose.connect("mongodb+srv://rohancollege07:1ef65zf5QxW0kXsN@bookstore.brsk2vw.mongodb.net/?retryWrites=true&w=majority"
).then(() => console.log("Connected to database")
).then(() => {
    app.listen(5000);
    console.log("Listening to port 5000")
}).catch((err) => console.log(err))


//1ef65zf5QxW0kXsN  og 

//kPhJvKClmlJWXrd2