'use server'
/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
// import { readFileSync } from 'fs';
// import path from 'path';
import {readMyInfo} from "@/actions/buketAction";
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey!);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 1024,
    responseMimeType: "text/plain",
  };

 var myBasicInfo = ""
  
 export default async function askAI(chatHistory:string[],newMessage:string) {
    console.debug("askAI GEMINI_API_KEY",process.env.GEMINI_API_KEY)
    if(myBasicInfo.length === 0){
      myBasicInfo = await readMyInfo() 
    }

    const history = [
        {
          role: "user",
          parts: [
            {text: "You will act as my assistant and answer questions from my employer. Please respond in the first person, as if you are me.this is my personal information:"},
            {text: myBasicInfo},
            {text: "Please answer questions about me, and refuse to answer any questions that do not concern me."}
          ],
        },
        {
          role: "model",
          parts: [
            {text: "OK"},
          ],
        },
      ]

      const chatHistoryArr = chatHistory.map((value,index)=>{
        if(index % 2 == 0){
          return {
              role: "user",
              parts: [
                {text: value},
              ],
          }
       }else{
         return {
              role: "model",
              parts: [
                {text: value},
              ],
          }
       }
    })
    history.push(...chatHistoryArr)
    const chatSession = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: history,
    });
    
  
    return  (await chatSession.sendMessage(newMessage)).response.text();
  
    
  }
  
 