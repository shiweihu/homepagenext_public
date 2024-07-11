'use server'
import {signedUrl,ReadMyInfo} from "@/lib/awslib";

export async function generateSignedUrl (objectKey: string,revalidate:number)  {
    return signedUrl(objectKey,revalidate)
};

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