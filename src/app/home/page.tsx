'use client'

import HeaderGlobal from "@/components/header";
import Switches from "@/components/switch";



export default function LandingPage(){
   return(
    <div className="flex flex-col  w-full ">
         {/* header */}
         <HeaderGlobal/>
{/* Content */}
<div className="mx-auto flex flex-row justify-between items-center mt-8 gap-4">
        {/* text */}
        <div className="md:w-[330px] flex flex-col gap-28">
            <a className="text-5xl font-medium tracking-wide">The Modern Algricuture Techiniques</a>
            <a className="text-xl font-normal">Be a good farmer for a better environment, better Earth !</a>
           {/* create a button with the text: "Let's follow your plants " */}
              <div className="flex flex-row gap-4 items-center justify-center">
                <button className="bg-[#F9A826] text-white rounded-lg px-10 py-5 text-lg hover:scale-125 duration-300 ease-in-out font-medium">Let's follow your plants</button>
            </div>
           
    

        </div>
        {/* img */}
        <div >
    <img className="md:w-[800px] md:h-[600px] rounded-lg" src="./farmerbg.png" alt="logo"/>
        </div>
</div>
        
    </div>
   )
}



