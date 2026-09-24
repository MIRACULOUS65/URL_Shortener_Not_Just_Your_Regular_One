import { prisma } from "../db/prisma.js";

export async function createUrl(
    code:string,
    originalUrl:string,
    userId:number
){
    return prisma.url.create({
        data:{
            code,
            originalUrl,
            userId
        }
    });
}

export async function findByCode(code:string){
    return prisma.url.findUnique({
        where:{
            code
        }
    });
}

export async function findByUserId(userId:number){
    return prisma.url.findMany({
        where:{
            userId
        },
        orderBy:{
            createdAt:"desc"
        }
    });
}