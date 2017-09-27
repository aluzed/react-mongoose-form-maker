import React, { Component } from 'react';
import FormMaker from '../Forms/FormMaker';

class PetForm extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <FormMaker
          metaUrl="http://localhost:3000/pets/metadata"
          url="http://localhost:3000/pets/add"
          method="post" />
      </div>
    );
  }
}

export default PetForm;
