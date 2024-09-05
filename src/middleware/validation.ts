import { NextFunction, Request, Response } from "express"
import { body, validationResult } from "express-validator"

const handelValdationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

export const validateMyUserRequest = [
  body("name").isString().notEmpty().withMessage("Name must be a string"),
  body("addressLine1")
    .isString()
    .notEmpty()
    .withMessage("AddressLine1 must be a string"),
  body("city").isString().notEmpty().withMessage("City must be a string"),
  body("country").isString().notEmpty().withMessage("Country must be a string"),
  handelValdationErrors,
]

// export const validateMyRestaurantRequest = [
//   body("restaurantName").notEmpty().withMessage("Restaurant name is required"),
//   body("city").notEmpty().withMessage("City name is required"),
//   body("country").notEmpty().withMessage("Country name is required"),
//   body("deliveryPrice")
//     .isFloat({ min: 0 })
//     .withMessage("Delivary price must be a positive number"),
//   body("estimatedDeliveryTime")
//     .isInt({ min: 0 })
//     .withMessage("EstimatedDelivery time must be a positive integar"),
//   body("cuisines")
//     .isArray()
//     .withMessage("Cuisines must be an array")
//     .not()
//     .isEmpty()
//     .withMessage("Cuisines array cannot be empty"),
//   body("menuItem").isArray().withMessage("Menu items must be an array"),
//   body("menuItem.*.name")
//     .isFloat({ min: 0 })
//     .withMessage("Menu Item name is required"),
//   handelValdationErrors,
// ]

export const validateMyRestaurantRequest = [
  body("restaurantName").notEmpty().withMessage("Restaurant name is required"),
  body("city").notEmpty().withMessage("City is required"),
  body("country").notEmpty().withMessage("Country is required"),
  body("deliveryPrice")
    .isFloat({ min: 0 })
    .withMessage("Delivery price must be a positive number"),
  body("estimatedDeliveryTime")
    .isInt({ min: 0 })
    .withMessage("Estimated delivery time must be a postivie integar"),
  body("cuisines")
    .isArray()
    .withMessage("Cuisines must be an array")
    .not()
    .isEmpty()
    .withMessage("Cuisines array cannot be empty"),
  body("menuItems").isArray().withMessage("Menu items must be an array"),
  body("menuItems.*.name").notEmpty().withMessage("Menu item name is required"),
  body("menuItems.*.price")
    .isFloat({ min: 0 })
    .withMessage("Menu item price is required and must be a postive number"),
  handelValdationErrors,
]
