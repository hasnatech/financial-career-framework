import { LucideSearch, LucideX } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";

type NodeItem = {
  data: {
    label: string;
    [key: string]: any;
  };
  [key: string]: any;
};

type SearchBarProps = {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  isNodeDetailPopupOpen: boolean;
  onClose: () => void;
  onSearchChange:(value:string)=>void;
  data?: NodeItem[]; // ✅ now optional to prevent undefined errors
};  

const SearchBar = ({
  isNodeDetailPopupOpen,
  onClose,
  data = [],
  onSearchChange // ✅ fallback to an empty array
}: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [filteredSuggestions, setFilteredSuggestions] = useState<NodeItem[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
   const [searchValue, setSearchValue] = useState("");

  console.log("🔄 SearchBar rendered | searchValue:", searchValue);
  console.log("📦 Received data prop:", data);

  // Filter suggestions as user types
  useEffect(() => {
    console.log("🧠 Running filter useEffect | searchValue:", searchValue);

    // ✅ Ensure data is an array
    if (!Array.isArray(data)) {
      console.warn("⚠️ 'data' is not an array:", data);
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    if (searchValue.trim() === "") {
      console.log("Empty search input — clearing suggestions");
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const filtered = data.filter((node) => {
      const label = node?.data?.label;
      if (!label) return false;
      return label.toLowerCase().includes(searchValue.toLowerCase());
    });

    console.log("📋 Filtered suggestions:", filtered);
    setFilteredSuggestions(filtered);
    setShowSuggestions(true);
  }, [searchValue, data]);

  const handleSelectSuggestion = (label: string) => {
    console.log(`🖱️ Suggestion clicked: "${label}"`);
    setSearchValue(label);
    setShowSuggestions(false);
  };

  return (
    <div className={`${!isNodeDetailPopupOpen ? "absolute top-3 right-5" : ""}`}>
    <div
      className={`flex flex-col relative `}
    >
      <div
        className={`flex items-center gap-2 px-3 py-2 shadow-sm rounded-lg border min-w-96 bg-white`}
      >
        <input
          ref={inputRef}
          value={searchValue}
          onChange={(e) => {
            console.log("⌨️ Input changed:", e.target.value);
            setSearchValue(e.target.value);
            onSearchChange(e.target.value);
          }}
          placeholder="Search..."
          className="outline-none border-none w-full bg-transparent text-gray-700"
          type="text"
          onFocus={() => {
            console.log("🧩 Input focused");
            if (filteredSuggestions.length > 0) setShowSuggestions(true);
          }}
        />

        <div className="flex gap-x-4 items-center">
          <button
            onClick={() => {
              const currentValue = inputRef.current?.value || "";
              console.log("🔍 Search button clicked | Value:", currentValue);
              if (currentValue) {
                setSearchValue(currentValue);
                onSearchChange(currentValue);

                if (isNodeDetailPopupOpen) {
                  console.log("📤 Closing Node Detail Popup");
                  onClose();
                }
              }
            }}
            className="h-5 flex items-center justify-center hover:opacity-30 duration-500"
          >
            <LucideSearch className="stroke-gray-500 h-4" />
          </button>

          {searchValue && (
            <button
              onClick={() => {
                console.log("❌ Clear button clicked");
                setSearchValue("");
                setShowSuggestions(false);
                onSearchChange('')
              }}
              className="h-5 flex items-center justify-center hover:opacity-30 duration-500"
            >
              <LucideX className="stroke-gray-500 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Suggestion Dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="absolute top-full mt-1 bg-white border rounded-md shadow-sm w-full max-h-48 overflow-y-auto z-50">
          {filteredSuggestions.map((node, index) => (
            <li
              key={index}
              onClick={() => handleSelectSuggestion(node.data.label)}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-gray-700"
            >
              {node.data.label}
            </li>
          ))}
        </ul>
      )}

      {/* No results */}
      {showSuggestions && filteredSuggestions.length === 0 && (
        <div className="absolute top-full mt-1 bg-white border rounded-md shadow-sm w-full text-gray-500 text-sm px-3 py-2">
          No results found
        </div>
      )}
    </div>
    </div>
  );
};

export default SearchBar;



/*
import { LucideSearch, LucideX } from "lucide-react";
import React from "react";
import { useRef } from "react";

type SearchBarProps = {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  isNodeDetailPopupOpen:boolean;
  onClose: () => void;  

};

const SearchBar=({ searchValue, setSearchValue,isNodeDetailPopupOpen,onClose}: SearchBarProps)=>{

  const inputRef=useRef(null);

 return (
  <div className={`${!isNodeDetailPopupOpen ? 'absolute top-3 right-5' : ''} flex flex-col `}>
 <div className={`flex items-center gap-2 px-3 py-2 shadow-sm rounded-lg border  min-w-96 bg-white`}>
        <input ref={inputRef}
        onClick={()=>{
          console.log('input search is clicked ')
        }}
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
                if(isNodeDetailPopupOpen){
                  onClose();
                }
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
  <div className="flex flex-col bg-white rounded-md ">

  </div>
  </div>
 )
};

export default SearchBar;
*/