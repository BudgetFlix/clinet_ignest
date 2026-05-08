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
    <Sidebar collapsible="icon" >
      <SidebarHeader className="p-4">
        <div
          className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
          <div className="rounded-lg bg-primary/10 p-2">
            <Play className="size-8 text-primary group-data-[collapsible=icon]:size-6" />
          </div>
          <div className="group-data-[collapsible=icon]:hidden">
            <h1 className="text-3xl font-bold">
              BudgetFlix
            </h1>
            <p className="text-s text-muted-foreground">
              Video Kezelo
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="">
        {/*Navigation*/}
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg" >Navigáció</SidebarGroupLabel>
          <SidebarGroupContent >
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  size="lg"
                  isActive={activeSection === "upload"}
                  onClick={() => setActiveSection("upload")}
                  tooltip="Feltoltes"
                  className="text-xl"

                >
                  <Upload />
                  <span>Feltoltes</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  size="lg"
                  isActive={activeSection === "manage"}
                  onClick={() => setActiveSection("manage")}
                  tooltip="Kezeles"
                  className="text-xl"
                >
                  <FolderOpen />
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