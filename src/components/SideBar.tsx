
import { FolderOpen, Play, Upload } from "lucide-react";
import { ReactNode } from "react";


function SideBar({ children }: { children: ReactNode }) {
  return (
    <div className="drawer lg:drawer-open h-screen overflow-hidden">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content overflow-y-auto">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
            {/* Sidebar toggle icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
          </label>
        </nav>
        {/* Page content here */}
        {children}
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible ">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}


          <div className=" mt-5 w-full flex items-center justify-center px-0 py-2 gap-2 is-drawer-close:tooltip is-drawer-close:tooltip-center is-drawer-open:justify-start is-drawer-open:px-4 text-2xl">
            <Play className="size-6" />
            <span className="is-drawer-close:hidden ml-2">BugetFlix</span>

          </div>

          <ul className="menu w-full grow mt-12 gap-1">

            <label className="label ml-4 mb-2 is-drawer-close:hidden ">Navigáció</label>
            {/* List item */}
            <li className="m-0 p-0">
              <button className="w-full flex items-center justify-center px-0 py-2 gap-2 is-drawer-close:tooltip is-drawer-close:tooltip-right is-drawer-open:justify-start is-drawer-open:px-4" data-tip="feltoltes">
                {/* Settings icon */}
                <Upload className="size-6 shrink-0" />
                <span className="is-drawer-close:hidden text-xl ml-2">Feltoltes</span>
              </button>
            </li>


            <li className="m-0 p-0">
              <button className="w-full flex items-center justify-center px-0 py-2 gap-2 is-drawer-close:tooltip is-drawer-close:tooltip-right is-drawer-open:justify-start is-drawer-open:px-4" data-tip="feltoltes">
                {/* Settings icon */}
                <FolderOpen className="size-6 shrink-0" />
                <span className="is-drawer-close:hidden text-xl ml-2">Kezelés</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>

  )
}

export default SideBar