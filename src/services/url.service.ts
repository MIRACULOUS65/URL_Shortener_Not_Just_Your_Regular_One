import { createUrl, findByCode, findByUserId } from "../repositories/url.repository.js";
import { generateCode } from "../utils/generateCode.js";


export async function shortenUrl(
    originalUrl: string,
    userId: number
){
    if(!originalUrl){
        throw new Error("url is required");
    }

    let code =generateCode();

    let existing = await findByCode(code);

    while(existing){
        code = generateCode();
        existing = await findByCode(code);
    } // for double check if the newly generated even exists

    const url =  await createUrl (code,originalUrl,userId);

    return{
        id:url.id,
        code:url.code,
        shortUrl:`http://localhost:3000/${url.code}`
    };
}

export async function resolveUrl(code:string){
    const url = await findByCode(code);

    if(!url){
        return null;
    }

    return url.originalUrl;
}

export async function getUserUrls(userId: number) {
    return await findByUserId(userId);
}