import React from 'react'
import formStyles from './formStyles'

class Select extends React.Component {
  constructor(props) {
    super(props)
  }

  updateValue(e) {
    this.props.updateStateValues(this.props.name, e.target.value)
  }

  render() {
    const { name, value, options } = this.props

    let placeholder = (!!options.placeholder) ? options.placeholder : name

    if(placeholder === name && name.length > 1) {
      placeholder = placeholder.substr(0, 1).toUpperCase() + placeholder.substr(1, placeholder.length).toLowerCase()
    }

    let optsValues = (!!options.enum) ? options.enum : []


    return (
      <select
        ref={name}
        className={formStyles.selectClass}
        value={value}
        onChange={e => this.updateValue(e)}
      >
        <option value="">{placeholder}</option>
        {optsValues.map(opt => {
          if(typeof opt === "string") {
            return (
              <option
                key={opt}
                value={opt}>
              {opt.substr(0, 1).toUpperCase() + opt.substr(1, opt.length).toLowerCase()}
              </option>)
          }
          else {
            return (
              <option
                key={opt.value}
                value={opt.value}>
                {opt.caption}
              </option>)
          }
        })}
      </select>
    )
  }

}

export default Select
