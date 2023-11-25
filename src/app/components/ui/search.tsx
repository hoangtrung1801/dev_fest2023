import { Search } from "lucide-react";
const SearchBar = () => {
    return(
        <div className="search-bar md:ml-[200px] cur">
            <div className="rounded-xl border border-gray-300 ">
                <div className="flex items-center space-x-2 md:w-[400px] py-4">
                    <div className=" px-5">
                        <Search className="w-auto h-auto text-black" />
                    </div>
                    <input type="text" placeholder="Searching ..." className="bg-transparent w-full outline-none" />
                </div>
            </div>
            {/* <input type="text" placeholder="Search..." /> */}
        </div>
    )
}

export default SearchBar;
