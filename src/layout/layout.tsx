import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import SideBar from "@/components/SideBar"
import { Outlet } from "react-router-dom"

export default function Layout() {
    return (
        <SidebarProvider>
            <SideBar />
            <main>
                <SidebarTrigger />
                <Outlet />
            </main>
        </SidebarProvider>
    )
}