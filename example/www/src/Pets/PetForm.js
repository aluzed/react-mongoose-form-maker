/**
* React Mongoose Form Maker
*
* Copyright(c) 2017 Alexandre PENOMBRE
* <aluzed_AT_gmail.com>
*/
import React, { Component } from 'react'
import _FormMaker from 'react-mongoose-form-maker'
const FormMaker = _FormMaker()

class PetForm extends Component {

  constructor(props) {
    super(props)
  }

  // Add Example
  render() {
    return (
      <div>
        <FormMaker
          title="Add a Pet"
          metaUrl="http://localhost:3000/pets/meta_add"
          onSubmit={ (values)=>{ console.log(values) } }
          onCancel={ ()=>{ console.log('cancel callback') } } />
      </div>
    );
  }

  // Edit example
  // render() {
  //   return (
  //     <div>
  //       <FormMaker
  //         title="Add a Pet"
  //         metaUrl="http://localhost:3000/pets/meta_edit"
  //         values={{
  //           vaccined: true,
  //           kind: "Cat"
  //         }}
  //         onSubmit={ (values)=>{ console.log(values) } }
  //         onCancel={ ()=>{ console.log('cancel callback') } } />
  //     </div>
  //   );
  // }
}

export default PetForm
