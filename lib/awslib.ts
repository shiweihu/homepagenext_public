
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { DynamoDB } from '@aws-sdk/client-dynamodb';

import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
//import { revalidate } from '@/app/page';


// AWS SDK 将自动读取 ~/.aws/credentials 和 ~/.aws/config 中的配置
// JS SDK v3 does not support global configuration.
// Codemod has attempted to pass values to each service client in this file.
// You may need to update clients outside of this file, if they use global config.
//AWS.config.update({region:'ap-southeast-2'});

console.debug("awslib S3_BUCKETNAME",process.env.S3_BUCKETNAME)
console.debug("awslib ACCESS_KEY_ID",process.env.ACCESS_KEY_ID)
console.debug("awslib SECRET_ACCESS_KEY",process.env.SECRET_ACCESS_KEY)


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

  console.debug("ReadMyInfo S3_BUCKETNAME",process.env.S3_BUCKETNAME)
  console.debug("ReadMyInfo MYINFO_KEY",process.env.MYINFO_KEY)
    
    const commond = new GetObjectCommand({ 
      Bucket:process.env.S3_BUCKETNAME,
      Key:process.env.MYINFO_KEY
    })
    return s3.send(commond)
}

function signedUrl(objKey:string){
  console.debug("signedUrl S3_BUCKETNAME",process.env.S3_BUCKETNAME)
    const commond = new GetObjectCommand({ 
        Bucket:process.env.S3_BUCKETNAME,
        Key:objKey
    })
    return getSignedUrl(s3,commond,{expiresIn:3600})
}





export {dynamodb,signedUrl,ReadMyInfo};
