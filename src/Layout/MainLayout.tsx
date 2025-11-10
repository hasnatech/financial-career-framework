// import { Link } from "react-router-dom";
import { useEffect } from "react";



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
