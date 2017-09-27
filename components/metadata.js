const mongoose = require('mongoose');

module.exports = {
  meta: (modelName) => {
    return (req, res) => {
      let model = mongoose.model(modelName);
      return res.send(model.schema.paths);
    }
  }
}
