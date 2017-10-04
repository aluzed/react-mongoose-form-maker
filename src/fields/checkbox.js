import React from 'react'
import formStyles from './formStyles'

class Select extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { name, value, options } = this.props

    let placeholder = (!!options.placeholder) ? options.placeholder : name

    return (
      <div className={formStyles.checkboxGroupClass}>
        <input
          ref={name}
          type="checkbox"
          className={formStyles.checkboxClass}
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
