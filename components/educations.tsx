
import { getEducations } from "@/actions/dbaction";
import { UniversityView } from "./UniversityView";
import { Education } from "@/dataModel/educations";

export default async function Educations({name}:{name:string}){

    const educations = await getEducations(name)

    
    return (
        <div className=" flex flex-col bg-white items-center ">
            <h1 className=" font-bold text-4xl mt-2">Education</h1>
            <UniversityView educations={educations} />
        </div>
    
    );
}