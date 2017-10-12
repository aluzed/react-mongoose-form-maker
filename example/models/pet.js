/**
* React Mongoose Form Maker
*
* Copyright(c) 2017 Alexandre PENOMBRE
* <aluzed_AT_gmail.com>
*/
"use strict"

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create a schema
let petSchema = new Schema({
  name       : {type: String, required: true, placeholder: "Name of the pet"},
  kind       : {
    type: String,
    enum: ['Lion', 'Cat', 'Dog', 'Rabbit', 'Bird', 'Duck'],
    placeholder: "Type of pet"
  },
  weight     : {type: Number},
  vaccined   : {type: Boolean},
  created_at : {type: Date, default: Date.now},
  updated_at : {type: Date}
})

module.exports = mongoose.model('Pet', petSchema)
