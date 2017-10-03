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

### Disabled fields

By default not all kind of field will be displayed on client side. Here is the list of disabled fields : 

* __v
* _id
* created_at
* updated_at

So, for those fields, you would not get a form input client side.

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

## Create multiple forms
```javascript
// First of all, import the module
const Metadata = require('/path/to/metadata.js')

// Add meta fields
// Here, we disabled kind and vaccined fields
app.get('/pets/meta_add', Metadata.meta('Pet', { filter: ['kind', 'vaccined'] }))

// Edit meta fields
// Here, we disabled name field
app.get('/pets/meta_edit', Metadata.meta('Pet', { filter: ['name'] }))
```

## Views

That's it for the API.

Now on the client side react project :

### Add Form

```javascript
import FormMaker from '../Forms/formMaker'

// Now in the render
render() {
return <FormMaker
  title="Add a Pet"
  metaUrl="http://server/pets/metadata"
  onSubmit={ (values)=>{ console.log(values) } }
  onCancel={ ()=>{ console.log('cancel callback') } } />
}

// Now you can handle each action submit and cancel by binding your callback here

```

### Edit Form

```javascript
import FormMaker from '../Forms/formMaker'

// Now in the render
// We just have to set values and data, will be matched automatically
render() {
return <FormMaker
  title="Add a Pet"
  metaUrl="http://server/pets/metadata"
  values={{
    name: "Toto",
    vaccined: true,
    kind: "Cat"
  }}
  onSubmit={ (values)=>{ console.log(values) } }
  onCancel={ ()=>{ console.log('cancel callback') } } />
}

```

## Customize style

Each element got a customizable Css style or caption, look in `www/src/Forms/formStyles`, by default we use Bootstrap 4 classes.
