// import { Link } from "react-router-dom";
import { useEffect } from "react";
import SearchBar from "../component/SearchBar";

export default function MainLayout({
  children,
  searchValue,
  setSearchValue,
}: any) {
  useEffect(() => {
    console.log(searchValue);
  });

  return (
    <>
      <div className="bg-primary shadow ">
        <nav className="px-5 py-2 flex justify-between items-center">
          <p>
            <a href="/" className="font-bold text-2xl text-white">
              Career Framework
            </a>
          </p>
          <SearchBar
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          ></SearchBar>
        </nav>
      </div>
      <div className=" p-3">{children}</div>
    </>
  );
}
