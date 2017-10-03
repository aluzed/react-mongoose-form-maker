const mongoose = require('mongoose');

module.exports = {
  meta: (modelName, options) => {
    return (req, res) => {
      let model = mongoose.model(modelName);

      if(typeof options === "undefined")
        options = {};

      let tmpSchema = model.schema.paths;
      
      // Filter the fields
      if(!!options.filter) {
        for(let field in options.filter) {
          delete tmpSchema[options.filter[field]];
        }
      }

      return res.send(tmpSchema);
    }
  }
}
