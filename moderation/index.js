const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())


app.listen(4003, ()=>{
    console.log('listening on port 4003')
})