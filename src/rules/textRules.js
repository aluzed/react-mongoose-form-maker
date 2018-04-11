/**
* React Mongoose Form Maker
*
* Copyright(c) 2017 Alexandre PENOMBRE
* <aluzed_AT_gmail.com>
*/
export const INPUT_RULES = {
  MINLENGTH   : 0,
  MAXLENGTH   : 1,
  ONLYNUMERIC : 2,
  BEETWEEN    : 3,
  GREATERTHAN : 4,
  LOWERTHAN   : 5,
  REQUIRED    : 6,
  ISEMAIL     : 7,
  VALIDATE    : 8
};

export const Verify = function(ruleName, details, value) {
  switch(ruleName) {
    case INPUT_RULES.MINLENGTH :
      if(value.length < details.value)
        return {
          validation: false,
          message: details.message ? details.message : "must be longer than " + details.value + " characters."
        }
    break

    case INPUT_RULES.MAXLENGTH :
      if(value.length < details.value)
        return {
          validation: false,
          message: details.message ? details.message : "must be smaller than " + details.value + " characters."
        }
    break

    case INPUT_RULES.BEETWEEN :
      value = parseFloat(value)

      // If the size of the string is lower than d.min or greater than d.max
      if(!(value < details.max) || !(value > details.min))
        return {
          validation: false,
          message: details.message ? details.message : "must be > " + details.min + " and < " + details.max + "."
        }
    break

    case INPUT_RULES.GREATERTHAN :
      value = parseFloat(value)

      if(value < details.value)
        return {
          validation: false,
          message: details.message ? details.message : "must be greater than " + details.value + "."
        }
    break

    case INPUT_RULES.LOWERTHAN :
      value = parseFloat(value)

      if(value > details.value)
        return {
          validation: false,
          message: details.message ? details.message : "must be lower than " + details.value + "."
        }
    break

    case INPUT_RULES.REQUIRED :
      if(value === "")
        return {
          validation: false,
          message: details.message ? details.message : "is required"
        }
    break

    case INPUT_RULES.ISEMAIL :
      if(!value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/))
        return {
          validation: false,
          message: "must be a valid email."
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
