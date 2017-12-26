/**
* React Mongoose Form Maker
*
* Copyright(c) 2017 Alexandre PENOMBRE
* <aluzed_AT_gmail.com>
*/
"use strict";
const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const _MMetadata = require('mongoose-metadata');
const Metadata = _MMetadata(mongoose);

Metadata.loadModels(path.join(__dirname,'./models'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/formmaker', { useMongoClient: true });

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.get('/pets/meta_add', Metadata.meta('Pet'));

app.get('/pets/meta_edit', Metadata.meta('Pet', {
  filter: ['name']
}));

app.get('/pets', (req, res) => {
  mongoose.model('Pet').find({}, (err, docs) => {
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
