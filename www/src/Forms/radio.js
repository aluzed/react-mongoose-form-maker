import React from 'react'
import formStyles from './formStyles'

class Radio extends React.Component {
  constructor(props) {
    super(props)
  }

  changedValue(e) {
    this.props.updateStateValues(this.props.name, e.target.value)
  }

  render() {
    const { name, value, options } = this.props

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
                    onChange={e => this.changedValue(e)}
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
                    onChange={e => this.changedValue(e)}
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
