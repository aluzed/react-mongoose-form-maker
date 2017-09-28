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

  changeDispatcher(e) {
    this.setState({ value: e.target.value })
    this.state.updateStateValues(this.state.name, this.state.value)
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
                <span key={opt}>
                  <input
                    ref={name}
                    type="radio"
                    className={formStyles.radioClass}
                    value={opt}
                    onChange={e => this.changeDispatcher(e)}
                  />
                  {opt}
                </span>
              )
            }
            else {
              return (
                <span key={opt.value}>
                  <input
                    ref={name}
                    type="radio"
                    className={formStyles.radioClass}
                    value={opt.value}
                    onChange={e => this.changeDispatcher(e)}
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
