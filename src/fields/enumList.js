/**
* React Mongoose Form Maker
*
* Copyright(c) 2017 Alexandre PENOMBRE
* <aluzed_AT_gmail.com>
*/
import React from 'react'
import _ from 'lodash-node'

class EnumList extends React.Component {
  constructor(props) {
    super(props)
  }

  select(val) {
    let tmpState = this.props.value
    tmpState.push(val)
    this.props.updateStateValues(this.props.name, tmpState)
  }

  deselect(val) {
    let tmpState = _.difference(this.props.value, [val])
    this.props.updateStateValues(this.props.name, tmpState)
  }

  render() {
    const { name, value, options } = this.props

    let optsValues = []

    if(!!options.enum)
    optsValues = options.enum

    return (
      <div className={this.props.formStyles.enumListContainerClass}>
      <div className={this.props.formStyles.enumListLeftClass}>
      {this.props.formStyles.enumDescription}
      <br/>

      {
        optsValues.map(opt => {
          if(typeof opt === "string") {
            if(this.props.value.indexOf(opt) < 0) {
              return (
                <div
                key={opt}
                className={this.props.formStyles.enumBtnClass}
                onClick={e=>this.select(opt)}
                >
                <i className={this.props.formStyles.enumAddSuggestClass}></i>
                {opt}
                </div>
              )
            } else {
              return null
            }
          }
          else {
            if(this.props.value.indexOf(opt.value) < 0) {
              return (
                <div
                key={opt.value}
                className={this.props.formStyles.enumBtnClass}
                onClick={e=>this.deselect(opt.value)}
                >
                <i className={this.props.formStyles.enumAddSuggestClass}></i>
                {opt.caption}
                </div>
              )
            }
            else {
              return null
            }
          }
        })
      }

      </div>
      </div>
    )
  }
}

export default EnumList
