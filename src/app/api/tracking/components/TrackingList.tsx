// 'use client'

// import { Tracking } from "@prisma/client"
// import { useRouter } from "next/navigation"
// import { useSession } from "next-auth/react"
// import React, { useEffect, useMemo, useState } from "react"

// import  useTracking  from "@/hooks/useTracking"

// import { FullTrackingType } from "@/types"

// interface TrackingListProps {
//     initialItems : FullTrackingType[]
//     namePlant?:string
// }

// const TrackingList: React.FC<TrackingListProps> = ({
//     initialItems,
// }) =>{
//     const [items, setItems] = useState(initialItems)
//     const router = useRouter()
//     const session = useSession()
    
//     return (
//         <div key={tracking.id} onClick={()=>{
//           router.push(`/tracking/${tracking.id}`)
//         }} className="w-[90%] cursor-pointer hover:bg-slate-100  px-5 py-6 flex flex-row">

//           <div className="w-[40%]  flex flex-row items-center  text-xl text-gray-400 ">
//             <div className="flex gap-8 flex-row justify-start items-center">
//               <div className=" rounded-full bg-orange-300">
//                 {/* this is image include the div */}
//                 <Image className="rounded-full " src={tracking.imagePlant} alt="this is example" width={120} height={120} />
//               </div>
//               <div>
//                 <h1 className="text-xl font-bold text-black" >{tracking.namePlant}  </h1>
//                 <h2 className="text-lg font-medium text-gray-400">{ }</h2>

//               </div>
//               {/* <ChevronDown/> */}
//             </div>
//           </div>
//           <div className="w-[20%] flex flex-row items-center  text-xl text-gray-400 ">
//             <div className="flex flex-row justify-start items-center">
//               <h1 >
//                 {new Intl.DateTimeFormat('vi-VN', {
//                   hour: 'numeric',
//                   minute: 'numeric',
//                   second: 'numeric',
//                   timeZone: 'Asia/Ho_Chi_Minh',
//                 }).format(new Date(tracking.createdAt))}
//               </h1>
//               {/* <ChevronDown/> */}
//             </div>
//           </div>
//           <div className="w-[20%] flex flex-row items-center  text-xl text-gray-400 ">
//             <div className="flex flex-row justify-start items-center">
//               <h1 >{tracking.statusPlant}</h1>
//               {/* <ChevronDown/> */}
//             </div>
//           </div>
//           <div className=" flex flex-row items-center  text-xl text-gray-400 ">
//             <div className="flex flex-row justify-start items-center">
//               <h1 >
//                 {tracking.haveDiseasePlant ? 'Yes' : 'No'}
//               </h1>
//               {/* <ChevronDown/> */}
//             </div>
//           </div>
//         </div>
//       )
// }