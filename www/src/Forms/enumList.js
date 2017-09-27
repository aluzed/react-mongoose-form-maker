import React from 'react'
import formStyles from './formStyles'
import _ from 'lodash-node'

class EnumList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.value || []
    }
  }

  select(val) {
    let tmpState = this.state.value
    tmpState.push(val)
    this.setState({ value: tmpState })
  }

  deselect(val) {
    let tmpState = _.difference(this.state.value, [val])
    this.setState({ value: tmpState })
  }

  render() {
    const { name, value, options } = this.state

    let optsValues = []

    if(!!options.enum)
      optsValues = options.enum

    return (
      <div className={formStyles.enumListContainerClass}>
        <div className={formStyles.enumListLeftClass}>
          {formStyles.enumDescription}
          <br/>

          {
            optsValues.map(opt => {
              if(typeof opt === "string") {
                if(this.state.value.indexOf(opt) < 0) {
                  return (
                    <div
                      key={opt}
                      className={formStyles.enumBtnClass}
                      onClick={e=>this.select(opt)}
                    >
                      <i className={formStyles.enumAddSuggestClass}></i>
                      {opt}
                    </div>
                  )
                } else {
                  return null
                }
              }
              else {
                if(this.state.value.indexOf(opt.value) < 0) {
                  return (
                    <div
                      key={opt.value}
                      className={formStyles.enumBtnClass}
                      onClick={e=>this.deselect(opt.value)}
                    >
                      <i className={formStyles.enumAddSuggestClass}></i>
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
