'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

import getTrackingById from "@/app/actions/getTrackingById";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  trackingId: string;
}

const Tracking= async({ params }: { params: IParams }) => {
    const router = useRouter();
  const tracking = await getTrackingById(params.trackingId);
  // const currentUser = await getCurrentUser();
     
  // if(!tracking) {
  //     return <div>Tracking not found</div>
  // }

  function getWeatherAndTime() {
    const date = new Date();
    
    const hours = date.getHours();
    const minutes = date.getMinutes();
  
    const time = `${hours}:${minutes}`;
  
    const month = date.getMonth();
  
    let weather;
    if (month >= 0 && month < 3 || month === 11) {
      weather = 'spring';
    } else if (month >= 3 && month < 6) {
      weather = 'summer'; 
    } else if (month >= 6 && month < 9) {
      weather = 'autumn';
    } else if (month >= 9 && month < 12) {
      weather = 'winter';
    }
  
    return weather;
  }

  function getCurrentTime(){
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const time = `${hours}:${minutes}`;
    return time;
  }
  function getDate(){
    const date = new Date();
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();
    const dateStr = `${day}/${month}/${year}`;
    return dateStr;
  }
  // const [time, setTime] = useState(getCurrentTime());
  // const [weather, setWeather] = useState(getWeatherAndTime());
  // const [date, setDate] = useState(getDate());


  


    return (
    
      
      <div className="border-t-2 mt-6 ">
      {/* weather and time at the current div */}
          <div className="bg-[#64BC73]/20 p-3 w-[20%] flex flex-col items-center justify-center mt-7 rounded-xl ml-[75%]">
                    {/* <p className="text-xl font-bold">Weather : {weather}</p>
                    <p className=" text-xl font-bold">Time : {time}</p> */}
            
          </div>
          {/* content of plant  */}
         
 <div className="flex flex-row gap-16 justify-center items-center m-4">
 {/* image */}
    <div className="flex flex-col gap-7 justify-center items-center">
       
         <Image width={420} height={260} className="rounded-2xl" src="https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="img" />
         <div className=" bg-green-400 rounded-xl px-9 py-3 text-xl text-white font-bold">{} ???</div>
    </div>
 {/* content, informatin of plants */}
    <div className="flex flex-col justify-center items-start gap-8">
       <div className="flex flex-row items-center gap-3">
         <Image width={30} height={30} src="/iconsPlant/calenderIcon.png" alt="calender" />
         <a className="font-bold text-3xl">Ngày trồng: </a>
         <a className=" text-3xl">{}</a>
       </div>
       <div className="flex flex-col justify-start items-start gap-3">
         <div className="flex flex-row">
         <Image width={30} height={30} className="mr-3" src="/iconsPlant/featureIcon.png" alt="calender" />
         <a className="font-bold text-3xl"> Đặc điểm </a>
         </div>
        
         <a className="ml-8 text-3xl">Cao : 1m4 <br/> Loại lá : Lá đơn <br/> Thời gian trồng phù hợp: Mùa thu</a>
       </div>
       <div className="flex flex-row items-center gap-3">
         <Image width={30} height={30} src="/iconsPlant/leafIcon.png" alt="calender" />
         <a className="font-bold text-3xl">Tình trạng: </a>
         <a className=" text-3xl">Phát triển tốt</a>
       </div>
       <div className="flex flex-row items-center gap-3">
         <Image width={30} height={30} src="/iconsPlant/appleIcon.png" alt="calender" />
         <a className="font-bold text-3xl">Chất lượng quả: </a>
         <a className=" text-3xl">Tốt</a>
       </div>
       <div className="flex flex-col justify-start items-start gap-3">
         <div className="flex flex-row">
         <Image width={30} height={30} className="mr-3" src="/iconsPlant/featureIcon.png" alt="calender" />
         <a className="font-bold text-3xl"> Yêu cầu chăm sóc </a>
         </div>
        
         <a className="ml-8 text-3xl">Tiếp tục kế hoạch bón phân tưới nước như thường ngày</a>
       </div>
       <Link key="id" href="/conversation" className="bg-orange-300 rounded-xl px-14 text-xl font-medium cursor-pointer transition duration-150 hover:bg-green-300 py-4 flex items-center justify-center ">Trợ giúp cây trồng</Link>


    </div>
</div>
      
         

    </div>
    )
  }

  export default Tracking;