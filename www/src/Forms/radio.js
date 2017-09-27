import React from 'react'
import formStyles from './formStyles'

class Radio extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value       : this.props.value || "",
      name        : this.props.name || "",
      options     : this.props.options || {},
      haveError   : false
    }
  }

  render() {
    const { name, value, options, hasError } = this.state

    let optsValues = (!!options.enum) ? options.enum : []

    return (
      <div className={formStyles.radioGroupClass}>
        {
          optsValues.map(opt => {
            if(typeof opt === "string") {
              return (
                <span>
                  <input
                    ref={name}
                    type="radio"
                    className={formStyles.radioClass}
                    value={opt}
                    onChange={e => this.setState({ value: e.target.value })}
                  />
                  {placeholder}
                </span>
              )
            }
            else {
              return (
                <span>
                  <input
                    ref={name}
                    type="radio"
                    className={formStyles.radioClass}
                    value={opt.value}
                    onChange={e => this.setState({ value: e.target.value })}
                  />
                  {opt.caption}
                </span>
              )
            }
          })
        }
      </div>
    )
  }

}

export default Radio
