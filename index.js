const express = require('express')
const mongoose = require('mongoose')
const postRouter = require('./routes/postRoute')
const {
    MONGO_IP,
    MONGO_PASSWORD,
    MONGO_PORT,
    MONGO_USER
} = require('./config/config')


const app = express()

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`

const connectWithDB = () => {
    mongoose
    .connect(mongoURL)
    .then(() => {
        console.log("Database Connected")
    })
    .catch(err => {
        console.log(err)
        setTimeout(connectWithDB, 5000)
    })
}
connectWithDB()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('<h2>A Quite Place with you</h2>')
})
app.use("/api/v1/posts", postRouter)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})