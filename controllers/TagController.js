const {Tag} = require("../models")

class TagController {

  static tags(req, res){
    Tag.findAll()
    .then(tags => res.send(tags))
    .catch(err => res.send(err))
  }
}

module.exports = TagController