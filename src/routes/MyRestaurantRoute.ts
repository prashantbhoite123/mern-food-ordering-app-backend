import express from "express"
import multer from "multer"
import MyRestaurantController from "../controller/MyRestaurantController"
import { jwtCheck, jwtParse } from "../middleware/auth"
import { validateMyRestaurantRequest } from "../middleware/validation"

const router = express.Router()

const storage = multer.memoryStorage()
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5mb
  },
})

// /api/my/resturant

router.get(
  "/order",
  jwtCheck,
  jwtParse,
  MyRestaurantController.getMyRestaurantOrders
)

router.patch(
  "/order/:orderId/status",
  jwtCheck,
  jwtParse,
  MyRestaurantController.updateOrderStatus
)
router.get("/", jwtCheck, jwtParse, MyRestaurantController.getRestaurant)

router.post(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  MyRestaurantController.createMyRestaturant
)

router.put(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  MyRestaurantController.updateMyRestaurant
)

export default router
