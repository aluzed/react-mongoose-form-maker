/**
* React Mongoose Form Maker
*
* Copyright(c) 2017 Alexandre PENOMBRE
* <aluzed_AT_gmail.com>
*/
export const INPUT_RULES = {
  MIN         : 0,
  MAX         : 1,
  ONLYNUMERIC : 2,
  BEETWEEN    : 3,
};

export const Verify = function(ruleName, details, value) {
  switch(ruleName) {
    case INPUT_RULES.MIN :
      if(parseFloat(value) < parseFloat(details.value))
        return {
          validation: false,
          message: details.message ? details.message : "must be higher than " + details.value
        }
    break

    case INPUT_RULES.MAX :
      if(parseFloat(value.length) < parseFloat(details.value))
        return {
          validation: false,
          message: details.message ? details.message : "must be smaller than " + details.value
        }
    break

    case INPUT_RULES.BEETWEEN :
      value = parseFloat(value)

      // If the size of the string is lower than d.min or greater than d.max
      if(!(parseFloat(value) < parseFloat(details.max)) || !(parseFloat(value) > parseFloat(details.min)))
        return {
          validation: false,
          message: details.message ? details.message : "must be > " + details.min + " and < " + details.max + "."
        }
    break
    
    case INPUT_RULES.VALIDATE :
      if(details.validator(value) === false)
        return {
          validation: false,
          message: details.message ? details.message : "validation failed"
        }
    break

    default :
      return { validation: true }
    break
  }
}
