module.exports = app => {
  const mongoose = require('mongoose')

  mongoose.connect('mongodb://localhost:27017/MusicWeb', {useNewUrlParser: true}, function (err, db){
    if (err) throw err;
    console.log("连接成功");
  })
}