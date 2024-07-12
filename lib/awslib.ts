
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { DynamoDB } from '@aws-sdk/client-dynamodb';

import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
//import { revalidate } from '@/app/page';



const config = {
  region:'ap-southeast-2',
  credentials:{
    accessKeyId:process.env.ACCESS_KEY_ID!,
    secretAccessKey:process.env.SECRET_ACCESS_KEY!
  }
}

const dynamodb = DynamoDBDocument.from(new DynamoDB(config));

const s3 = new S3Client(config)

function ReadMyInfo() {    
    const commond = new GetObjectCommand({ 
      Bucket:process.env.S3_BUCKETNAME,
      Key:process.env.MYINFO_KEY
    })
    return s3.send(commond)
}

function signedUrl(objKey:string,revalidate:number){
    console.debug("signedUrl objKey",objKey)
    const commond = new GetObjectCommand({ 
        Bucket:process.env.S3_BUCKETNAME,
        Key:objKey
    })
    return getSignedUrl(s3,commond,{expiresIn:revalidate+60})
}





export {dynamodb,signedUrl,ReadMyInfo};
