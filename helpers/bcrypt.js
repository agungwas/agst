const bcrypt = require("bcrypt")

module.exports = {
  encrypt: (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  },
  compare: (pw, h) => {
    return bcrypt.compareSync(pw, h)
  }
}