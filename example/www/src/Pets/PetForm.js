import React, { Component } from 'react'
import FormMaker from '../../../src'

class PetForm extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <FormMaker
          title="Add a Pet"
          metaUrl="http://localhost:3000/pets/metadata"
          values={{
            name: "Toto",
            vaccined: true,
            kind: "Cat"
          }}
          onSubmit={ (values)=>{ console.log(values) } }
          onCancel={ ()=>{ console.log('cancel callback') } } />
      </div>
    );
  }
}

export default PetForm;
