'use client'

import Image from "next/image";


export function IconButton({icon,url,text,bgColor}:{icon:string,url:string,text:string,bgColor:string}){

    function handleOpenResume(){
        window.open(url, '_blank');
    }
    return (
        <button  onClick={handleOpenResume} className={`px-5 py-3 rounded-lg my-auto shadow-md hover:scale-105  ${bgColor}`} >
            <div className="flex flex-row">
                <Image className=" mr-3 " src={icon} alt="resume" width={25} height={20} />
                <p className="text-gray-600">{text}</p>
            </div>
        </button>
    );
}