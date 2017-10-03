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

* Text
```javascript
// In mongoose model
let petSchema = new Schema({
  name : {  
    type: String,
    required: true,
    placeholder: "Nom de l'animal"
  }
})
```

* Numeric
```javascript
// In mongoose model
let petSchema = new Schema({
  weight : { type: Number }
})
```

* type: Boolean, checkbox
```javascript
// In mongoose model
let petSchema = new Schema({
  weight : { type: Number }
})
```

* Enum : displays select input as default
```javascript
// In mongoose model
let petSchema = new Schema({
  kind : {
    type: String,
    enum: ['Lion', 'Cat', 'Dog', 'Rabbit', 'Bird', 'Duck'],
    placeholder: "Type"
  }
})
```

* Textarea
```javascript
// In mongoose model
let petSchema = new Schema({
  description : {
    type: String,
    forceField: "textarea"
  }
})
```

* Radio
```javascript
// In mongoose model
let petSchema = new Schema({
  kind : {
    type: String,
    enum: ['Lion', 'Cat', 'Dog', 'Rabbit', 'Bird', 'Duck'],
    placeholder: "Type",
    forceField: "radio"
  }
})
```

* Foreign Key



That's it for the API.

Now on the client side react project :

## Add Form

```javascript
import FormMaker from '../Forms/formMaker'

// New in the render

return <FormMaker
  title="Add a Pet"
  metaUrl="http://localhost:3000/pets/metadata"
  onSubmit={ (values)=>{ console.log(values) } }
  onCancel={ ()=>{ console.log('cancel callback') } } />

// Now you can handle each action submit and cancel by binding your callback here

```

## Edit Form

```javascript
import FormMaker from '../Forms/formMaker'

// New in the render

return <FormMaker
  title="Add a Pet"
  metaUrl="http://localhost:3000/pets/metadata"
  values={{
    name: "Toto",
    vaccined: true,
    kind: "Cat"
  }}
  onSubmit={ (values)=>{ console.log(values) } }
  onCancel={ ()=>{ console.log('cancel callback') } } />

```
