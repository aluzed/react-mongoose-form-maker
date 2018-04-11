module.exports = (field, values) => {
  // Constraints are all the rules that can change the behaviour of our component
  let options = {
    constraints: [],
    placeholder: field.label || field.path
  }

  // default value
  let value = null

  // details, error messages...
  let details = {}

  // current field type
  let type = !!field.options.forceField ? field.options.forceField : field.instance.toLowerCase()

  if(!!field.options) {
    // If the field is required
    if(field.options.required) {

      // Check if it got its custom error message
      if(typeof field.options.required.length !== 'undefined') {
        if(field.options.required.length >= 2) {
          // Get the error message
          details.message = field.options.required[1];
        }
      }
      options.constraints.push({
        type: 'REQUIRED',
        details
      })
    }

    // If the field contains a placeholder
    if(!!field.options.placeholder)
      options.placeholder = field.options.placeholder

    // If the field
    if(!!field.options.default)
      value = field.options.default


    // Depending on custom type, applying rules
    // Handling default rules
    switch(type) {
      case "number" :
        // MIN
        if(field.options.min) {
          // Check if it got its custom error message
          if(typeof field.options.min.length !== 'undefined') {
            if(typeof field.options.min[0] !== "Number")
              throw new Error('Error, first min parameter must be type of Number in mongoose model')

            if(field.options.min.length >= 2) {
              // Get the error message
              details.message = field.options.min[1]
              details.value = field.options.min[0]
            }
            else {
              details.value = field.options.min[0]
            }
          }
          else {
            details.value = field.options.min
          }

          options.constraints.push({
            type: 'GREATERTHAN',
            details
          })
        }

        // MAX
        if(field.options.max) {
          // Check if it got its custom error message
          if(typeof field.options.max.length !== 'undefined') {
            if(typeof field.options.max[0] !== "Number")
              throw new Error('Error, first max parameter must be type of Number in mongoose model')

            if(field.options.max.length >= 2) {
              // Get the error message
              details.message = field.options.max[1]
              details.value = field.options.max[0]
            }
            else {
              details.value = field.options.max[0]
            }
          }
          else {
            details.value = field.options.max
          }

          options.constraints.push({
            type: 'LOWERTHAN',
            details
          })
        }

        // BETWEEN
        if(!!field.options.between) {
          options.constraints.push({
            type: 'BETWEEN',
            details: {
              min: field.options.between.min,
              max: field.options.between.max
            }
          })
        }
        break
      
      case "text":
      case "string" :
        // MINLENGTH
        if(field.options.minLength) {
          if(typeof field.options.minLength[0] !== "Number") {
            throw new Error('Error, first minLength parameter must be type of Number in mongoose model')

            if(field.options.minLength.length >= 2) {
              // Get the error message
              details.message = field.options.minLength[1]
              details.value = field.options.minLength[0]
            }
            else {
              details.value = field.options.minLength[0]
            }
          }
          else {
            details.value = field.options.minLength
          }

          options.constraints.push({
            type: 'MINLENGTH',
            details
          })
        }

        // MAXLENGTH
        if(field.options.maxLength) {
          if(typeof field.options.maxLength[0] !== "Number") {
            throw new Error('Error, first maxLength parameter must be type of Number in mongoose model')

            if(field.options.maxLength.length >= 2) {
              // Get the error message
              details.message = field.options.maxLength[1]
              details.value = field.options.maxLength[0]
            }
            else {
              details.value = field.options.maxLength[0]
            }
          }
          else {
            details.value = field.options.maxLength
          }

          options.constraints.push({
            type: 'MAXLENGTH',
            details
          })
        }
        break

      case "array" :
        // MIN
        if(field.options.min) {

          details.value = field.options.min

          options.constraints.push({
            type: 'MIN',
            details
          })
        }

        // MAX
        if(field.options.max) {

          details.value = field.options.max

          options.constraints.push({
            type: 'MAX',
            details
          })
        }

        // BETWEEN
        if(!!field.options.between) {

          details.min = field.options.between.min
          details.max = field.options.between.max

          options.constraints.push({
            type: 'BETWEEN',
            details
          })
        }
        break

      case "date" :
        // MINDATE
        if(!!field.options.minDate) {

          details.value = field.options.minDate

          options.constraints.push({
            type: 'MINDATE',
            details
          })
        }

        // MAXDATE
        if(!!field.options.maxDate) {

          details.value = field.options.maxDate

          options.constraints.push({
            type: 'MAXDATE',
            details
          })
        }

        // BETWEEN
        if(!!field.options.between) {

          details.min = field.options.between.minDate
          details.max = field.options.between.maxDate

          options.constraints.push({
            type: 'BETWEEN',
            details
          })
        }
        break
    }

    // Custom validator
    if(!!field.options.validate) {
      if(typeof field.options.validate.validator === "string")
        field.options.validate.validator = eval('(' + field.options.validate.validator + ')')

      // Validation test
      details.validator = field.options.validate.validator

      // Custom message
      if(!!field.options.validate.message) {
        details.message = field.options.validate.message
      }

      options.constraints.push({
        type: 'VALIDATE',
        details
      })
    }
  }

  // If the field contains enum
  if(!!field.enumValues) {
    options['enum'] = field.enumValues.length > 0 ? field.enumValues : []
  }

  if(!!values[field.path])
    value = values[field.path]

  return {
    field,
    options,
    value,
    type
  }
}
