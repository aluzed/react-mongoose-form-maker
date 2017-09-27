import React from 'react'
import FormInput from './FormInput'
import formStyles from './formStyles'

class FormMaker extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      schema: {},
      values: this.props.values || {}
    }
  }

  componentWillMount() {
    if(!!this.props.metaUrl)
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

            if(!!field.options) {
              if(field.options.required)
                opts.constraints.push({
                  type: 'REQUIRED',
                  details: {}
                })
              if(!!field.options.placeholder)
                opts.placeholder = field.options.placeholder

              if(!!field.enumValues)
                opts.enum = field.enumValues
            }

            return (
              <FormInput
                key={field.path}
                ref={field.path}
                name={field.path}
                label={field.label ? field.label : field.path}
                type={field.instance.toLowerCase()}
                options={opts}
                value={values[field.path] ? values[field.path] : null}
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
