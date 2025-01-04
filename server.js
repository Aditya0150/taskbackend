const express = require('express');
const dotenv = require('dotenv');
const {connectMongoDB} = require("./connection");

const app = express();

dotenv.config();
const PORT = process.env.PORT;
const URI = process.env.URI;

