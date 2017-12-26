# FormMaker

This project wants to make easy the creation and integration of new model to our projects.
It will help us to create new model, generate associated forms and list table in a near future.

## Dependencies

You will need express and mongoose-metadata package :
`npm install mongoose-metadata`


## API and Routing

You have to customize a bit your mongoose model file.
For the API part, please read and get packages : [here](https://github.com/aluzed/mongoose-metadata)


## Disabled fields

By default not all kind of field will be displayed on client side. Here is the list of disabled fields :

```javascript
__v
_id
created_at
updated_at
```

## Views

Now on the client side react project in your React Component :

### Add Form

```javascript
// in <Component>.js
import _FormMaker from '../Forms/formMaker'
FormMaker = _FormMaker()

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
import _FormMaker from '../Forms/formMaker'
FormMaker = _FormMaker()

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

Each element got a customizable Css style or caption. By default we use Bootstrap 4 classes and Ionicons.

```javascript
// You can customize any styles with a custom file ./<name>.js

export default {
  formClass: 'container-fluid mt-3',
  formHeaderClass: 'container-fluid text-center',
  formFooterClass: 'container-fluid text-right',
  submitFormBtnClass: 'btn btn-success',
  submitFormBtnCaption: ' Submit',
  submitFormBtnIcon: 'ion ion-checkmark',
  cancelFormBtnClass: 'btn btn-danger ml-2',
  cancelFormBtnCaption: ' Cancel',
  cancelFormBtnIcon: 'ion ion-close',
  formGroupClass: 'form-group',
  labelClass: '',
  textareaClass: 'form-control',
  textareaErrorClass: 'form-control form-error',
  inputClass: 'form-control',
  inputErrorClass: 'form-control form-error',
  selectClass: 'form-control',
  enumListContainerClass: 'row',
  enumListLeftClass: 'col-xs-12 col-sm-6 col-md-6 col-lg-6',
  enumDescription: 'Click on a value to add it',
  enumAddSuggestBtn: 'btn btn-default suggest-add',
  enumAddSuggestClass: 'ion ion-plus enum-suggest',
  enumRemoveSuggestBtn: 'btn btn-default suggest-remove',
  enumRemoveSuggestClass: 'ion ion-close enum-suggest',
  checkboxClass: '',
  checkboxGroupClass: 'container-fluid',
  radioContainerClass: 'px-3',
  radioClass: '',
  radioGroupClass: 'container-fluid'
}

// And then when you initialize your new FormMaker : ./App.js

import _FormMaker from 'react-mongoose-form-maker'
import customStylesheets from './path/to/custom/styles.js'
const FormMaker = _FormMaker(customStylesheets)

// And then use FormMaker component as usual...
```

## List of types

* String
* Number
* Boolean


*select* : if your field contains an 'enum' field, it <select> will be displayed by default

## Force Field

You can change the display behaviour by using forceField option

* array : displays an enum list
* radio
* date : displays a text input with calendar picker
* email : displays a text input with email rules
* text : displays a textarea

## List of rules

### Input String

| Rule name | Data type | Details        |
|-----------|:----------|:---------------|
| minlength | Number    | Min characters |
| maxLength | Number    | Max characters |

### Input Number

| Rule name | Data type                           | Details         |
|-----------|:------------------------------------|:----------------|
| min       | Number                              | Min value       |
| max       | Number                              | Max value       |
| between   | Object { min: Number, max: Number } | Range of values |

### Input Date

| Rule name | Data type                               | Details         |
|-----------|:----------------------------------------|:----------------|
| minDate   | Date                                    | Min value       |
| maxDate   | Date                                    | Max value       |
| between   | Object { minDate: Date, maxDate: Date } | Range of values |

### Input Array

| Rule name | Data type                           | Details          |
|-----------|:------------------------------------|:-----------------|
| min       | Number                              | Min array length |
| max       | Number                              | Max array length |
| between   | Object { min: Number, max: Number } | Range of length  |
