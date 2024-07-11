'use server'

import { BasicInformation } from "@/dataModel/basicInformation";
import { Certification } from "@/dataModel/certifications";
import {dynamodb} from "@/lib/awslib";
import { cache } from 'react'
import { generateSignedUrl } from "./buketAction";
import { Education } from "@/dataModel/educations";
import { Skills } from "@/dataModel/skills";

export const getBasicInformation = cache(async ()=>{
    const params = {
        TableName: 'baseInformation',
        Key: {
          'name': 'Shiwei Hu' // 替换为你的主键和值
        }
      };
      return (await dynamodb.get(params)).Item as BasicInformation;
})

export const getSkills = cache( async (name:string)=>{
  const params = {
    TableName: 'skills_table',
    KeyConditionExpression: '#pk = :pkValue',
    ExpressionAttributeNames: {
      '#pk': 'name', 
    },
    ExpressionAttributeValues: {
      ':pkValue': name,
    },
  };
  
  return (await dynamodb.query(params)).Items as Skills[];
  
})

export async function getEducations(name:string){ 
  const params = {
      TableName: 'educations_table',
      KeyConditionExpression: '#pk = :pkValue',
      ExpressionAttributeNames: {
        '#pk': 'name', 
      },
      ExpressionAttributeValues: {
        ':pkValue': name,
      },
    };
    const educations =  (await dynamodb.query(params)).Items as Education[] ;
    educations.forEach(async (item)=>{
      item.image_signUrl = await generateSignedUrl(item.uni_icon_key)
    })
    return educations
}


export async function getCertifications(name:string) {
  const params = {
    TableName: 'certification_table',
    KeyConditionExpression: '#pk = :pkValue',
    ExpressionAttributeNames: {
      '#pk': 'name', 
    },
    ExpressionAttributeValues: {
      ':pkValue': name,
    },
  };
  const certifications =  (await // The `.promise()` call might be on an JS SDK v2 client API.
  // If yes, please remove .promise(). If not, remove this comment.
  dynamodb.query(params)).Items as Certification[] ;
  certifications.forEach(async (item)=>{
    item.image_signUrl = await generateSignedUrl(item.objectKey)
  })
  return certifications
}