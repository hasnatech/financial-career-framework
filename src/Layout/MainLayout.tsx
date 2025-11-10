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
      <div >{children}</div>
    </>
  );
}
