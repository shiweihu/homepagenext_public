'use client'

import { useEffect, useState } from "react";


export function TopNav(){

    const tags = ["About Me","Education","Skills","Certification"]

    const [scrollY, setScrollY] = useState(0);

    const handleScroll = () => {
        setScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    function scrollTo(index:number){
        document.getElementById(tags[index])?.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div className={`h-16 w-full flex flex-row justify-center ${scrollY > 500 ? "bg-black opacity-85":""}`}>
            <div className="  flex flex-row justify-center items-center ">
            {
                tags.map((item,index)=>(
                    <button key={index} onClick={()=>scrollTo(index)}  className=" mx-2 "><p className=" text-white font-bold ">{item}</p></button>
                ))
             }
            </div>
        </div>
    );
}