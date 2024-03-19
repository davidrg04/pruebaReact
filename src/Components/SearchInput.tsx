import React from "react";
import { useState } from "react";
interface SearchProps {
    setUrl: (url: string) => void;
}

const SearchInput: React.FC<SearchProps> = ({ setUrl }) => {
    const [searchValue, setSearchValue] = useState<string>('');

    function changeSearch (e:React.ChangeEvent<HTMLInputElement>){
        setSearchValue(e.target.value)
    }
    function search (){
        const url:string = "https://api.spaceflightnewsapi.net/v4/articles/";
        setUrl(`${url}?title_contains=${searchValue}`);
    }

    return(
        
        <form className="max-w-md mx-auto mt-2">   
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="search" value={searchValue} onChange={changeSearch} id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-sky-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="China, Moon, Space X.." required />
                <button type="submit" onClick={search} className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-sky-500 dark:hover:bg-sky-600 dark:focus:ring-blue-800">Buscar</button>
            </div>
        </form>

    )
} 

export default SearchInput;

