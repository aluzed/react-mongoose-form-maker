"use strict"

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create a schema
let petSchema = new Schema({
  name       : {type: String, required: true, placeholder: "Nom de l'animal"},
  kind       : {
    type: String,
    enum: ['Lion', 'Cat', 'Dog', 'Rabbit', 'Bird', 'Duck'],
    placeholder: "Type d'animal"
  },
  weight     : {type: Number},
  vaccined   : {type: Boolean},
  created_at : {type: Date, default: Date.now},
  updated_at : {type: Date}
})

// make this available to our users in our Node applications
module.exports = mongoose.model('Pet', petSchema)
