// import { Code2, Paperclip, Bell, ClipboardList , User , File } from "lucide-react";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarMenuItem,
//   SidebarFooter,
//   SidebarMenu,
//   SidebarHeader,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarMenuButton,
//   SidebarGroupLabel,
// } from "@/components/ui/sidebar";

// const elements = [
//   {
//     title: "Projects",
//     url: "/lead/projects",
//     icon: Paperclip,
//   },
//   {
//     title: "My Projects",
//     url: "/lead/myprojects",
//     icon: ClipboardList,
//   },
//   {
//     title: "Announcements",
//     url: "/lead/announcements",
//     icon: Bell,
//   },
//   {
//     title: "Members",
//     url: "/lead/members",
//     icon: User,
//   },
//   {
//     title: "Pending Requests",
//     url: "/lead/requests",
//     icon: File,
//   },
// ];

// const items = [
//   {
//     title: "Web development",
//     url: "#",
//     icon: Code2,
//   },
// ];

// export function LeadSidebar() {
//   return (
//     <Sidebar className="pt-10 [&>div]:bg-[#031635] shadow-xl">
//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupLabel></SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {elements.map((ele) => (
//                 <SidebarMenuItem key={ele.title}>
//                   <SidebarMenuButton asChild>
//                     <a href={ele.url}>
//                       <ele.icon />
//                       <span
//                         className="
//                           font-madimi
//                           text-white
//                           text-[16px]
                         
//                         "
//                       >
//                         {ele.title}
//                       </span>
//                     </a>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>

//         <SidebarGroup className="mt-8">
//           <SidebarGroupLabel className="font-madimi
                          
//                           text-bold
//                           text-[16px]
                          
                          
//                           text-[#2A2A4A] 
//                           font-large
                          
//                           ">Domains</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {items.map((item) => (
//                 <SidebarMenuItem key={item.title}>
//                   <SidebarMenuButton asChild>
//                     <a href={item.url}>
//                       <item.icon />
//                       <span
//                         className="
//                           font-madimi
//                           font-normal
//                           text-bold
//                           text-[16px]
                          
                          
//                           text-[#2A2A4A]
                          
//                         "
//                       >
//                         {item.title}
//                       </span>
//                     </a>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//     </Sidebar>
//   );
// }

import { Code2, Paperclip, Bell, ClipboardList , User, LayoutDashboard,File  } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarMenuItem,
  SidebarFooter,
  SidebarMenu,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenuButton,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";



const elements = [
  {
    title: "Dashboard",
    url: "/member",
    icon: LayoutDashboard,
  },
  {

    title: "Projects",
    url: "/lead/projects",
    icon: Paperclip,
  },
  {
    title: "My Projects",
    url: "/lead/myprojects",
    icon: ClipboardList,
  },
  {
    title: "Announcements",
    url: "/lead/announcements",
    icon: Bell,
  },
  {
    title: "Members",
    url: "/lead/members",
    icon: User,
  },
  {
    title: "Pending Requests",
    url: "/lead/requests",
    icon: File,
  },
];
const items = [
  {
    title: "Web development",
    url: "#",
    icon: Code2,
  },
];

export function MemberSidebar() {
  return (
   <>
    <Sidebar className="[&>div]:bg-[#031635] shadow-xl">
      <SidebarContent>
        <header className="absolute top-6 left-6 text-white text-3xl font-bold tracking-tight">
        WorkPilot
      </header>
        <SidebarGroup className="pt-12">
          <SidebarGroupLabel></SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {elements.map((ele) => (
                <SidebarMenuItem key={ele.title}>
                  <SidebarMenuButton asChild>
                    <a href={ele.url}>
                      <ele.icon className="text-white"/>
                      <span
                        className="
                          font-madimi
                          text-white
                          text-[16px]
                         
                        "
                      >
                        {ele.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-8">
          <SidebarGroupLabel className="font-madimi
                          
                          text-bold
                          text-[16px]
                          
                          
                          text-white
                          font-large
                          
                          ">Domains</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon className="text-white"/>
                      <span
                        className="
                          font-madimi
                          font-normal
                          text-bold
                          text-[16px]
                          
                          
                          text-white
                          
                        "
                      >
                        {item.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
    </>
  );
}
