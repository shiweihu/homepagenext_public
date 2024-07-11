import Image from "next/image";

export function InformationWithIcon({icon,text}:{icon:string,text:string}){

    return (
        <div className=" flex flex-row "> 
          <Image src={icon} alt="icon" width={20} height={15} />
          <p className=" ml-1 ">{text}</p>
        </div>
    );
}