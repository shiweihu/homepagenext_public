'use client'

import { motion,useInView } from "framer-motion";
import { useRef } from 'react';
export function SkillsView({text}:{text:string}){
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    return (
        <motion.p 
      ref={ref}
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: isInView ? 0 : 50, opacity: isInView ? 1 : 0 }}
      transition={{ type: "spring", duration: 1 }}
      className=" font-semibold "
    >
            {text}
        </motion.p>
    );

}