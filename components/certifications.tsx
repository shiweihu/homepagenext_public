'use client'
import { getCertifications } from "@/actions/dbaction";
import { BasicInformation } from "@/dataModel/basicInformation";
import { BadgeViews } from "./badgeViews";
import { Certification } from "@/dataModel/certifications";
import { Suspense ,useEffect,useState} from "react";


export default function Certifications({name}:{name:string}) {


    const [certifications,setCertifications] = useState<Certification[]>([])

    useEffect(()=>{
        const fetchCertificationData = async ()=>{
            setCertifications(await getCertifications(name))
        }
        fetchCertificationData()
    },[])
    


    return (
        <div className="w-full bg-white flex flex-col justify-center items-center ">
            <h1 className=" font-bold text-4xl mt-2">CERTIFICATIONS</h1>
            <Suspense fallback={<p>Loading</p>}>
                <div className="w-3/5 py-10" >
                    <BadgeViews certifications={certifications} />
                </div>
            </Suspense>
        </div>
    );
    
}