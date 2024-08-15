import { NextFunction, Request, Response } from "express"
import { auth } from "express-oauth2-jwt-bearer"
import jwt from "jsonwebtoken"
import User from "../model/user"

// Extending Express Request interface
declare global {
  namespace Express {
    interface Request {
      userId: string
      auth0Id: string
    }
  }
}

// Middleware to check JWT token
export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
})

export const jwtParse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers

  // Check if authorization header exists and starts with "Bearer "
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.sendStatus(401)
  }

  const token = authorization.split(" ")[1]

  try {
    // Decode the token and extract auth0Id
    const decode = jwt.decode(token) as jwt.JwtPayload
    const auth0Id = decode.sub

    // Find the user based on auth0Id
    const user = await User.findOne({ auth0Id })

    if (!user) {
      return res.sendStatus(401)
    }

    req.auth0Id = auth0Id as string
    req.userId = user._id.toString()

    next() // Call next middleware
  } catch (error) {
    return res.sendStatus(401)
  }
}
