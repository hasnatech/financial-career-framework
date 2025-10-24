
export default function MainLayout({ children }: any) {
  return (
    <>
      <div className="bg-slate-50 shadow">
        <nav className="p-5 flex">
          <ul className="flex gap-5 justify-between items-center w-full">
            <li>
              <a href="/" className="font-bold text-2xl">
              Career Framework
              </a>
            </li>
         
            {/* <li>
              <a href="/about" className="hover:underline">About</a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">Contact</a>
            </li> */}
          </ul>
        </nav>

        
      </div>
      <div className=" p-3">{children}</div>
    </>
  );
}
