'use client'
import Image from 'next/image'
import LandingPage from './home/page'
import RootLayout from "@/app/layout";
import HeaderGlobal from "@/components/header";
import Hero2 from "@/components/hero2";
import Feature1 from "@/components/feature1";
import Contact1 from "@/components/contact1";
import Footer from "@/components/footer";
import React from "react";
import Hero1 from "@/components/hero1";
import Contact2 from "@/components/contact2";
import Feature2 from "@/components/feature2";
import {CloudArrowUpIcon, LockClosedIcon, ServerIcon} from "@heroicons/react/20/solid";
import {ArrowPathIcon, FingerPrintIcon} from "@heroicons/react/24/outline";

export default function Home() {
    const featuresList = [
        {
            name: 'Push to deploy.',
            description:
                'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
            icon: CloudArrowUpIcon,
        },
        {
            name: 'SSL certificates.',
            description: 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
            icon: LockClosedIcon,
        },
        {
            name: 'Database backups.',
            description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
            icon: ServerIcon,
        },
        {
            name: 'Simple queues',
            description:
                'Quisque est vel vulputate cursus. Risus proin diam nunc commodo. Lobortis auctor congue commodo diam neque.',
            icon: ArrowPathIcon,
        },
    ]
    return (
        <RootLayout>
            <Hero1 title="Eat clean with Xiensach"
                   subTitle="If you want to eat your favorite dishes cheaply and in less time, come to us today!"/>
            <Feature1 title="A better workflow"
                      subTitle="Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione"
                      features={featuresList}/>
            <Contact1 title="A better workflow"
                      subTitle="Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione"
            />
            <Footer/>
        </RootLayout>
    )
}
