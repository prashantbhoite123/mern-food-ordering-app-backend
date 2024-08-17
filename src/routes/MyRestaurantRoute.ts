import express from "express"
import multer from "multer"
import MyRestaurantController from "../controller/MyRestaurantController"

const router = express.Router()

const storage = multer.memoryStorage()
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, //10mb
  },
})

// /api/my/resturant

router.post(
  "/",
  upload.single("imageFile"),
  MyRestaurantController.createMyRestaturant
)

export default router
