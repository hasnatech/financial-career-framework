import { LucideSearch, LucideX } from "lucide-react";
import React from "react";
import { useRef } from "react";

type SearchBarProps = {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

const SearchBar=({ searchValue, setSearchValue }: SearchBarProps)=>{

  const inputRef=useRef(null);

 return (
 <div className="flex items-center gap-2 px-3 py-2 shadow-sm rounded-lg border  min-w-96 bg-white">
        <input ref={inputRef}
        value={searchValue}
        onChange={(event=>{
        setSearchValue(event.target.value);
        console.log('input value:', event.target.value);
        })}
        placeholder="Search..."
        className="outline-none border-none w-full bg-transparent text-gray-700"
        type="text"
        />

        <div className="flex gap-x-4 items-center">
            <button onClick={()=>{
              if(inputRef.current.value){
                setSearchValue(inputRef.current.value);
              }
            }} className="h-5 flex items-center justify-center hover:opacity-30 duration-500">
            <LucideSearch className="stroke-gray-500 h-4"></LucideSearch>
            </button>
            {searchValue &&
            <button onClick={()=>{
            setSearchValue('');
            }} className="h-5 flex items-center justify-center hover:opacity-30 duration-500">
            <LucideX className="stroke-gray-500 h-4"></LucideX>
            </button>
            }
        </div>
        
        
  </div>
 )
};

export default SearchBar;
