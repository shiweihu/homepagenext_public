'use server'
import {signedUrl,ReadMyInfo} from "@/lib/awslib";
import {unstable_cache as nextCache} from 'next/cache'



export async function generateSignedUrl(objectKey: string,revalidateSec:number){
    return signedUrl(objectKey,revalidateSec)
}

export async function readMyInfo(){
    
    try{
        const response = await ReadMyInfo()
        const reader = response.Body!.transformToWebStream().getReader()
        const chunks = [];
        let done, value;
        while (!done) {
            ({ done, value } = await reader.read());
            if (value) {
                chunks.push(value);
            }
        }

        const fileContent = new TextDecoder("utf-8").decode(Buffer.concat(chunks));
        return fileContent
    }catch(error){
        console.error("readMyInfo",error)
        return ""
    }
}