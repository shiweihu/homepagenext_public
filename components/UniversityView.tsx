'use client'

import { Education } from "@/dataModel/educations";
import Image from 'next/image'
import { motion,useInView } from "framer-motion";
import { useRef } from 'react';

export function UniversityView({educations}:{educations:Education[]}){

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    educations.forEach((item)=>{
        console.debug("UniversityView image url",item.image_signUrl)
    })

    return (
        <div ref={ref} className="flex flex-row justify-center">
            {
                educations.map((item,index)=>(
                    
                    <motion.div key={index}  initial={{ x:  1000 }} animate={{x: isInView ? 0 : 1000 }}
                                transition={{ type: "spring" ,duration: 1}}   className="flex flex-row justify-center items-center py-32 mx-5 " >
                        <Image  className="mr-2" src = {item.image_signUrl} unoptimized={true} alt={item.Uniname} width={100} height={125} />
                        
                        <div className="flex flex-col">
                            <p className=" font-serif text-2xl ">{item.Uniname}</p>
                            <p className=" font-mono text-base ">{item.degree}</p>
                            <p className=" font-normal italic">{item.period}</p>
                        </div>
                    </motion.div >
                ))
            }
        </div>
    );
}