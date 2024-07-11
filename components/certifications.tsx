import { getCertifications } from "@/actions/dbaction";
import { BasicInformation } from "@/dataModel/basicInformation";
import { BadgeViews } from "./badgeViews";
import { Certification } from "@/dataModel/certifications";


export default async function Certifications({name}:{name:string}) {

    const certifications = await getCertifications(name)
    return (
        <div className="w-full bg-white flex flex-col justify-center items-center ">
            <h1 className=" font-bold text-4xl mt-2">Certifications</h1>
            <div className="w-3/5 py-10" >
                <BadgeViews certifications={certifications} />
            </div>
        </div>
    );
    
}