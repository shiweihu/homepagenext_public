'use server'

import { BasicInformation } from "@/dataModel/basicInformation";
import { Certification } from "@/dataModel/certifications";
import {dynamodb} from "@/lib/awslib";
import { cache } from 'react'
import { generateSignedUrl } from "./buketAction";
import { Education } from "@/dataModel/educations";
import { Skills } from "@/dataModel/skills";

import { unstable_cache as NextCache} from 'next/cache'

import {revalidateSec} from '@/constant/constant'

export const getBasicInformation = NextCache(async ()=>{
    const params = {
        TableName: 'baseInformation',
        Key: {
          'name': 'Shiwei Hu' 
        }
      };
      return (await dynamodb.get(params)).Item as BasicInformation;
},['getBasicInformation'],{revalidate:revalidateSec})

export const getSkills = NextCache( async (name:string)=>{
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
  
},['getSkills'],{revalidate:revalidateSec})

export const  getEducations = NextCache(async (name:string)=>{
  console.debug("getEducations")
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
    var educations =  (await dynamodb.query(params)).Items as Education[] ;
    educations = await Promise.all(educations.map(async (item)=>{
      item.image_signUrl = await generateSignedUrl(item.uni_icon_key,revalidateSec+60)
      return item
    }))
    return educations
},['getEducations'],{revalidate:revalidateSec})


export  const  getCertifications = NextCache(async (name:string)=>{
  console.debug("getCertifications")
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
  var certifications =  (await dynamodb.query(params)).Items as Certification[] ;
  certifications = await Promise.all(certifications.map(async (item)=>{
    item.image_signUrl = await generateSignedUrl(item.objectKey,revalidateSec+60)
    return item
  }))
  return certifications
},['getCertifications'],{revalidate:revalidateSec})