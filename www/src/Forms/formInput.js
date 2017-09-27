import React from 'react'
import Input from './input'
import EnumList from './enumList'
import Select from './select'
import Textarea from './textarea'
import Radio from './radio'
import Checkbox from './checkbox'
import formStyles from './formStyles'

class FormInput extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      label   : this.props.label || "",
      value   : this.props.value || "",
      name    : this.props.name || "",
      type    : this.props.type || "String",
      options : this.props.options || {}
    }
  }

  render() {
    const { label, name, type, value, options } = this.state

    let field = null

    // The option.forceField override the current field type
    if(!!options.forceField)
      type = options.forceField

    // Check if it has an enum
    if(!!options.enum) {
      switch(type) {
        case "array":
          field = (<EnumList
            name={name}
            options={options}
            value={value}
          />)
          break

        default :
          field = (
            <Select
              name={name}
              options={options}
              value={value}
            />)
          break
      }
    }
    else {
      switch(type) {
        case "boolean":
          field = (
            <Checkbox
            name={name}
            options={options}
            value={value}
            />
          )
          break

        case "string":
          field = (
            <Input
            name={name}
            options={options}
            value={value}
            />)
          break

        case "number":
          options.constraints.push({type: 'ONLYNUMERIC'})
          field = (
            <Input
            name={name}
            options={options}
            value={value}
            />
          )
          break

        case "text":
          field = (
            <Textarea
            name={name}
            options={options}
            value={value}
            />
          )
          break

        default :
          field = (
            <Input
            name={name}
            options={options}
            value={value}
            />)
            break
          }
    }

    return (
      <div className={formStyles.formGroupClass}>
        <label htmlFor={name} className={formStyles.labelClass}>
          {label}
        </label>

        {field}
      </div>
    )
  }
}

export default FormInput
