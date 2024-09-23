import express, { Request, Response } from "express"
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose"
import myUserRoute from "./routes/MyUserRoute"
import myRestaurantRoute from "./routes/MyRestaurantRoute"
import restaurantRoute from "./routes/RestaurantRoute"
import orderRoute from "./routes/OrderRoutes"
import { v2 as cloudinary } from "cloudinary"
import bodyParser from "body-parser"

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING as string, {
    dbName: "mern-food-ordering-app",
  })
  .then(() => console.log("Database Connected Successfully"))
  .catch((e) => console.log(`Error while database connection :${e}`))

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }))
app.use(express.json())

app.get("/helth", async (req: Request, res: Response) => {
  res.send({ message: "helth Ok !" })
})

app.use("/api/my/user", myUserRoute)
app.use("/api/my/restaurant", myRestaurantRoute)
app.use("/api/my/restaurant", restaurantRoute)
app.use("/api/order", orderRoute)

app.listen(7000, () => {
  console.log(`Server is Working on http://localhost:7000`)
})
