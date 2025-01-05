const express = require('express');
const dotenv = require('dotenv');
const {connectMongoDB} = require("./connection");
const userRoutes = require("./routes/userRoutes");

const app = express();

dotenv.config();
app.use(express.json());
app.use("/api/users", userRoutes);
const PORT = process.env.PORT
const URI = process.env.URI

connectMongoDB(URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(()=> console.log("database connected")).catch((err) => console.error('Error connecting to MongoDB:', err));

app.listen(PORT, (req, res) => console.log(`Running at port ${PORT}`));
