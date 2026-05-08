import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { FolderOpen, Play, Upload } from "lucide-react";
import { useState } from "react"

function SideBar() {
  const [activeSection, setActiveSection] = useState("upload");
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <Play className="size-5 text-primary" />
            </div>
            <div className="group-data-[collapsible=icon]:hidden">
              <h1 className="text-lg font-bold">BugetFlix</h1>
              <p className="text-xs text-muted-foreground">Video Kezelo</p>
            </div>
          </div>
        </SidebarHeader>

      <SidebarContent>
        {/*Navigation*/}
        <SidebarGroup>
          <SidebarGroupLabel>Navigáció</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeSection === "upload"}
                  onClick={() => setActiveSection("upload")}
                  tooltip="Feltoltes"
                >
                  <Upload className="size-4" />
                  <span>Feltoltes</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeSection === "manage"}
                  onClick={() => setActiveSection("manage")}
                  tooltip="Kezeles"
                >
                  <FolderOpen className="size-4" />
                  <span>Kezeles</span>
                </SidebarMenuButton>
                
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  )
}

export default SideBar