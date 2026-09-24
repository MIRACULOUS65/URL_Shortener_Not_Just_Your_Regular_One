import jwt from "jsonwebtoken"
import { env } from "../config/env.js";


export interface JwtPayload{
    userId: number;
}

export function generateToken(userId: number): string{
    return jwt.sign(
        { userId },
        env.jwtSecret,
        { expiresIn:"1d"}
    )
}

export function verifyToken(token:string): JwtPayload{
    return jwt.verify(
        token,
        env.jwtSecret
    ) as JwtPayload;
}