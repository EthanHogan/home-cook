import { BookOpenText } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import Link from "next/link";

// Menu items.
// const items = [
//   {
//     title: "My Cookbook",
//     url: "/my-cookbook",
//     icon: BookOpenText,
//   },
//   {
//     title: "Posts",
//     url: "/posts",
//     icon: BookOpenText,
//   },
// ];

export function AppSidebar() {
  return (
    <Sidebar
      variant="inset"
      collapsible="icon"
      className="top-[--header-height]"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Recipes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))} */}
              {/* <SidebarMenuItem key={"my-cookbook"}>
                <SidebarMenuButton asChild>
                  <Link href={"/my-cookbook"}>My Cookbook</Link>
                </SidebarMenuButton>
              </SidebarMenuItem> */}

              {/* <SidebarMenuItem key={"posts"}>
                <SidebarMenuButton asChild>
                  <Link href={"/posts"}>
                    <BookOpenText />
                    <span>Posts</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem> */}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
