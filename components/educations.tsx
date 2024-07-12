'use client'
import { getEducations } from "@/actions/dbaction";
import { UniversityView } from "./UniversityView";
import { Education } from "@/dataModel/educations";
import { Suspense,useEffect,useState } from "react";


export default function Educations({name}:{name:string}){

   

    const [educations,setEducations] = useState<Education[]>([]);

    useEffect(()=>{
        const fetchEducationData = async ()=>{
           setEducations(await getEducations(name))
        }
        fetchEducationData()
    },[])
    

    return (
        <div className=" flex flex-col bg-white items-center ">
            <h1 className=" font-bold text-4xl mt-2">EDUCATION</h1>
            <Suspense fallback={<p>Loading</p>}>
                <UniversityView educations={educations} />
            </Suspense>
        </div>
    
    );
}