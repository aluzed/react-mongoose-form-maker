/**
* React Mongoose Form Maker
*
* Copyright(c) 2017 Alexandre PENOMBRE
* <aluzed_AT_gmail.com>
*/
import React from 'react'
import FormInput from './formInput'
import defaultFormStyles from './formStyles'
import mapOptions from './libs/fieldOptionsMapper';

export default (formStyles) => {

  //  Check if we need to override default CSS style
  formStyles = !!formStyles ? formStyles : defaultFormStyles

  return class FormMaker extends React.Component {

    constructor(props) {
      super(props)

      this.state = {
        title      : this.props.title || '',
        metaUrl    : this.props.metaUrl || '',
        schema     : this.props.schema || {},
        values     : this.props.values || {},
        onSubmitCb : this.props.onSubmit || void(0),
        onCancelCb : this.props.onCancel || void(0),
        errorMsgs  : {} // Error messages to display
      }

      this.updateStateValues = this.updateStateValues.bind(this)
      this.dispatchError     = this.dispatchError.bind(this)
      this.removeError       = this.removeError.bind(this)
    }

    // Getting Schema from our api and turn it into a form
    componentWillMount() {
      if(this.state.metaUrl !== "")
      fetch(this.props.metaUrl)
        .then(response => response.json())
        .then(responseJson => {
          this.setState({schema: responseJson})
        })
        .catch((error) => {
          console.error(error)
        })
    }

    // callback that set our state values for each fields
    updateStateValues(name, value) {
      this.setState({ values: {...this.state.values, [name]: value } })
    }

    // Before executing validation callback, we need to check if every rule is respected
    validate(evt) {
      evt.preventDefault()
      let body = this.state.values
      let errorMsgs = this.state.errorMsgs

      for(let f in this.state.schema) {
        if(!!this.state.schema[f].options) {
          if(!!this.state.schema[f].options.required) {

            // If the file is required but missing, cancel the validation
            if(typeof body[f] === "undefined") {
              this.setState({ errorMsgs: { ...errorMsgs, [f]: f + " is required." } })
              return;
            }

            if(body[f] === "") {
              this.setState({ errorMsgs: { ...errorMsgs, [f]: f + " is required." } })
              return;
            }
          }
        }
      }

      if(Object.keys(this.state.errorMsgs).length === 0) {
        // If validate is allowed
        this.state.onSubmitCb(body)
        this.setState({ errorMsgs: {} })
      }
    }

    cancel(evt) {
      evt.preventDefault()

      if(window.confirm("Are you sure to cancel current form ?"))
        this.state.onCancelCb()
    }

    // Display the error message
    dispatchError(field, error) {
      this.setState({ errorMsgs: {  } })
    }

    // Hide the error message
    removeError(field) {
      let newErrorMsgs = this.state.errorMsgs
      delete newErrorMsgs[field]
      this.setState({ errorMsgs: newErrorMsgs })
    }

    render() {
      const { schema, values, title } = this.state

      let fields = []

      for(let field in schema) {
        if(field !== "__v" && field !== "_id" && field !== "created_at" && field !== "updated_at")
        fields.push(schema[field])
      }

      let error = (this.state.errorMsg !== "") ?  (
        <div className="alert alert-danger" role="alert">
          <strong>Error</strong> {this.state.errorMsg}
        </div>
      ) : null;

      return (
        <form className={formStyles.formClass}>
          <div className={formStyles.formHeaderClass}>
            <h4>
            {title}
            </h4>
            <hr/>
          </div>

          <div className={formStyles.formBodyClass}>
          {
            fields.map(f => {

              let { field, options, value, type } = mapOptions(f, values)

              return (
                <FormInput
                  key={field.path}
                  name={field.path}
                  label={field.label ? field.label : field.path}
                  type={type}
                  options={options}
                  value={value}
                  updateStateValues={this.updateStateValues}
                  dispatchError={this.dispatchError}
                  removeError={this.removeError}
                  formStyles={formStyles}
                />
              )})
          }
          </div>

          <div className={formStyles.formFooterClass}>

            {error}

            <hr/>
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
}
