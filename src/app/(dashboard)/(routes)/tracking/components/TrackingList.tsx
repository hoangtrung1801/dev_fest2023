'use client'
import { Tracking, User } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import clsx from "clsx"
import Image from "next/image"
import useTracking from "@/hooks/useTracking"
import { FullTrackingType } from "@/types"
import axios from "axios"
import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from 'react'
import { IoClose } from "react-icons/io5"
import Link from "next/link"

interface TrackingListProps {
    createdAt: Date
    imagePlant: string
    namePlant: string
    statusPlant: string
    haveDiseasePlant: boolean
    qualityPlant: string

}

const TrackingList: React.FC<TrackingListProps> = (
    {
        createdAt,
        imagePlant,
        namePlant,
        statusPlant,
        qualityPlant,
        haveDiseasePlant,
    }

) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div onClick={() => {
            // console.log(tracking.id)


            setIsModalOpen(true)



        }} className="w-[90%] cursor-pointer hover:bg-slate-100  px-5 py-6 flex flex-row">



            <Transition.Root show={isModalOpen} as={Fragment} >
                <Dialog as="div" className="fixed inset-0 flex w-screen ml-20 items-center justify-center p-4  " onClose={() => setIsModalOpen(false)} >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                        />

                    </Transition.Child>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <Dialog.Panel
                            className="
                                w-full p-4 max-w-4xl rounded-xl z-10 bg-white flex flex-col justify-between items-center
                            "
                        >
                            <div className="
                    absolute 
                    right-0 
                    top-0 
                    hidden 
                    pr-4 
                    pt-4 
                    sm:block
                    z-10
                  ">    <button type="button"
                                    className="
                    rounded-md 
                    bg-white 
                    text-gray-400 
                    hover:text-gray-500 
                    focus:outline-none 
                    focus:ring-2 
                    focus:ring-indigo-500 
                    focus:ring-offset-2
                  "
                                    onClick={() => setIsModalOpen(false)}>
                                    <span className="sr-only"> Close</span>
                                    <IoClose className="h-6 w-6" aria-hidden="true" />

                                </button>

                            </div>
                            (
                            <div className="flex flex-row justify-between gap-10 items-center">
                                <div className="flex flex-col gap-10">
                                    <Image width={360} height={280} className="rounded-2xl" src={imagePlant} alt="img" />
                                    <div className="flex justify-center items-center bg-green-400 rounded-xl px-9 py-3 text-xl text-white font-bold">{namePlant}</div>
                                </div>
                                <div className="flex flex-col justify-center items-start gap-8">
                                    <div className="flex flex-row items-center gap-3">
                                        <Image width={30} height={30} src="/iconsPlant/calenderIcon.png" alt="calender" />
                                        <a className="font-bold text-2xl">Ngày trồng: </a>
                                        <a className=" text-2xl">
                                            {
                                                new Intl.DateTimeFormat('vi-VN', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric',
                                                    timeZone: 'Asia/Ho_Chi_Minh'
                                                }).format(new Date(createdAt))
                                            }

                                        </a>
                                    </div>
                                    <div className="flex flex-col justify-start items-start gap-3">
                                        <div className="flex flex-row">
                                            <Image width={30} height={30} className="mr-3" src="/iconsPlant/featureIcon.png" alt="calender" />
                                            <a className="font-bold text-2xl">Đặc điểm</a>
                                        </div>

                                        <a className="ml-8 text-2xl">Cao : 1m4 <br /> Loại lá : Lá đơn <br /> Thời gian trồng phù hợp: Mùa thu</a>
                                    </div>
                                    <div className="flex flex-row items-center gap-3">
                                        <Image width={30} height={30} src="/iconsPlant/leafIcon.png" alt="calender" />
                                        <a className="font-bold text-2xl">Tình trạng: </a>
                                        <a className=" text-2xl">{statusPlant}</a>
                                    </div>
                                    <div className="flex flex-row items-center gap-3">
                                        <Image width={30} height={30} src="/iconsPlant/appleIcon.png" alt="calender" />
                                        <a className="font-bold text-2xl">Chất lượng quả: </a>
                                        <a className=" text-2xl">{qualityPlant}</a>
                                    </div>
                                    <div className="flex flex-col justify-start items-start gap-3">
                                        <div className="flex flex-row">
                                            <Image width={30} height={30} className="mr-3" src="/iconsPlant/featureIcon.png" alt="calender" />
                                            <a className="font-bold text-2xl"> Yêu cầu chăm sóc </a>
                                        </div>

                                        <a className="ml-8 text-2xl">Tiếp tục kế hoạch bón phân tưới nước như thường ngày</a>
                                    </div>
                                    <Link key="id" href="/conversation" className="bg-orange-300 rounded-xl px-14 text-xl font-medium cursor-pointer transition duration-150 hover:bg-green-300 py-4 flex items-center justify-center ">Trợ giúp cây trồng</Link>

                                </div>
                            </div>



                            )
                        </Dialog.Panel>

                    </Transition.Child>

                </Dialog>
            </Transition.Root>



            <div className="w-[40%]  flex flex-row items-center  text-xl text-gray-400 ">
                <div className="flex gap-8 flex-row justify-start items-center">
                    <div className=" rounded-full bg-orange-300">

                        <Image className="rounded-full " src={imagePlant} alt="this is example" width={120} height={120} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-black" >{namePlant}  </h1>
                        <h2 className="text-lg font-medium text-gray-400">{ }</h2>

                    </div>

                </div>
            </div>
            <div className="w-[20%] flex flex-row items-center  text-xl text-gray-400 ">
                <div className="flex flex-row justify-start items-center">
                    <h1 >
                        {
                            new Intl.DateTimeFormat('vi-VN', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                timeZone: 'Asia/Ho_Chi_Minh'
                            }).format(new Date(createdAt))
                        }

                    </h1>

                </div>
            </div>
            <div className="w-[20%] flex flex-row items-center  text-xl text-gray-400 ">
                <div className="flex flex-row justify-start items-center">
                    <h1 >{statusPlant}</h1>

                </div>
            </div>
            <div className=" flex flex-row items-center  text-xl text-gray-400 ">
                <div className="flex flex-row justify-start items-center">
                    <h1 >
                        {haveDiseasePlant ? 'Yes' : 'No'}
                    </h1>

                </div>
            </div>
        </div>
    )



}


export default TrackingList;