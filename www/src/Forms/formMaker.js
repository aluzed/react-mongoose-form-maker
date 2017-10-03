import React from 'react'
import FormInput from './formInput'
import formStyles from './formStyles'

class FormMaker extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      title   : this.props.title || '',
      metaUrl : this.props.metaUrl || '',
      url     : this.props.url || '',
      schema  : {},
      values  : this.props.values || {},
      onSubmitRedirect : this.props.onSubmitRedirect || void(0),
      onCancelRedirect : this.props.onCancelRedirect || void(0)
    }

    this.updateStateValues = this.updateStateValues.bind(this)
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

  updateStateValues(name, value) {
    this.setState({ values: {...this.state.values, [name]: value } })
  }

  validate(evt) {
    evt.preventDefault()
    let body = this.state.values
    this.onSubmit(body)
  }

  cancel(evt) {
    evt.preventDefault()

    if(window.confirm("Are you sure to cancel current form ?"))
      this.state.onCancelRedirect()
  }

  onSubmit(values) {
    console.log(values)

    this.state.onSubmitRedirect()
  }

  render() {
    const { url, method } = this.props
    const { schema, values, title } = this.state

    let fields = []

    for(let field in schema) {
      if(field !== "__v" && field !== "_id" && field !== "created_at" && field !== "updated_at")
        fields.push(schema[field])
    }

    return (
      <form method={method} action={url} className={formStyles.formClass}>
        <div className={formStyles.formHeaderClass}>
          <h4>
            {title}
          </h4>
          <hr/>
        </div>

        <div className={formStyles.formBodyClass}>
          {
            fields.map(field => {
              let opts = {
                constraints: [],
                placeholder: field.label || field.path
              }

              let tmpValue = null

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
                  tmpValue = field.options.default
              }

              // If the field contains enum
              if(!!field.enumValues) {
                if(field.enumValues.length > 0)
                opts['enum'] = field.enumValues
              }

              if(!!values[field.path])
                tmpValue = values[field.path]

              return (
                <FormInput
                  key={field.path}
                  name={field.path}
                  label={field.label ? field.label : field.path}
                  type={field.instance.toLowerCase()}
                  options={opts}
                  value={tmpValue}
                  updateStateValues={this.updateStateValues}
                  />
              )})
          }
          <hr/>
        </div>

        <div className={formStyles.formFooterClass}>
          <button className={formStyles.submitFormBtnClass} onClick={e=>this.validate(e)}>
          <i className={formStyles.submitFormBtnIcon}></i> {formStyles.submitFormBtnCaption}
          </button>

          <button className={formStyles.cancelFormBtnClass} onClick={e=>this.cancel(e)}>
          <i className={formStyles.cancelFormBtnIcon}></i> {formStyles.cancelFormBtnCaption}
          </button>
        </div>
      </form>
    )
  }
}

export default FormMaker
