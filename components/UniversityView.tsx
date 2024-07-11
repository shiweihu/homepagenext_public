'use client'

import { Education } from "@/dataModel/educations";
import Image from 'next/image'
import { motion,useInView } from "framer-motion";
import { useRef } from 'react';

export function UniversityView({educations}:{educations:Education[]}){

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <div ref={ref} className="flex flex-row justify-center">
            {
                educations.map((item,index)=>(
                    <motion.div key={index}  initial={{ x:  2000 }} animate={{x: isInView ? 0 : 2000 }}
                                transition={{ type: "spring" ,duration: 1}}   className="flex flex-row justify-center items-center py-32 mx-5 " >
                        <Image  className="mr-2" src = {item.image_signUrl} alt={item.Uniname} width={50} height={75} />
                        <div className="flex flex-col">
                            <p className=" font-serif text-lg ">{item.Uniname}</p>
                            <p className=" font-thin italic">{item.period}</p>
                        </div>
                    </motion.div >
                ))
            }
        </div>
    );
}