const express = require('express')
const mongoose = require('mongoose')
const {
    MONGO_IP,
    MONGO_PASSWORD,
    MONGO_PORT,
    MONGO_USER
} = require('./config/config')

const app = express()

mongoose
    .connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`)
    .then(() => {
        console.log("Database Connected")
    })
    .catch(err => console.log(err))


app.get('/', (req, res) => {
    res.send('<h2>A Quite Place</h2>')
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})