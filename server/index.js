const express = require('express')
const cors = require('cors')
const app = express()

// 允许跨域
app.use(cors())
app.use(express.json())

app.use('/static', express.static(__dirname + '/static'))
app.use('/admin', express.static(__dirname + '/admin'))
app.use('/web', express.static(__dirname + '/web'))

app.listen('3000', async(req, res) => {
  console.log("http://localhost:3000")
})

require('./routers/admin/index')(app)
require('./routers/web/index')(app)

require('./db/db')(app)