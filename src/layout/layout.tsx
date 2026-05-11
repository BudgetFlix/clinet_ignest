import SideBar from "@/components/SideBar"
import { Outlet } from "react-router-dom"

export default function Layout() {
    return (

        <main className="w-full h-full">
            <SideBar>
                <Outlet />
            </SideBar>

        </main>

    )
}