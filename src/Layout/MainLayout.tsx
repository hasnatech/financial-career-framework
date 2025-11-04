// import { Link } from "react-router-dom";

export default function MainLayout({ children }: any) {
  return (
    <>
      <div className="bg-slate-50 shadow">
        <nav className="p-5 flex">
          <p>
            <a href="/" className="font-bold text-2xl">
                Career Framework
              </a>
          </p>
          
        </nav>
      </div>
      <div className=" p-3">{children}</div>
    </>
  );
}
