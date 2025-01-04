const express = require('express');
const dotenv = require('dotenv');
const {connectMongoDB} = require("./connection");

const app = express();

dotenv.config();
const PORT = process.env.PORT
const URI = process.env.URI

connectMongoDB(URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(()=> console.log("database connected")).catch((err) => console.error('Error connecting to MongoDB:', err));

app.listen(PORT, (req, res) => console.log(`Running at port ${PORT}`));
