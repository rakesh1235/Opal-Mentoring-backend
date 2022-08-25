const mongoConnect = require('./db');
const express = require('express')
var cors = require('cors') 


mongoConnect();
const app = express()
const port = 3080

app.use(cors())
app.use(express.json())

app.use((req, res, next)=>{
    require('./middleware/tokenize')(req, res, next)
})

app.use('/auth', require('./routes/auth'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})