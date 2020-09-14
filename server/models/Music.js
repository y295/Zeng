const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const schema = new mongoose.Schema({
  music_name: {
    type: String
  },
  recommend: {
    type: Boolean
  },
  singers: [{type: mongoose.SchemaTypes.ObjectId, ref: 'singer'}],
  categories: [{type: mongoose.SchemaTypes.ObjectId, ref: 'category'}],
  music_address: {
    type: String
  },
  collection_num:{
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

module.exports =mongoose.model('music', schema, 'music')
