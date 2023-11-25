'use client'

import Link from "next/link"
import Image from "next/image"
import { Montserrat } from "next/font/google"
import { ScanSearch, Sprout, LayoutDashboard, MessageSquare, Database, Settings, VideoIcon, ChevronDown, ListChecks, ScrollText, LogOut } from "lucide-react";
import { usePathname } from "next/navigation"



import { cn } from "../libs/utils"

const poppins = Montserrat({ weight: '600', subsets: ['latin'] });

const routes = [
  {
    label: 'Chatbot',
    icon: MessageSquare,
    href: '/conversation',
    color: "text-sky-500"
  },
  {
    label: 'Tasks',
    icon: ListChecks,
    href: '/',
    color: "text-violet-500",
  },
  {
    label: 'Diary',
    icon: ScrollText,
    color: "text-pink-700",
    href: '/diary',
  },
  {
    label: 'Logout',
    icon: LogOut,
    color: "text-orange-700",
    href: '/home',
  },
  // {
  //   label: 'Music Generation',
  //   icon: Music,
  //   color: "text-emerald-500",
  //   href: '/music',
  // },
  // {
  //   label: 'Code Generation',
  //   icon: Code,
  //   color: "text-green-700",
  //   href: '/code',
  // },
  // {
  //   label: 'Settings',
  //   icon: Settings,
  //   href: '/settings',
  // },
]
const routesPlants = [
  {
    label: 'Tracking',
    icon: Sprout,
    href: '/tracking',
    color: "text-green-500"
  },
  {
    label: 'Detect by Image',
    icon: ScanSearch,
    href: '/detect',
    color: "text-red-500"
  },
  {
    label: 'Your Data',
    icon: Database,
    href: '/data',
    color: "text-violet-500",
  },
]

export const Sidebar = ({

}) => {
  const pathname = usePathname()
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#E2FFE7] text-black border-r-2">
      <div className="px-3 py-2 flex-1"
      >
        {/* LOGO on top */}
        <Link href="/dashboard" className="flex items-center justify-center  mb-14">
          <div className="relative h-8 w-8 mr-4">
            <Image fill alt="Logo" src="/logo.png" />

          </div>
          <h1 className={cn("text-2xl font-bold", poppins.className)}>
            SmartFarm
          </h1>
        </Link>

        <div className="space-y-1 space-x-2">
          {/* Home */}
          <div>

            <div className="flex flex-row justify-around items-center cursor-pointer hover:text-black hover:bg-black/10 rounded-lg transition" >
              <h1 className="text-2xl  group flex p-3 w-full justify-start font-medium ">Home</h1>
              <ChevronDown className="w-5 h-5 mr-3 text-black" />

            </div>

            {
              routes.map((route) => (
                <Link key={route.href} href={route.href}
                  className={cn("text-lg  group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-black hover:bg-black/10 rounded-lg transition",
                  pathname === route.href ? "text-[#64BC73] bg-[#32723D]/10" : "text-zinc-400",

                  )}
                >
                  <div className="flex items-center flex-1">
                    <route.icon className={cn("w-5 h-5 mr-3", route.color)} />
                    {route.label}
                  </div>
                </Link>
              ))
            }

          </div>
        </div>
        {/* Plants */}
        <div>
          <div className="flex flex-row justify-around items-center cursor-pointer hover:text-black hover:bg-black/10 rounded-lg transition" >
            <h1 className="text-2xl  group flex p-3 w-full justify-start font-medium ">PLants</h1>
            <ChevronDown className="w-5 h-5 mr-3 text-black" />

          </div>
          {
            routesPlants.map((route) => (
              <Link key={route.href} href={route.href}
                className={cn("text-lg  group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-black hover:bg-black/10 rounded-lg transition",
                  pathname === route.href ? "text-[#64BC73] bg-[#32723D]/10" : "text-zinc-400",

                )}
              >
                <div className="flex items-center flex-1">
                  <route.icon className={cn("w-5 h-5 mr-3", route.color)} />
                  {route.label}
                </div>
              </Link>
            ))
          }
        </div>


      </div>

    </div>
  )
}