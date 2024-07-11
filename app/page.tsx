


import { getBasicInformation } from "@/actions/dbaction";
import { AboutMe } from "@/components/aboutme";
import  ChatBotView  from "@/components/chatBot";
import { FirstView } from "@/components/firstView";
import { SupportView } from "@/components/SupportView";
import { TopNav } from "@/components/topNav";
import { BasicInformation } from "@/dataModel/basicInformation";
import dynamic from 'next/dynamic'

//import { useEffect, useState } from "react";

// Client Components:
const SkillsComponent = dynamic(() => import('@/components/skillsComponent'))
const CertificationComponent = dynamic(() => import('@/components/certifications'))
const EducationsComponent = dynamic(() => import('@/components/educations'))

//export const revalidate = 3600

export default async function Home() {

  const basicInformation = await getBasicInformation()
  


  return (
    <div className=" bg-slate-50 w-screen">
      
         <main className="w-full static">
         <div className=" sticky top-0 z-50 ">
            <TopNav />
         </div>
         <div className="flex flex-col w-full z-0">
              <div className="w-full h-screen bg-[#FFC0CB]">
                <FirstView basicInfo={basicInformation} />
              </div>
              <div id="About Me" className=" ">
                 <AboutMe basicInfo={basicInformation}/>
              </div>
              <div id="Education">
                <EducationsComponent name={basicInformation.name} />
              </div>
              <div id="Skills">
                 <SkillsComponent name ={basicInformation.name}  />
              </div>
              <div id="Certification">
                 <CertificationComponent name ={basicInformation.name}/>
              </div>
              <div>
                 <SupportView />
              </div>
        </div>
        <div className=" fixed bottom-10 right-4 z-50  ">
          <ChatBotView />
        </div>
      </main>
      
    </div>
  );
}
