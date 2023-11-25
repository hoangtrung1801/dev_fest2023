'use client'

// import useTracking from "@/hooks/useTracking";
import { FullTrackingType } from "@/types";
import { Dialog, Switch, Transition } from "@headlessui/react";
import axios from "axios";
import { ChevronDown, Leaf, Plus } from "lucide-react";
import { SessionProvider, useSession } from "next-auth/react";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ModalPlant from "./ModalPlant";
import { Tracking } from "@prisma/client";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import TrackingList from "./TrackingList";


interface IParams {
  trackings?: FullTrackingType[];
}

const TrackingClient: React.FC<IParams> = ({
  trackings
}) => {

  const router = useRouter();
  const session = useSession();
  // const {trackingId, isOpen} = useTracking();

  const [isOpenModal, setIsOpen] = useState(false);
  const [plantName, setPlantName] = useState('' as any);
  const [descriptionPlant, setDescriptionPlant] = useState('' as any);
  const [statusPlant, setStatusPlant] = useState('' as any);
  const [qualityPlant, setQualityPlant] = useState('' as any);
  const [isLoading, setIsLoading] = useState(false);
  const [haveDiseasePlant, setHaveDiseasePlant] = useState(false);
  const [imagePlant, setImagePlant] = useState<string>('');
  const [datePlant, setdatePlantPlant] = useState('' as any);
  const [isModalOpen, setIsModalOpen] = useState(false); //This is modal when open plant
  const [allTrackings, setTrackings] = useState<[]>([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedTracking, setSelectedTracking] = useState('');
  useEffect(() => {
    // get all tracking of user
    axios.get(`/api/tracking`).then((res) => {
      setTrackings(res.data)
    }).catch((err) => {
      console.log(err)
    }
    )

  }, [router])


  // create useEffect to call API get tracking by id when click 1 tracking


  const {
    register,
    handleSubmit,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      datePlant: '',
      namePlant: '',
      descriptionPlant: '',
      statusPlant: '',
      qualityPlant: '',
      haveDiseasePlant: false,
      // imagePlant: '',
    }
  });






  const handleUpload = (result: any) => {
    setImagePlant(result.info.secure_url)
  }
  const resetImage = () => {
    setImagePlant('')
  }


  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    // router.push('/plant')
    axios.post('/api/tracking', {
      ...data,
      imagePlant,
    }).then(() => {
      toast.success('Create tracking successfully');
    })
      .catch((err: any) => {
        toast.error('Something went wrong');

      })
      .finally(() => {
        setIsLoading(false);
        router.refresh();
      })

  }

  const handleDeactive = (data: any) => {

  }





  const selectTracking = allTrackings.find((tracking: Tracking) => tracking.id === selectedTracking);
  return (


    <div className="flex flex-col  justify-center  items-center">

      {/* Bar add new Tracking */}
      <div className="w-[50%] px-5 py-6 flex flex-row justify-between border rounded-2xl h-auto">
        {/* button create new tracking */}
        <Transition
          show={isOpenModal}
          as={Fragment}
        >

          <Dialog className="fixed inset-0 flex w-screen ml-20 items-center justify-center p-4 " open={isOpenModal} onClose={() => setIsOpen(false)}>
            <Transition.Child

              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-100 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
              as={Fragment}
            >

              <div className="fixed  inset-0 bg-black/30" aria-hidden="true" />
            </Transition.Child>

            <Transition.Child

              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-100 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
              as={Fragment}
            >

              <Dialog.Panel className="w-full p-4 max-w-4xl rounded-xl z-10 bg-white flex flex-col justify-between items-center">
                <Dialog.Title className="text-2xl font-bold">Create New Tracking</Dialog.Title>
                <Dialog.Description className="text-gray-400 text-xl">Create a new tracking for your plant</Dialog.Description>
                <form className="mt-3  gap-4 flex flex-col justify-center items-center " onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="flex flex-row gap-10 px-9 items-center">
                    <div className="flex flex-col gap-4">

                      {/* <div className="flex flex-row gap-6 items-center">
                          <label className="text-xl"> datePlant:  </label>
                          <input className="hover:cursor-pointer" {...register('datePlant', { required: true })} type="date" id="datePlant" onChange={(e)=> setdatePlantPlant(e.target.value)}></input>
                        </div> */}
                      <label>

                        <input type="text" id="namePlant" placeholder="Name of plant" className="w-full  border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-300" {...register('namePlant', { required: true })}
                          onChange={(e) => setPlantName(e.target.value)}
                        />
                      </label>
                      <label>

                        <input type="text" id="descriptionPlant" placeholder="Description" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-300" {...register('descriptionPlant', { required: true })}
                          onChange={(e) => setDescriptionPlant(e.target.value)}
                        />
                      </label>
                      <label>

                        <input type="text" id="statusPlant" placeholder="Status" defaultValue="Phát triển tốt" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-300" {...register('statusPlant', { required: true })}
                          onChange={(e) => setStatusPlant(e.target.value)}
                        />
                      </label>
                      <label>

                        <input type="text" id="qualityPlant" placeholder="Quality" defaultValue="Phát triển tốt" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-300" {...register('qualityPlant', { required: true })}
                          onChange={(e) => setQualityPlant(e.target.value)}
                        />
                      </label>
                      <div className="flex flex-row gap-3">
                        <label>On diseased :</label>
                        <label>No</label>
                        <Switch
                          checked={haveDiseasePlant}
                          onChange={setHaveDiseasePlant}
                          className={`${haveDiseasePlant ? 'bg-blue-600' : 'bg-gray-200'
                            } relative inline-flex h-6 w-11 items-center rounded-full`}
                        >
                          <span className="sr-only">Enable notifications</span>
                          <span
                            className={`${haveDiseasePlant ? 'translate-x-6' : 'translate-x-1'
                              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                          />
                        </Switch>
                        <label>Yes</label>
                      </div>
                    </div>

                    {/* image upload */}
                    <div className="flex flex-col gap-3 justify-center items-center ">
                      <a className="font-medium text-lg text-gray-500">
                        Select plant's image !

                      </a>

                      {/* showing image  */}
                      <div>
                        {
                          isLoading ? (
                            <div className=" inset-0 flex items-center justify-center">
                              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                            </div>
                          ) : (
                            <div className="p-3 rounded-lg">
                              {imagePlant && <Image src={imagePlant} alt="image" width={300} height={300} />}
                            </div>

                          )
                        }
                        {/* Button upload and reset */}
                        <div className="flex flex-row justify-center items-center gap-16 ">


                          <div className="p-3 bg-green-500 rounded-xl text-white font-bold">
                            <CldUploadButton options={{ maxFiles: 1 }} onUpload={handleUpload} uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET} >
                              Upload Image
                            </CldUploadButton>
                          </div>


                          <button onClick={resetImage} className="bg-red-400 rounded-xl text-white font-bold p-3" >Reset Image</button>
                        </div>

                      </div>
                    </div>

                  </div>


                  <div>

                  </div>

                  <div className="flex flex-row justify-center items-center gap-24 my-4">

                    <button className="px-8 py-3 rounded-xl text-blue-500 font-medium hover:bg-blue-300 bg-[#dbeafe]" onClick={() => setIsOpen(false)}>Cancel</button>
                    <button type="submit" className="px-8 py-3 bg-green-300 rounded-xl text-blue-500 font-medium hover:bg-blue-300 " onClick={handleDeactive}>Create</button>
                  </div>

                </form>

              </Dialog.Panel>
            </Transition.Child>

          </Dialog>
        </Transition>
        <div className="flex flex-row items-center text-green-400 hover:cursor-pointer hover:underline duration-200 transition ">
          <Plus size={25} className="" />
          <div onClick={() => setIsOpen(true)} className="ml-2 font-bold text-2xl">New Tracking</div>
        </div>
        <div >

          <Leaf size={25} className="text-green-400" />
        </div>
      </div>
      {/* Board column of list tracking */}

      <div className="w-[90%] px-5 py-6 flex flex-row justify-between items-center  h-auto " >
        <h1 className="text-2xl font-bold">Tracking List</h1>
        <div className="border rounded-3xl py-4 px-8 text-xl font-medium text-gray-500"> Total tracking: 2</div>
      </div>

      <div className="w-[90%] px-5 py-6 flex flex-row border-b border-gray-200">
        <div className="w-[40%] flex flex-row items-center  text-xl text-gray-400 ">
          <div className="flex flex-row justify-start items-center">
            <h1 >Project</h1>
            <ChevronDown />
          </div>
        </div>
        <div className="w-[20%] flex flex-row items-center  text-xl text-gray-400 ">
          <div className="flex flex-row justify-start items-center">
            <h1 >Date</h1>
            <ChevronDown />
          </div>
        </div>
        <div className="w-[20%] flex flex-row items-center  text-xl text-gray-400 ">
          <div className="flex flex-row justify-start items-center">
            <h1 >Status</h1>
            <ChevronDown />
          </div>
        </div>
        <div className=" flex flex-row items-center  text-xl text-gray-400 ">
          <div className="flex flex-row justify-start items-center">
            <h1 >On Diseased</h1>
            <ChevronDown />
          </div>
        </div>
      </div>

      {allTrackings.map((tracking: Tracking) => {




        return (
          <TrackingList key={tracking.id} namePlant={tracking.namePlant} createdAt={tracking.createdAt} imagePlant={tracking.imagePlant}
            statusPlant={tracking.statusPlant} haveDiseasePlant={tracking.haveDiseasePlant} qualityPlant={tracking.qualityPlant}
          />
          //   <div key={tracking.id} onClick={() => {
          //     console.log(tracking.id)
          //     setSelectedTracking(tracking.id)


          //     setIsModalOpen(true)



          //   }} className="w-[90%] cursor-pointer hover:bg-slate-100  px-5 py-6 flex flex-row">

          //  {tracking &&(

          //       <Transition.Root show={isModalOpen} as={Fragment} >
          //         <Dialog as="div" className="fixed inset-0 flex w-screen ml-20 items-center justify-center p-4  " onClose={() => setIsModalOpen(false)} >
          //           <Transition.Child
          //             as={Fragment}
          //             enter="ease-out duration-300"
          //             enterFrom="opacity-0"
          //             enterTo="opacity-100"
          //             leave="ease-in duration-200"
          //             leaveFrom="opacity-100"
          //             leaveTo="opacity-0"
          //           >
          //             <div
          //               className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          //             />

          //           </Transition.Child>
          //           <Transition.Child
          //             as={Fragment}
          //             enter="ease-out duration-300"
          //             enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          //             enterTo="opacity-100 translate-y-0 sm:scale-100"
          //             leave="ease-in duration-200"
          //             leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          //             leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          //           >
          //             <Dialog.Panel
          //               className="
          //                         w-full p-4 max-w-4xl rounded-xl z-10 bg-white flex flex-col justify-between items-center
          //                     "
          //             >
          //               <div className="
          //             absolute 
          //             right-0 
          //             top-0 
          //             hidden 
          //             pr-4 
          //             pt-4 
          //             sm:block
          //             z-10
          //           ">    <button type="button"
          //                   className="
          //             rounded-md 
          //             bg-white 
          //             text-gray-400 
          //             hover:text-gray-500 
          //             focus:outline-none 
          //             focus:ring-2 
          //             focus:ring-indigo-500 
          //             focus:ring-offset-2
          //           "
          //                   onClick={() => setIsModalOpen(false)}>
          //                   <span className="sr-only"> Close</span>
          //                   <IoClose className="h-6 w-6" aria-hidden="true" />

          //                 </button>

          //               </div>
          //               (
          //               <div className="flex flex-row justify-between gap-10 items-center">
          //                 <div className="flex flex-col gap-10">
          //                   <Image width={360} height={280} className="rounded-2xl" src={tracking.imagePlant} alt="img" />
          //                   <div className="flex justify-center items-center bg-green-400 rounded-xl px-9 py-3 text-xl text-white font-bold">{tracking.namePlant}</div>
          //                 </div>
          //                 <div className="flex flex-col justify-center items-start gap-8">
          //                   <div className="flex flex-row items-center gap-3">
          //                     <Image width={30} height={30} src="/iconsPlant/calenderIcon.png" alt="calender" />
          //                     <a className="font-bold text-2xl">Ngày trồng: </a>
          //                     <a className=" text-2xl"> {new Intl.DateTimeFormat('vi-VN', {
          //                       hour: 'numeric',
          //                       minute: 'numeric',
          //                       second: 'numeric',
          //                       timeZone: 'Asia/Ho_Chi_Minh',
          //                     }).format(new Date(tracking.createdAt))}</a>
          //                   </div>
          //                   <div className="flex flex-col justify-start items-start gap-3">
          //                     <div className="flex flex-row">
          //                       <Image width={30} height={30} className="mr-3" src="/iconsPlant/featureIcon.png" alt="calender" />
          //                       <a className="font-bold text-2xl">Đặc điểm</a>
          //                     </div>

          //                     <a className="ml-8 text-2xl">Cao : 1m4 <br /> Loại lá : Lá đơn <br /> Thời gian trồng phù hợp: Mùa thu</a>
          //                   </div>
          //                   <div className="flex flex-row items-center gap-3">
          //                     <Image width={30} height={30} src="/iconsPlant/leafIcon.png" alt="calender" />
          //                     <a className="font-bold text-2xl">Tình trạng: </a>
          //                     <a className=" text-2xl">{tracking.statusPlant}</a>
          //                   </div>
          //                   <div className="flex flex-row items-center gap-3">
          //                     <Image width={30} height={30} src="/iconsPlant/appleIcon.png" alt="calender" />
          //                     <a className="font-bold text-2xl">Chất lượng quả: </a>
          //                     <a className=" text-2xl">{tracking.qualityPlant}</a>
          //                   </div>
          //                   <div className="flex flex-col justify-start items-start gap-3">
          //                     <div className="flex flex-row">
          //                       <Image width={30} height={30} className="mr-3" src="/iconsPlant/featureIcon.png" alt="calender" />
          //                       <a className="font-bold text-2xl"> Yêu cầu chăm sóc </a>
          //                     </div>

          //                     <a className="ml-8 text-2xl">Tiếp tục kế hoạch bón phân tưới nước như thường ngày</a>
          //                   </div>
          //                   <Link key="id" href="/conversation" className="bg-orange-300 rounded-xl px-14 text-xl font-medium cursor-pointer transition duration-150 hover:bg-green-300 py-4 flex items-center justify-center ">Trợ giúp cây trồng</Link>

          //                 </div>
          //               </div>



          //               )
          //             </Dialog.Panel>

          //           </Transition.Child>

          //         </Dialog>
          //       </Transition.Root>
          //  )}


          //     <div className="w-[40%]  flex flex-row items-center  text-xl text-gray-400 ">
          //       <div className="flex gap-8 flex-row justify-start items-center">
          //         <div className=" rounded-full bg-orange-300">

          //           <Image className="rounded-full " src={tracking.imagePlant} alt="this is example" width={120} height={120} />
          //         </div>
          //         <div>
          //           <h1 className="text-xl font-bold text-black" >{tracking.namePlant}  </h1>
          //           <h2 className="text-lg font-medium text-gray-400">{ }</h2>

          //         </div>

          //       </div>
          //     </div>
          //     <div className="w-[20%] flex flex-row items-center  text-xl text-gray-400 ">
          //       <div className="flex flex-row justify-start items-center">
          //         <h1 >
          //           {new Intl.DateTimeFormat('vi-VN', {
          //             hour: 'numeric',
          //             minute: 'numeric',
          //             second: 'numeric',
          //             timeZone: 'Asia/Ho_Chi_Minh',
          //           }).format(new Date(tracking.createdAt))}
          //         </h1>

          //       </div>
          //     </div>
          //     <div className="w-[20%] flex flex-row items-center  text-xl text-gray-400 ">
          //       <div className="flex flex-row justify-start items-center">
          //         <h1 >{tracking.statusPlant}</h1>

          //       </div>
          //     </div>
          //     <div className=" flex flex-row items-center  text-xl text-gray-400 ">
          //       <div className="flex flex-row justify-start items-center">
          //         <h1 >
          //           {tracking.haveDiseasePlant ? 'Yes' : 'No'}
          //         </h1>

          //       </div>
          //     </div>
          //   </div>
        )
      })
      }






    </div>

  )

}

export default TrackingClient;

