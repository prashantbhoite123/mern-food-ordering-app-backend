import { Response, Request } from "express"
import { Restaurant } from "../model/restaurant"
import cloudinary from "cloudinary"
import mongoose from "mongoose"

const getRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId })

    if (!restaurant) {
      return res.status(404).json({ message: "restaurant not found" })
    }

    res.json(restaurant)
  } catch (error) {
    console.log(`Error While getRestaurant Api :${error}`)
  }
}

const createMyRestaturant = async (req: Request, res: Response) => {
  try {
    const existingRestaurant = await Restaurant.findOne({ user: req.userId })

    if (existingRestaurant) {
      return res.status(409).json({ message: "User Restaurant already exist" })
    }

    if (!req.file) {
      return res.status(400).json({ message: "image file is required" })
    }

    const imageUrl = await uploadImage(req.file as Express.Multer.File)

    const restaurant = new Restaurant(req.body)

    restaurant.imageUrl = imageUrl

    restaurant.user = new mongoose.Types.ObjectId(req.userId)

    restaurant.lastUpdated = new Date()

    await restaurant.save()

    res.status(200).json(restaurant)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong" })
  }
}

const uploadImage = async (file: Express.Multer.File) => {
  const image = file
  const base64Image = Buffer.from(image.buffer).toString("base64")
  const dataURI = `data:${image.mimetype};base64,${base64Image}`

  const uploadResponse = await cloudinary.v2.uploader.upload(dataURI)

  return uploadResponse.url
}

export default {
  createMyRestaturant,

  getRestaurant,
}
