'use client'

import { Certification } from "@/dataModel/certifications";
import { BadgeImage } from "./Badge";
import { motion,useInView } from "framer-motion";
import { useRef } from 'react';

export function BadgeViews({certifications}:{certifications:Certification[]}){

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <div ref={ref}  className=" flex flex-row justify-between items-center w-full">
            {certifications.map((item,index)=>(
                <motion.div key={index} initial={{ x: index%2 === 0 ? -100 : 100 }} animate={{x: isInView ? 0 : index%2 === 0 ? -100 : 100 }}
                transition={{ type: "spring" ,duration: 2}}  className="flex flex-col justify-center items-center ">
                    <BadgeImage key={index} imageUrl={item.image_signUrl} alt={item.certificationName} url = {item.url} />
                    <p className=" font-semibold ">{item.certificationName}</p>
                </motion.div >
            ))}
        </div>
    );
}