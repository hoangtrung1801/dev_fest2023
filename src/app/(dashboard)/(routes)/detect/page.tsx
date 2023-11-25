'use client'
import Button from "@/app/components/Button";
import { useState } from "react";
import { CldImage, CldUploadButton } from 'next-cloudinary';
import Image from "next/image";
import { useSession } from "next-auth/react";
import Custom404 from "../../error";



const DetectPage = () => {

    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            return {
                redirect: {
                    destination: '/#',
                    permanent: false,
                },
            }
        },
    });

    const handleUpload = (result: any) => {
        setFiles(result.info.secure_url)
        //  console.log(files.info.secure_url);
    }
    const resetImage = () => {
        setFiles(null)
    }

    const [isLoading, setIsLoading] = useState(false);
    const [files, setFiles] = useState(null);
    if (status === 'loading') return <Custom404/>
    return (
        < >
        
            <div className="p-10 w-full flex flex-row justify-evenly items-center gap-8">

{/* image picker part */}
                <div className="flex flex-col justify-center items-center gap-8">

                <a className="text-3xl font-semibold">
                    Detect Image | Disease on your plant
                </a>
                <a className="font-medium text-lg text-gray-500">
                    Select your Image from your device to detect !

                </a>

                {/* showing image  */}
                <div>
                    {
                        isLoading ? (
                            <div className=" inset-0 flex items-center justify-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                            </div>
                        ) : (
                            <div>
                                {files && <Image src={files} alt="image" width={500} height={500} />}
                            </div>

                        )
                    }

                </div>


{/* Button upload and reset */}
                <div className="flex flex-row justify-center items-center gap-16 ">


                    <div className="p-3 bg-green-500 rounded-xl text-white font-bold">
                        <CldUploadButton options={{ maxFiles: 1 }} onUpload={handleUpload} uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET} >
                            Upload Image
                        </CldUploadButton>
                    </div>


                    <Button onClick={resetImage} danger  >Reset Image</Button>
                </div>
                </div>
                {/* result after detecting */}
                <div className="flex  flex-col justify-center items-center gap-8 bg-gray-300 rounded-2xl p-5">
                    <a className="text-3xl font-semibold">
                        Result:
                    </a>
                    <a className="text-xl font-semibold">
                        Your plant is healthy
                    </a>
                </div>


            </div>


        </>
    )
}

export default DetectPage;

