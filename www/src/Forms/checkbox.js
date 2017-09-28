import React from 'react'
import formStyles from './formStyles'

class Select extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value             : this.props.value || "",
      name              : this.props.name || "",
      options           : this.props.options || {},
      updateStateValues : this.props.updateStateValues,
      haveError         : false
    }
  }

  render() {
    const { name, value, options, hasError } = this.state

    this.state.updateStateValues(this.state.name, this.state.value)

    let placeholder = (!!options.placeholder) ? options.placeholder : name

    return (
      <div className={formStyles.checkboxGroupClass}>
        <input
          ref={name}
          type="checkbox"
          className={formStyles.checkboxClass}
          defaultChecked={value}
          onChange={e => this.setState({ value: e.target.value })}
        />
        {placeholder}
      </div>
    )
  }

}

export default Select
