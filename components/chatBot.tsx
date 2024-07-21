'use client'

import askAI from "@/actions/geminiAI";
import Image from "next/image";
import { useState,useRef,useEffect } from "react";
import { marked } from 'marked';



export default function ChatBotView(){

    const [open,setOpen] = useState(false)
    const [message,setMessage] = useState("")
    const [chatList,setChatList] = useState<string[]>([])
    const [isSending,setIsSending] = useState(false)

    async function sendMessageToAI(){
        setIsSending(true)
        const currentMessage = message
        setMessage("")
        setChatList( prevChatList => [...prevChatList,currentMessage] )
        const aiResponse =  await askAI(chatList.slice(-2),currentMessage) ?? "error"
        //console.log("AI response"+aiResponse)
        setChatList( prevChatList => [...prevChatList, aiResponse] )
        setIsSending(false)
    }

    return (
        <div className="relative flex  flex-row-reverse ">
             <div className="flex-none  flex flex-col justify-end  h-full w-auto place-self-end  ">
                <button onClick={()=> setOpen(!open)} className=" hover:scale-105 -mb-5">
                    <Image className="hover:scale-105" src="/chat_bot.png" alt="chat icon" width={50} height={50} />
                </button>
             </div>
             {open && <div style={{height:800, width:700}}>
                <ChatView isSending = {isSending} chatList={chatList} defaultMessage={message} onChange={(value)=>setMessage(value)} onSend={sendMessageToAI} />
                </div>
             }
        </div>
        

    );
}

function ChatView({isSending,chatList,defaultMessage,onChange,onSend}:{isSending:boolean,chatList:string[], defaultMessage:string,onChange:(value:string)=>void,onSend:()=>void}){

    const chatContainerRef = useRef<HTMLDivElement>(null);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        // Ensure the value contains no newlines
        if (!value.includes('\n')) {
            onChange(value);
        }
      };
      useEffect(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }, [chatList]);

        // 监听回车键事件
    const handleKeyPress = (event:React.KeyboardEvent) => {
        if (event.key === 'Enter' && !isSending) {
            onSend();
        }
    };
    

    return (
        <div className="w-full h-full grow   bg-indigo-50 border-2 border-gray-500  p-4 shadow-lg rounded-lg flex flex-col-reverse ">
            <button type="button" tabIndex={0}  disabled={!defaultMessage.trim() || isSending }  onClick={onSend} className={` ${ isSending ? "cursor-progress":"cursor-pointer"  }  px-5 py-3 rounded-lg bg-blue-400  shadow-md hover:scale-105 mt-2 mx-5 `} >
                <p className="text-black ">{isSending?"Sending...":"Send"}</p>
            </button>
            <textarea maxLength={200} rows={3} value={defaultMessage} onKeyDown ={handleKeyPress} onChange={handleChange} placeholder="Ask any questions about me, and the AI assistant will help answer them" 
            className=" min-h-16 p-3 resize-none  caret-blue-100 focus:caret-indigo-500 w-full " />
            <div ref = {chatContainerRef} className=" grow flex flex-col overflow-y-auto mb-3">
            {
                chatList.map((item,index)=>(
                    index %2 === 0 ?
                        <div key={index} className=" w-full flex flex-col mt-2 mb-2">
                            <p className="font-bold">You:</p>
                            <p className="w-full font-mono">{item}</p>
                        </div>
                        :
                        <div key={index} className=" w-full flex flex-col mt-2 mb-2">
                            <p className=" place-self-end font-bold">AI</p>
                            <div className="w-full" dangerouslySetInnerHTML={{__html:marked( item !== 'error' ? item :'error,try it late' )}} ></div>
                        </div>
                ))
            }
            </div>
        </div>
    );
}