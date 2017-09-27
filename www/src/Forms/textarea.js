import React from 'react'
import formStyles from './formStyles'

const INPUT_RULES = {
  MINLENGTH   : 0,
  MAXLENGTH   : 1,
  ONLYNUMERIC : 2,
  BEETWEEN    : 3,
  GREATERTHAN : 4,
  LOWERTHAN   : 5,
  REQUIRED    : 6
}

class Input extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value       : this.props.value || "",
      name        : this.props.name || "",
      options     : this.props.options || {},
      haveError   : false
    }
    this.rules = []
  }

  checkRules(currentInput) {
    let errorCounter = 0,
        d = {},
        currentVal = currentInput.value

    this.rules.forEach(r => {
      switch(r.type) {
        case INPUT_RULES.MINLENGTH :
          d = r.details
          if(currentVal.length < d.value)
            errorCounter++
          break

        case INPUT_RULES.MAXLENGTH :
          d = r.details
          currentVal = currentVal.substr(0, d.value)
          break

        case INPUT_RULES.ONLYNUMERIC :
          // let reg = new RegExp('^[0-9]+$')
          // let match = currentVal.match(reg)

          if(isNaN(currentVal)) {
            if(currentVal.length > 0) {
              currentVal = currentVal.substr(0, currentVal.length-1)
            }
          }
          break
          
        case INPUT_RULES.REQUIRED :
          if(currentVal === "")
            errorCounter++
          break

        default:
          break
      }
    })

    (errorCounter > 0) ?
      this.setState({value: currentVal, haveError: true}) :
      this.setState({value: currentVal, haveError: false})
  }

  render() {
    const { name, value, options, hasError } = this.state

    let placeholder = (!!options.placeholder) ? options.placeholder : name

    // If the input contain constraints
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

    let classNames = (hasError) ? formStyles.textareaErrorClass : formStyles.textareaClass

    return (
      <textarea
        ref={name}
        type="text"
        className={classNames}
        value={value}
        placeholder={placeholder}
        onChange={e => this.checkRules(e.target)}></textarea>
    )
  }

}

export default Input
