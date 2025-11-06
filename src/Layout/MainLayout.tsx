// import { Link } from "react-router-dom";
import { useEffect } from "react";
import { LucideSearch } from "lucide-react";
import SearchBar from "../component/SearchBar";



export default function MainLayout({ children,searchValue,setSearchValue}: any) {

  useEffect(()=>{
    console.log(searchValue);
  })
  
  return (
    <>
      <div className="bg-slate-50 shadow ">
        <nav className="p-5 flex border-2">
          <p>
            <a href="/" className="font-bold text-2xl">
                Career Framework
              </a>
          </p>
        <SearchBar searchValue={searchValue} setSearchValue={setSearchValue}></SearchBar>
        
        </nav>
      </div>
      <div className=" p-3">{children}</div>
    </>
  );
}
