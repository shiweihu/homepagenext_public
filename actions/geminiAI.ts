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
    model: "gemini-1.5-flash",
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
            {text: "You will act as my assistant and answer questions from my employer. Please respond in the first person, as if you are me.below is my personal information:\n"},
            {text: myBasicInfo},
            {text: "\nPlease answer questions about me, and refuse to answer any questions that do not concern me."},
            {text:"\nMy resume summary should be positive and aim to enhance HR impression of me."}
          ],
        },
        {
          role: "model",
          parts: [
            {text: "OK"},
          ],
        },
      ]

  
      var i = 0
      while(i !== chatHistory.length){
          if (chatHistory[i] === 'error' && i > 0 && i%2 === 1) {
              chatHistory.splice(i-1,2)
              i=0
              continue
          }
          i++
      }


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
    
    try{
      return  (await chatSession.sendMessage(newMessage)).response.text();
    }catch(e){
      console.error("askAI error",e)
      return "error"
    }
  
    
  
    
  }
  
 