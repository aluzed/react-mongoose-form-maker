/**
* React Mongoose Form Maker
*
* Copyright(c) 2017 Alexandre PENOMBRE
* <aluzed_AT_gmail.com>
*/
const INPUT_RULES = {
  MIN      : 0,
  MAX      : 1,
  BEETWEEN : 2,
  VALIDATE : 3
}

const Verify = function(ruleName, details, value) {
  switch(r.type) {
    case INPUT_RULES.MIN :
    if(value.length < details.value)
        return { validation: false, message: "length must be geater than " + details.value }
    break
    case INPUT_RULES.MAX :
      if(value.length > details.value)
        return { validation: false, message: "length must be lower than " + details.value }
    break
    case INPUT_RULES.BEETWEEN :
      if((value.length > details.max) || (value.length < details.min))
        return { validation: false, message: "length must be lower than " + details.max + " and geater than " + details.min }
    break
    case VALIDATE :
      if(!details.validate(value))
        return {
          validation: false,
          message: details.message ? details.message : "validation failed"
        }
    break

    default:
    break
  }
}

export default { INPUT_RULES, Verify };
