import { Response, Request } from "express"
import { Restaurant } from "../model/restaurant"
import cloudinary from "cloudinary"
import mongoose from "mongoose"

const createMyRestaturant = async (req: Request, res: Response) => {
  try {
    const existingRestaurant = await Restaurant.findOne({ user: req.userId })
    if (existingRestaurant) {
      return res.status(409).json({ message: "User Restaurant already exist" })
    }

    const image = req.file as Express.Multer.File

    const base64Image = Buffer.from(image.buffer).toString("base64")

    const dataURI = `data:${image.mimetype};base64,${base64Image}`

    const uploadResponce = await cloudinary.v2.uploader.upload(dataURI)

    const restaurant = new Restaurant(req.body)

    restaurant.imageUrl = uploadResponce.url

    restaurant.user = new mongoose.Types.ObjectId(req.userId)

    restaurant.lastUpdated = new Date()

    await restaurant.save()

    res.status(200).json(restaurant)
    
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong" })
  }
}

export default {
  createMyRestaturant,
}
