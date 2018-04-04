/**
* React Mongoose Form Maker
*
* Copyright(c) 2017 Alexandre PENOMBRE
* <aluzed_AT_gmail.com>
*/
import React from 'react'

class Select extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { name, value, options } = this.props

    let placeholder = (!!options.placeholder) ? options.placeholder : name

    return (
      <div className={this.props.formStyles.checkboxGroupClass}>
      <input
      type="checkbox"
      className={this.props.formStyles.checkboxClass}
      defaultChecked={value}
      onChange={e => {
        this.props.updateStateValues(name, e.target.checked)
      }}
      />
      {placeholder}
      </div>
    )
  }

}

export default Select
