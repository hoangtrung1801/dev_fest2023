'use client'
import { useState, Fragment, useEffect,useCallback } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { Plus, Leaf, ChevronDown } from "lucide-react";
import Image from "next/image";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import axios from "axios";
import toast from "react-hot-toast";

import { Switch } from "@headlessui/react";
import { CldUploadButton } from "next-cloudinary";

import { useSession, SessionProvider } from "next-auth/react";
import useUser from '@/hooks/useUser';
import { useRouter } from "next/navigation";
import {Tracking, User} from "@prisma/client"
import useTracking from "@/hooks/useTracking";
import { FullTrackingType } from "@/types";
import getTrackings from "@/app/actions/getTrackings";
import EmptyState from "@/app/components/EmptyState";
import clsx from "clsx";
import TrackingClient from "./components/TrackingClient";








// visualize for me the data of tracking include title ,status,datePlant,duration



const TrackingPage= () => {
  // const [isOpen, setIsOpen] = useState(false);
  // const [plantName, setPlantName] = useState('' as any);
  // const [descriptionPlant, setDescriptionPlant] = useState('' as any);
  // const [statusPlant, setStatusPlant] = useState('' as any);
  // const [qualityPlant, setQualityPlant] = useState('' as any);
  // const [isLoading, setIsLoading] = useState(false);
  // const [haveDiseasePlant, setHaveDiseasePlant] = useState(false);
  // const [imagePlant, setImagePlant] = useState<string>('');
  // const [datePlant, setdatePlantPlant] = useState('' as any);

  // const { userId } = useUser();

  // const router = useRouter();
  // const session = useSession();
  // const {trackingId } = useTracking();
  // const [items, setItems] = useState(initialItems)

  // const [trackings, setTrackings] = useState<[]>([]);


  // const allTrackings = getTrackings();
  

  // const handleClick = useCallback(()=>{
  //   router.push(`/tracking/[${trackingId}]`)
  // },[])

  
// useEffect(() => {
//   // get all tracking of user
//   axios.get(`/api/tracking/${trackingId}`).then((res) => {
//     setTrackings(res.data)
//   }).catch((err) => {
//     console.log(err)
//   }
//   )

// }, [router])
 
  
// useEffect(() => {
//   // get all tracking of user
//   axios.get(`/api/tracking`).then((res) => {
//     setTrackings(res.data)
//   }).catch((err) => {
//     console.log(err)
//   }
//   )

// }, [router])



  // const handleDeactive = (data: any) => {

  // }




  // const {
  //   register,
  //   handleSubmit,
  //   formState: {
  //     errors,
  //   }
  // } = useForm<FieldValues>({
  //   defaultValues: {
  //     datePlant: '',
  //     namePlant: '',
  //     descriptionPlant: '',
  //     statusPlant: '',
  //     qualityPlant: '',
  //     haveDiseasePlant: false,
  //     // imagePlant: '',
  //   }
  // });


 

  // const handleUpload = (result: any) => {
  //   setImagePlant(result.info.secure_url)
  // }
  // const resetImage = () => {
  //   setImagePlant('')
  // }
  // const onSubmit: SubmitHandler<FieldValues> = (data) => {
  //   setIsLoading(true);
  //   axios.post('/api/tracking', {
  //     ...data,
  //     imagePlant,
  //   }).then(() => {
  //     toast.success('Create tracking successfully');
  //   })
  //     .catch((err: any) => {
  //       toast.error('Something went wrong');

  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //       router.refresh();
  //     })

  // }



const {isOpen} = useTracking();



// const trackings = getTrackings();
// const user = useUser();

  return (
    <div>
      <TrackingClient  />
    </div>
  )
}

export default TrackingPage;