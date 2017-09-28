# FormMaker

## Preparation

Work with mongoose model. On your api, create a route 'metadata' for a given model :
```javascript
// First of all, import the module
const Metadata = require('/path/to/metadata.js')

// let's use a model pet
// We need to use the meta middleware : Metadata.meta('<modelName>')
app.get('/pets/metadata', Metadata.meta('Pet'))
```

## Model Options

In the mongoose model :
```javascript
let petSchema = new Schema({
  name        : {type: String, required: true, placeholder: "Name of the animal"},
  kind        : {
    type: String,
    enum: ['Lion', 'Cat', 'Dog', 'Rabbit', 'Bird', 'Duck'],
    placeholder: "Type of animal" // Placeholder
  },
  description : {
    type: String,
    placeholder: "Enter the description",
    forceField: "textarea" // Force generation of a textarea instead of a input type text
  }
  weight      : {type: Number},
  vaccined    : {type: Boolean},
  created_at  : {type: Date, default: Date.now},
  updated_at  : {type: Date}
})

module.exports = mongoose.model('Pet', petSchema)
```

### List of field types

* type: String, normal input type text
* type: Number, numeric input type text
* ref ObjectId, selectable input
* type: Boolean, checkbox
* ref Array of ObjectId, extra form
* type: * with enum, select
* forceField: "textarea", textarea
* forceField: "radio" with enum, radio


That's it for the API.

Now on the client side react project :

```javascript

```
