import bcrypt from "bcryptjs"
import { createUser, findUserByEmail } from "../repositories/user.repository.js";
import { generateToken } from "../lib/jwt.js";


export async function registerUser(
    email:string,
    password:string
){
    if(!email || !password){
        throw new Error("email and password required");
    }

    const existingUser = await findUserByEmail(email);

    if(existingUser){
        throw new Error("user already exists");
    }

    const passwordHash = await bcrypt.hash(password,12);

    const user = await createUser(
        email,
        passwordHash
    );

    const token = generateToken(user.id);

    return {
        user:{
            id:user.id,
            email:user.email
        },
        token
    };
}


export async function loginUser(
    email:string,
    password:string
){
    if(!email || !password){
        throw new Error("email and password required");
    }

    const user = await findUserByEmail(email);

    if(!user){
        throw new Error("user doesn't exist");
    }

    const passwordMatches= await bcrypt.compare(
        password,
        user.password
    )

    if(!passwordMatches){
        throw new Error("Wrong pass");
    }

    const token = generateToken(user.id);

    return {
        user:{
            id:user.id,
            email:user.email
        },
        token
    };
}