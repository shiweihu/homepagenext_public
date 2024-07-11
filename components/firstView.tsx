import { BasicInformation } from "@/dataModel/basicInformation";
import { BubbleBackground } from "./bubleBackground";
import { generateSignedUrl } from "@/actions/buketAction";
import { IconButton } from "./iconButton";


export async function FirstView({basicInfo}:{basicInfo:BasicInformation}){

    const resumeUrl = await generateSignedUrl(basicInfo.resume_key,3600)
    return (
        <div className=" absolute top-0 w-full h-full flex items-center justify-center bg-[#FFC0CB]">
            <div className="z-0 ">
                <BubbleBackground />
            </div>
            <div className=" flex flex-col z-20 items-center">
                <h1 className="text-white text-8xl font-bold">{basicInfo.name}</h1>
                <h2 className="text-white text-4xl mt-2">{basicInfo.headLine}</h2>
                <div className="flex flex-row w-72 justify-between mt-5 ">
                    <IconButton bgColor="bg-[#90EE90]" icon="/cv_icon.png" text="Resume" url={resumeUrl} />
                    <IconButton bgColor="bg-[#ADD8E6]" icon="/github_icon.png" text="Github" url={basicInfo.github} />
                </div>
            </div>
        </div>
    );

}