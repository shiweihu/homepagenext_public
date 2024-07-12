import Image from "next/image";
import { InformationWithIcon } from "./InformationWithIcon";


export function SupportView(){
    return (
        <div className=" bg-gray-500 flex flex-col justify-center items-center py-5 ">
            <Image src="/nextjs_icon.svg" alt="nextjs icon"  width={50} height={50} />
            <p className="text-slate-100 mt-2" >© Copyright 2024 Shiwei Hu</p>
        </div>
    );
}