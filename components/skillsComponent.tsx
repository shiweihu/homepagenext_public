import { getSkills } from "@/actions/dbaction";
import { BasicInformation } from "@/dataModel/basicInformation";
import { SkillsView } from "./skillsView";
import { Skills } from "@/dataModel/skills";
import { Suspense } from "react";

export default async function SkillsComponent({name}:{name:string}){

    const skillList = await getSkills(name)
    return (
        <div className="w-full bg-slate-200 flex flex-col justify-center items-center ">
            <h1 className=" font-bold text-4xl mt-2">SKILLS</h1>
            <Suspense fallback={<p>Loading</p>}>
            <div className="grid grid-cols-4 gap-4 w-2/5 py-36">
                {
                    skillList.map((item,index)=>(
                        <div key={index}>
                        <SkillsView text = {item.skillname} />
                        </div>
                    ))
                }
            </div>
            </Suspense>
        </div>
    );
}