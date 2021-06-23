'use strict'

require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const mongoose = require('mongoose');

const server = express();
server.use(cors());
server.use(express.json());
const PORT = process.env.PORT;

const {
    bookHandler,
    handleAddBook,
    handleDeleteBook,
    handleUpdate
} = require('./module/seedbook');

//http://localhost:3010/book?email=abed
server.get('/book', bookHandler)
server.post('/addbook', handleAddBook);
server.delete('/deletebook/:index', handleDeleteBook);
server.put('/updatebook/:index',handleUpdate)

server.get('/', homeHandler);

function homeHandler(req, res) {
    res.send('Home Route');
}

server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})