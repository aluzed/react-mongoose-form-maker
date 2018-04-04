/**
* React Mongoose Form Maker
*
* Copyright(c) 2017 Alexandre PENOMBRE
* <aluzed_AT_gmail.com>
*/
import React from 'react'

import { INPUT_RULES, Verify } from '../rules/textRules';

class Textarea extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hasError         : false
    }
    this.rules = []
  }

  checkRules(e) {
    let currentValue = e.target.value

    if(!!this.rules.forEach) {
      this.rules.forEach(r => {

        // Handle behaviours
        switch(r.type) {
          case INPUT_RULES.ONLYNUMERIC :
            if(isNaN(currentValue) && currentValue.length > 0) {
              currentValue = currentValue.substring(0, (currentValue.length - 1))
              e.target.value = currentValue
            }
          break
        }

        // Call verify method from ../rules/textRules
        let v = verify(r.type, r.details, currentValue)

        // If at least one rule has been infringed
        if(!v.validation) {
          // Display error on our input
          this.setState({ hasError: true })

          // Send error message to the form container
          this.props.dispatchError(this.props.name, v.message)
        }
        else {
          this.props.removeError(this.props.name)

          // Has no error
          this.setState({ hasError: false })
        }
      })
    }

    if(!!this.props.isNumber)
      currentValue = parseFloat(currentValue);

    this.props.updateStateValues(this.props.name, currentValue)
  }

  render() {
    const { name, value, options } = this.props
    const { hasError } = this.state

    let placeholder = (!!options.placeholder) ? options.placeholder : name

    // If the input contain constraints
    if(!!options.constraints) {
      // Check if it is an array
      if(!!options.constraints.forEach) {
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
    }

    let classNames = (hasError) ? this.props.formStyles.textareaErrorClass : this.props.formStyles.textareaClass

    return (
      <textarea
        type="text"
        className={classNames}
        value={value}
        placeholder={placeholder}
        onChange={e => this.checkRules(e)}></textarea>
    )
  }

}

export default Textarea
