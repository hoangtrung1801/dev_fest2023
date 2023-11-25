import { Tracking } from "@prisma/client";
import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose } from 'react-icons/io5';
import Image from "next/image";
import Link from "next/link";

interface ModalPlantProps {
    tracking: Tracking;
    onClose: () => void;
    isOpen?: boolean;
}

const ModalPlant: React.FC<ModalPlantProps> = ({ tracking, onClose, isOpen }) => {

    return (
        <Transition.Root show={isOpen} as={Fragment} >
            <Dialog as="div" className="fixed inset-0 flex w-screen ml-20 items-center justify-center p-4  " onClose={onClose} >
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
                                onClick={onClose}>
                                <span className="sr-only"> Close</span>
                                <IoClose className="h-6 w-6" aria-hidden="true" />

                            </button>

                        </div>
 (
                            <div className="flex flex-row justify-between gap-10 items-center">
                                <div className="flex flex-col gap-10">
                                    <Image width={360} height={280} className="rounded-2xl" src={tracking.imagePlant} alt="img" />
                                    <div className="flex justify-center items-center bg-green-400 rounded-xl px-9 py-3 text-xl text-white font-bold">{tracking.namePlant}</div>
                                </div>
                                <div className="flex flex-col justify-center items-start gap-8">
                                    <div className="flex flex-row items-center gap-3">
                                        <Image width={30} height={30} src="/iconsPlant/calenderIcon.png" alt="calender" />
                                        <a className="font-bold text-2xl">Ngày trồng: </a>
                                        <a className=" text-2xl"> {new Intl.DateTimeFormat('vi-VN', {
                                            hour: 'numeric',
                                            minute: 'numeric',
                                            second: 'numeric',
                                            timeZone: 'Asia/Ho_Chi_Minh',
                                        }).format(new Date(tracking.createdAt))}</a>
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
                                        <a className=" text-2xl">{tracking.statusPlant}</a>
                                    </div>
                                    <div className="flex flex-row items-center gap-3">
                                        <Image width={30} height={30} src="/iconsPlant/appleIcon.png" alt="calender" />
                                        <a className="font-bold text-2xl">Chất lượng quả: </a>
                                        <a className=" text-2xl">{tracking.qualityPlant}</a>
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

    )
};
export default ModalPlant;