'use client'

import Image from "next/image";
import Link from "next/link";
export default function LinkWithIcon({icon,url}:{icon:string,url:string}){

    return (
        <div className=" flex flex-row "> 
          <Image src={icon} alt="icon" width={20} height={15} />
          <Link className=" ml-1 text-blue-700 " target='_blank' href = {url} rel="noopener noreferrer" >{url} </Link>
        </div>
    );
}