const express = require ('express')
const morgan = require ('morgan')
const dotenv = require('dotenv')
const bodyparser = require('body-parser') 
const path = require('path')

const connectDB = require('./server/database/connect')

dotenv.config({path:'config.env'})

const port = process.env.port || 3000;

const app = express()

app.use(morgan('tiny'))

//mongoDb connection
connectDB();

app.use(bodyparser.urlencoded({extended:true}))

app.set('view engine', 'ejs')

app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))

app.use('/',require('./server/routes/router'))

app.listen(port , ()=>{
    console.log(`Server listening on http://localhost:${port}`)
})