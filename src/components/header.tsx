import Link from "next/link"
import headerNavLinks from "../../data/headerNavLinks"
import siteMetadata from "../../data/siteMetadata"
import Logo from "../../public/logo.png"
import { Transition } from "@headlessui/react"
import { useRouter } from "next/navigation"
import { HomeIcon, UserIcon } from '@heroicons/react/24/outline'
import {useState} from 'react'

export default function HeaderGlobal() {
  const [isShowing, setIsShowing] = useState(false);
  const router = useRouter();
    return (
       <header className="flex justify-around py-3 mx-40">
               {/* for logo */}
               <div
                className=""
               >
              <img src="./logo.png" className="md:h-[150px] md:w-[150px]" />

               </div>
               {/* for nav */}
               <div className="flex flex-row justify-center items-center gap-14">
         




     <HomeIcon className="md:h-8 md:w-8  hover:cursor-pointer hover:text-[#00D023] transition hover:scale-110" />
        <a className="text-2xl font-medium hover:cursor-pointer hover:text-[#00D023] transition hover:scale-110">How it work ?</a>
          <a className="text-2xl font-medium hover:cursor-pointer hover:text-[#00D023] transition hover:scale-110">Our teams</a>
          <a className="text-2xl font-medium hover:cursor-pointer hover:text-[#00D023] transition hover:scale-110">Blog</a>
          <a className="text-2xl font-medium hover:cursor-pointer hover:text-[#00D023] transition hover:scale-110">Your diary</a>
          <a onClick={()=>{
            router.push("/authen")
          }} className="text-2xl font-medium hover:cursor-pointer hover:text-[#00D023] transition hover:scale-110 flex flex-row items-center justify-center gap-3">
            Log in 
          <UserIcon className="md:h-8 md:w-8  " />
          </a>
   
         

  
               </div>
    
    </header>
     



    )
}

