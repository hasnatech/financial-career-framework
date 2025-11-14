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
  className: string;
  isNodeDetailPopupOpen: boolean;
  isCopilotPopupOpen: boolean;
  onClose: () => void;
  onSearchChange: (value: string) => void;
  data?: NodeItem[];
  setSelectedNodeForPopup: (value: any) => void;
  currentPromptDetails: any;
  setCurrentPromptDetails: (value: any) => void;
};

const SearchBar = ({  
  isNodeDetailPopupOpen,
  isCopilotPopupOpen,
  onClose,
  data = [],
  onSearchChange,
  setSelectedNodeForPopup,
  className,
  currentPromptDetails,
  setCurrentPromptDetails,
}: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [filteredSuggestions, setFilteredSuggestions] = useState<NodeItem[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchValue, setSearchValue] = useState(()=>{
    return isCopilotPopupOpen && currentPromptDetails?.label ? currentPromptDetails.label : '';
  }); 
  const justSelected = useRef(false); // ✅ Prevent re-opening after select
  const initializedFromProps=useRef(true); 
  const mounted=useRef(false);

  

  useEffect(() => {
    if(!mounted.current){
      mounted.current=true;
      return; 
    }
    // ✅ Don’t show suggestions right after selection
    if(initializedFromProps.current){
      initializedFromProps.current=false;
      return;
    }
    if (justSelected.current) {
      justSelected.current = false;
      return;
    }

    if (!Array.isArray(data)) {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    if (searchValue.trim() === "") {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const filtered = data.filter((node) => {
      const label = node?.data?.label?.toLowerCase() || "";
      const query = searchValue.toLowerCase();
      return label.startsWith(query);
    });

    setFilteredSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
  }, [searchValue, data]);

  const handleSelectSuggestion = (node: any) => {
    justSelected.current = true; // ✅ Block effect temporarily

    if (isCopilotPopupOpen) {
      setCurrentPromptDetails({
        ...node.data,
        timeline: currentPromptDetails.timeline,
      });
      setSearchValue(node.data.label);
    } else {
      setSelectedNodeForPopup(node.data);
      setSearchValue("");
    }

    setShowSuggestions(false);
  };

 

  return (
    <div className={`${className}`}>
      <div className="flex flex-col relative">
        <div className="flex items-center gap-2 px-3 py-2 shadow-sm shadow-sm *: rounded-lg border min-w-64 bg-white">
     
          <input
            ref={inputRef}
            value={searchValue ?? ""}
            onChange={(e) => {
              
              setSearchValue(e.target.value);
              onSearchChange?.(e.target.value);
            }}
            placeholder="Search..."
            className="outline-none border-none w-full bg-transparent text-gray-700"
            type="text"
            onFocus={() => {
              if (filteredSuggestions.length > 0 && !isCopilotPopupOpen && !currentPromptDetails.label) setShowSuggestions(true);
            }}
          />

          <div className="flex gap-x-4 items-center">
            {/*<button
              onClick={() => {
                const currentValue = inputRef.current?.value || "";
                if (currentValue) {
                  setSearchValue(currentValue);
                  onSearchChange(currentValue);
                  if (isNodeDetailPopupOpen) onClose();
                }
              }}
              className="h-5 flex items-center justify-center hover:opacity-30 duration-500"
            >
              <LucideSearch className="stroke-gray-500 h-4" />  
            </button>*/}

            {searchValue && (
              <button
                onClick={() => {
                  setSearchValue("");
                  setShowSuggestions(false);
                  onSearchChange?.("");
                  if(isCopilotPopupOpen){
                    setCurrentPromptDetails({
                    band: '',
                    contributor_type: '',
                    finance_technical: '',
                    group: '',
                    id: null,
                    key_account: '',
                    label: '',
                    purpose: '',
                    sub_family: '',
                    timeline: '',
                  })
                  }
                }}
                className="h-5 flex items-center justify-center hover:opacity-30 duration-500"
              >
                <LucideX className="stroke-gray-500 h-4" />
              </button>
            )}
          </div>
        </div>

        {showSuggestions && filteredSuggestions.length > 0 && (
          <ul className="absolute top-full -left-6 right-0 hide-scrollbar mt-1 bg-white border rounded-md shadow-sm w-full max-h-48 overflow-y-auto z-50">
            {filteredSuggestions.map((node, index) => (
              <li
                key={index}
                onClick={() => handleSelectSuggestion(node)}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-gray-700"
              >
                {node.data.label}
              </li>
            ))}
          </ul>
        )}

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
