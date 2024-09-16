import mongoose, { InferSchemaType } from "mongoose"

const menuItemSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    default: () => new mongoose.Types.ObjectId(),
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
})

export type MenuItemsType = InferSchemaType<typeof menuItemSchema>

const resturantSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, rfe: "User" },
  restaurantName: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  deliveryPrice: {
    type: Number,
    required: true,
  },
  estimatedDeliveryTime: {
    type: Number,
    required: true,
  },
  cuisines: [{ type: String, required: true }],
  menuItems: [menuItemSchema],
  imageUrl: { type: String, required: true },

  lastUpdated: { type: Date, required: true },
})

export const Restaurant = mongoose.model("Restaurant", resturantSchema)
