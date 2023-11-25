'use client'

import { Menu, Transition } from '@headlessui/react';
import { Fragment, forwardRef, useEffect, useRef, useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { User } from 'lucide-react'
import { link } from 'fs';
import SearchBar from './ui/search';

const links = [
    { href: '/', label: 'Account settings' },
    { href: '/', label: 'Support' },
    { href: '/', label: 'License' },
    { href: '/', label: 'Sign out' },
]


const Navbar = () => {
    const {data: session} = useSession();
    return (
        <div className="flex flex-row   justify-between items-center p-4">
            <div>
                <SearchBar/>
            </div>

            <Menu as="div" className="relative inline-block ">
               <div>
               <Menu.Button className="inline-flex w-full justify-center rounded-md   px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ">
                    <div className="p-4 md:mr-3 rounded-full bg-green-300 hover:bg-gray-300 hover:scale-125 duration-150 hover:cursor-pointer">
                        <User />
                    </div>
                </Menu.Button>

                <Transition as={Fragment}    enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95" >

                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" >
                   <div className='px-3 py-3'> 
                 {session?.user?.name && ( 
                     <div className=' ml-2 text-xl font-medium'>Hello {session?.user?.name} !</div>

                 )}
                   {links.map((link)=>(
                        <Menu.Item key={link.href} as={Fragment} >
                            {({active})=>(
                                <a href={link.href}  className={`${
                                    active ? 'bg-violet-500 text-white ' : 'text-gray-900 '
                                  } group flex w-full items-center rounded-md px-2 py-2 text-lg`}>
                                    {link.label}
                                </a>
                            )}
                        </Menu.Item>
                    ))}
                   </div>
                 
                   
  
                </Menu.Items>
                </Transition>
               </div>
            </Menu>





        </div>
    )

}

export default Navbar;

