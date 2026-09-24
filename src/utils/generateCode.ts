export function generateCode(length=6):string{

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    let code = "";

    for(let i=0;i<length;i++){
        const randomIndex = Math.floor(
            Math.random() * characters.length
        );

        code+=characters[randomIndex];
    }
    return code;
}