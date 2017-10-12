/**
* React Mongoose Form Maker
*
* Copyright(c) 2017 Alexandre PENOMBRE
* <aluzed_AT_gmail.com>
*/
import React from 'react'

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
      <div className={this.props.formStyles.radioGroupClass}>
      {
        optsValues.map(opt => {
          if(typeof opt === "string") {
            return (
              <span key={opt} className={this.props.formStyles.radioContainerClass}>
              <input
              type="radio"
              className={this.props.formStyles.radioClass}
              value={opt}
              onChange={e => this.changedValue(e)}
              />
              {opt}
              </span>
            )
          }
          else {
            return (
              <span key={opt.value} className={this.props.formStyles.radioContainerClass}>
              <input
              type="radio"
              className={this.props.formStyles.radioClass}
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
