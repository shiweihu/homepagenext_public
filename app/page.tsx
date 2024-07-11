


import { getBasicInformation } from "@/actions/dbaction";
import { AboutMe } from "@/components/aboutme";
import Certifications from "@/components/certifications";
import  ChatBotView  from "@/components/chatBot";
import Educations from "@/components/educations";
import { FirstView } from "@/components/firstView";
import SkillsComponent from "@/components/skillsComponent";
import { SupportView } from "@/components/SupportView";
import { TopNav } from "@/components/topNav";
// import dynamic  from 'next/dynamic' 
// const SkillsComponent = dynamic(() => import('@/components/skillsComponent'))
// const CertificationComponent = dynamic(() => import('@/components/certifications'))
// const EducationsComponent = dynamic(() => import('@/components/educations'))





export default async function Home() {

  const basicInformation = await getBasicInformation()
  //revalidatePath("/")

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
               
                  <Educations name={basicInformation.name} />
                
              </div>
              <div id="Skills">
                
                    <SkillsComponent name ={basicInformation.name}  />
                 
              </div>
              <div id="Certification">
                  
                      <Certifications name ={basicInformation.name}/>
                 
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
