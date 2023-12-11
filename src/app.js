
import express from "express"
import cors from "cors"
import { RESPONSE_LIMIT } from "./constants.js"
import coookieParser from 'cookie-parser'

const app = express()

app.use(cors(
    { origin: process.env.CORS_ORIGIN, }
))

app.use(express.json({ limit: RESPONSE_LIMIT }))
app.use(express.urlencoded({ extended: true, limit: RESPONSE_LIMIT }))
app.use(express.static("public"))
app.use(coookieParser())


import userRouter from "./routes/user.routes.js"

app.use('/api/v1/user', userRouter)

export { app }