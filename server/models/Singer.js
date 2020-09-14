const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const schema = new mongoose.Schema({
  singer_name: {
    type: String
  },
  recommend: {
    type: Boolean},
  introduce: {
    type: String
  },
  photo_address: {
    type: String
  }
}, {
  timestamps: true
})

module.exports =mongoose.model('singer', schema, 'singer')
