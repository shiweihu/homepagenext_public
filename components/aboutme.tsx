'use client'


import { BasicInformation } from "@/dataModel/basicInformation";
import { InformationWithIcon } from "./InformationWithIcon";
import { motion,useInView } from "framer-motion";
import { useRef } from 'react';
import LinkWithIcon from "./linkWithIcon";


export function AboutMe({basicInfo}:{basicInfo: BasicInformation}){


    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const descriptionLines = basicInfo.description.split('\n');


    return(
        <div ref={ref}  className=" flex justify-center item.length >0 ? s-center bg-slate-200 ">
            <motion.div  initial={{ x: - 2000 }} animate={{x: isInView ? 0 : -2000 }}
                        transition={{ type: "spring" ,duration: 2}} 
                        className=" flex flex-col w-1/2  py-32 ">
                <p className=" font-bold text-2xl ">About Me</p>
                {
                    descriptionLines.map((item,index)=>(
                        item.length>0 ? <p key={index} className="  break-normal text-sm font-serif ">{item}</p> : <br key={index}/>
                    ))
                }
                <p className=" font-bold text-2xl mt-5 ">Contact Details</p>
                <div className="flex flex-col justify-between ">
                    <span className="h-2"/>
                    <InformationWithIcon icon="/telephone_icon.png" text={basicInfo.phone}/>
                    <span className="h-2"/>
                    <InformationWithIcon icon="/email_icon.png" text={basicInfo.email}/>
                    <span className="h-2"/>
                    <InformationWithIcon icon="/address_icon.png" text={basicInfo.address}/>
                    <span className="h-2"/>
                    <LinkWithIcon icon="/linkedin_icon.png" url={basicInfo.linkedin}/>
                    <span className="h-2"/>
                    <LinkWithIcon icon="/seek_icon.jpg" url={basicInfo.seek}/>
                </div>
            </motion.div >
        </div>
    );
}