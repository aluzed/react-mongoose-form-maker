/**
* React Mongoose Form Maker
*
* Copyright(c) 2017 Alexandre PENOMBRE
* <aluzed_AT_gmail.com>
*/
import React from 'react'
import { INPUT_RULES, Verify } from '../rules/dateRules';

class DateField extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hasError : false
    }
    this.rules = []
  }

  checkRules(e) {
    let currentValue = currentInput.value

    if(!!this.rules.forEach) {
      this.rules.forEach(r => {
        let v = Verify(r.type, r.details, currentValue)

        // If at least one rule has been infringed
        if(!v.validation) {
          // Display error on our input
          this.setState({ hasError: true })

          // Send error message to the form container
          this.props.dispatchError(this.props.name, v.message)

          return;
        }

        // Has no error
        this.setState({ hasError: false })
      })
    }

    this.props.updateStateValues(this.props.name, currentVal)
  }

  render() {
    const { name, value, options } = this.props
    const { hasError } = this.state

    let placeholder = (!!options.placeholder) ? options.placeholder : name

    if(placeholder === name && name.length > 1) {
      placeholder = placeholder.substr(0, 1).toUpperCase() + placeholder.substr(1, placeholder.length).toLowerCase()
    }

    // If the input contains constraints
    if(!!options.constraints) {
      options.constraints.forEach(constraint => {
        if(!!INPUT_RULES[constraint.type]) {
          let rule = {
            type    : INPUT_RULES[constraint.type],
            details : constraint.details
          }
          this.rules.push(rule)
        }
      })
    }

    let classNames = (hasError) ? this.props.formStyles.inputErrorClass : this.props.formStyles.inputClass

    return (
      <input
        type="text"
        className={classNames}
        value={value}
        placeholder={placeholder}
        onChange={e => this.checkRules(e)}
        />
    )
  }

}

export default DateField
