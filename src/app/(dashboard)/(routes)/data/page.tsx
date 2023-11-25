'use client'

import { CldUploadButton, CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";

const DataPage = () => {
   const handleUpload = useCallback(async (result: any) => {
 
   }, []);

    return(
        <div className="w-[95%] flex flex-col justify-center items-center">
          <div className="flex flex-row  items-center gap-44 ">

            <div className="bg-red-300 rounded-2xl p-6 shadow-lg bg-opacity-50 flex flex-row items-center gap-4">
             <div className="flex flex-col justify-start items-center">
                <h1 className="text-xl font-bold">20</h1>
                <p className="text-lg">Your total plants</p>
             </div>
             {/* Image */}
             <div>
                <Image src="/dataPage/plants.png" alt="plant" width={120} height={120}/>

             </div>
            </div>
            <div className="bg-red-300 rounded-2xl p-6 shadow-lg bg-opacity-50 flex flex-row items-center gap-4">
             <div className="flex flex-col justify-start items-center">
                <h1 className="text-xl font-bold">20</h1>
                <p className="text-lg">Your total plants</p>
             </div>
             {/* Image */}
             <div>
                <Image src="/dataPage/plants.png" alt="plant" width={120} height={120}/>

             </div>
            </div>
            <div className="bg-red-300 rounded-2xl p-6 shadow-lg bg-opacity-50 flex flex-row items-center gap-4">
             <div className="flex flex-col justify-start items-center">
                <h1 className="text-xl font-bold">20</h1>
                <p className="text-lg">Your total plants</p>
             </div>
             {/* Image */}
             <div>
                <Image src="/dataPage/plants.png" alt="plant" width={120} height={120}/>

             </div>
            </div>

          </div>
          <CldUploadWidget uploadPreset="hnas71qo">
  {({ open }) => {
    function handleOnClick(e:any) {
      e.preventDefault();
      open();
    }
    return (
      <button className="button" onClick={handleOnClick}>
        Upload an Image
      </button>
    );
  }}
</CldUploadWidget>
        </div>
    )
}

export default DataPage;