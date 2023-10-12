import express, { Application } from "express"
import cors from "cors"
import morgan from "morgan"
import { config } from "dotenv"
import blogRouter from "./routes"

config()
const server: Application = express()
const PORT = process.env.PORT

server.use(morgan("dev"))
server.use(cors({
    origin: true,
    credentials: true,
  }))
server.use(express.json())

server.use("/api/v1/blogs", blogRouter)

server.listen(PORT, () => {
    console.log(`[server] server listening on port ${PORT}`)
})

export default server