import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface JwtUser {
  userId: number;
  role: string;
  iat?: number;
  exp?: number;
}

export interface AuthRequest extends Request {
  user?: JwtUser;
}

const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtUser;

    req.user = decoded;

    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default authenticate;