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
  }

  render() {
    let { type } = this.props
    const { label, name, value, options, updateStateValues } = this.props

    let field = null

    // The option.forceField override the current field type
    if(!!options.forceField)
      type = options.forceField

    // Check if it has an enum
    if(!!options.enum) {
      switch(type) {
        case "array":
          field = (
            <EnumList
              name={name}
              options={options}
              value={value !== null ? value : ""}
              updateStateValues={updateStateValues}
            />
          )
          break

        default :
          field = (
            <Select
              name={name}
              options={options}
              value={value !== null ? value : ""}
              updateStateValues={updateStateValues}
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
            value={value !== null ? value : false}
            updateStateValues={updateStateValues}
            />
          )
          break

        case "string":
          field = (
            <Input
            name={name}
            options={options}
            value={value !== null ? value : ""}
            updateStateValues={updateStateValues}
            />)
          break

        case "number":
          options.constraints.push({type: 'ONLYNUMERIC'})
          field = (
            <Input
            name={name}
            options={options}
            value={value !== null ? value : ""}
            updateStateValues={updateStateValues}
            />
          )
          break

        case "text":
          field = (
            <Textarea
            name={name}
            options={options}
            value={value !== null ? value : ""}
            updateStateValues={updateStateValues}
            />
          )
          break

        default :
          field = (
            <Input
            name={name}
            options={options}
            value={value !== null ? value : ""}
            updateStateValues={updateStateValues}
            />)
            break
          }
    }

    let tmpLabel = label

    if(label.length > 0)
      tmpLabel = label.substr(0, 1).toUpperCase() + label.substr(1, label.length).toLowerCase()

    return (
      <div className={formStyles.formGroupClass}>
        <label htmlFor={name} className={formStyles.labelClass}>
          {tmpLabel}
        </label>

        {field}
      </div>
    )
  }
}

export default FormInput
