import Navbar from "../components/navbar";
import { Sidebar } from "../components/sidebar";
import { SessionProvider } from "next-auth/react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full relative">
            {/* <div className="hidden h-full md:w-72  md:flex md:flex-col md:fixed md:inset-y-0 z-[80]
            bg-gray-900">
               <Sidebar  />

            </div> */}
            <main className="md:pl-72 pb-10 ">
                <div className=" w-full items-center">
                    <Navbar />
                </div>

                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;
