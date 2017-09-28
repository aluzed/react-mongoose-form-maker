import React from 'react'
import FormInput from './formInput'
import formStyles from './formStyles'

class FormMaker extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      metaUrl : this.props.metaUrl || '',
      url     : this.props.url || '',
      schema  : {},
      values  : this.props.values || {}
    }
  }

  componentWillMount() {
    if(this.state.metaUrl === "")
      throw new Error('Error, FormMaker require metaUrl property')

    fetch(this.props.metaUrl)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({schema: responseJson})
      })
      .catch((error) => {
        console.error(error)
      })
  }

  updateStateValues(key, value) {
    if(!!this.state) {
      let tmpVals = this.state.values
      tmpVals[key] = value
      this.setState({ values: tmpVals })
    }
  }

  validate(evt) {
    evt.preventDefault()
    let body = {}
    debugger
    this.state.onSubmit(body)
  }

  render() {
    const { url, method } = this.props
    const { schema, values } = this.state

    let fields = []

    for(let field in schema) {
      if(field !== "__v" && field !== "_id" && field !== "created_at" && field !== "updated_at")
        fields.push(schema[field])
    }

    return (
      <form method={method} action={url} className={formStyles.formClass}>
        {
          fields.map(field => {

            let opts = {
              constraints: [],
              placeholder: field.label || field.path
            }

            let tmpValues = null

            if(!!field.options) {
              // If the field is required
              if(field.options.required)
                opts.constraints.push({
                  type: 'REQUIRED',
                  details: {}
                })

              // If the field contains a placeholder
              if(!!field.options.placeholder)
                opts.placeholder = field.options.placeholder

              // If the field
              if(!!field.options.default)
                tmpValues = field.options.default
            }

            // If the field contains enum
            if(!!field.enumValues) {
              if(field.enumValues.length > 0)
              opts['enum'] = field.enumValues
            }

            if(!!values[field.path])
              tmpValues = values[field.path]

            return (
              <FormInput
                key={field.path}
                name={field.path}
                label={field.label ? field.label : field.path}
                type={field.instance.toLowerCase()}
                options={opts}
                value={tmpValues ? tmpValues : null}
                updateStateValues={this.updateStateValues}
                />
            )})
        }

        <button className={formStyles.submitBtnClass} onClick={e=>this.validate(e)}>
          <i className={formStyles.submitBtnIcon}></i> {formStyles.submitBtnCaption}
        </button>
      </form>
    )
  }
}

export default FormMaker
