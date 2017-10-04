"use strict";
const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const Metadata = require('mongoose-metadata');

Metadata.loadModels(path.join(__dirname,'./models'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/formmaker', { useMongoClient: true });

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.get('/pets/metadata', Metadata.meta('Pet'));

app.get('/pets', (req, res) => {
  PetModel.find({}, (err, docs) => {
    if(err)
      return res.status(500).send(err);

    res.json(docs);
  })
})

app.post('/pets/add', (req, res) => {
  return res.json(req.body);
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
