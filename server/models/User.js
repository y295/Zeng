const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const schema = new mongoose.Schema({
  username: {
    type: String
  },
  password: {
    type: String,
    select: false,
    set(val) {
      return bcrypt.hashSync(val, 10)
    }
  },
  my_music:[{type: mongoose.SchemaTypes.ObjectId, ref: 'music'}]
})

module.exports =mongoose.model('user', schema, 'user')
