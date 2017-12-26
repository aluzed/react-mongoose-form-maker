/**
* React Mongoose Form Maker
*
* Copyright(c) 2017 Alexandre PENOMBRE
* <aluzed_AT_gmail.com>
*/
import React from 'react'
import { INPUT_RULES, Verify } from '../rules/enumRules'

class Select extends React.Component {
  constructor(props) {
    super(props)
  }

  changedValue(e) {
    if(!!options.constraints) {
      let required = options.constraints.map(o => o.type === 'REQUIRED');
      if(!!required) {
        if(e.target.value === "") {
          this.props.dispatchError(this.props.name, "is required")
        }
        else {
          this.props.removeError(this.props.name)
        }
      }
    }
    this.props.updateStateValues(this.props.name, e.target.value)
  }

  render() {
    const { name, value, options } = this.props

    let placeholder = (!!options.placeholder) ? options.placeholder : name

    if(placeholder === name && name.length > 1) {
      placeholder = placeholder.substr(0, 1).toUpperCase() + placeholder.substr(1, placeholder.length).toLowerCase()
    }

    return (
      <select
        className={this.props.formStyles.selectClass}
        value={value}
        onChange={e => this.changedValue(e)}
      >
      <option value="">{placeholder}</option>
      {
        options.enum.map(opt => {
          if(typeof opt === "string") {
            return (
              <option
              key={opt}
              value={opt}>
              {opt.substr(0, 1).toUpperCase() + opt.substr(1, opt.length).toLowerCase()}
              </option>
            )
          }
          else {
            return (
              <option
              key={opt.value}
              value={opt.value}>
              {opt.caption}
              </option>
            )
          }
        })
      }
      </select>
    )
  }
}

export default Select
