const express = require('express')
const mongoose = require('mongoose')
const postRouter = require('./routes/postRoute')
const userRoute = require('./routes/userRoute')
const session = require('express-session')
let RedisStore = require('connect-redis')(session)
const { createClient } = require('redis')
const cors = require('cors')
const {
    MONGO_IP,
    MONGO_PASSWORD,
    MONGO_PORT,
    MONGO_USER,
    SESSION_SECRET
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


// let redisClient = createClient({ url: 'redis://redis:6379' })

// redisClient.connect().catch(console.error)

app.enable('trust proxy')
// app.use(session({
//     store: new RedisStore({ client: redisClient }),
//     secret: SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true }
// }))

app.use(cors())
app.use(express.json())

app.get('/api/v1', (req, res) => {
    console.log("yeah, round robin")
    res.send('<h2>A Quite Place with you</h2>')
})
app.use("/api/v1/posts", postRouter)
app.use('/api/v1/users', userRoute)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

// This is a contractual job for 3-4 months. Tenure can be increased. 