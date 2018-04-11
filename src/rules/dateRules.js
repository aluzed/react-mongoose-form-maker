/**
* React Mongoose Form Maker
*
* Copyright(c) 2017 Alexandre PENOMBRE
* <aluzed_AT_gmail.com>
*/
export const INPUT_RULES = {
  MINDATE   : 0,
  MAXDATE   : 1,
  BEETWEEN  : 2,
  VALIDATE  : 3
}

export const Verify = function(ruleName, details, value) {
  switch(r.type) {
    case INPUT_RULES.MINDATE :
      if(moment(value) < moment(details.value))
        return {
          validation: false,
          message: "must be geater than " + details.value
        }
    break
    case INPUT_RULES.MAXDATE :
      if(moment(value) > moment(details.value))
        return {
          validation: false,
          message: "must be lower than " + details.value
        }
    break
    case INPUT_RULES.BEETWEEN :
      if((moment(value) > moment(details.max)) || (moment(value) < (details.min)))
        return {
          validation: false,
          message: "must be lower than " + details.max + " and geater than " + details.min
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
