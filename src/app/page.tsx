'use client'
import Image from 'next/image'
import LandingPage from './home/page'
import RootLayout from "@/app/layout";
import HeaderGlobal from "@/components/header";
import Hero2 from "@/components/hero2";
import Feature1a from "@/components/feature1a";
import Contact1 from "@/components/contact1";
import Footer from "@/components/footer";
import React from "react";

export default function Home() {
  return (
      <RootLayout>
        <Hero2 title = "Eat clean with Xiensach" subTitle = "If you want to eat your favorite dishes cheaply and in less time, come to us today!"/>
        <Feature1a/>
        <Contact1/>
        <Footer/>
      </RootLayout>
    )
}
