"use client";
import React, { useState, useEffect } from "react";
import HomeIcon from "@/assets/svg/home-2.svg";
import Vector from "@/assets/svg/Vector.svg";
import Sidebaricon from "@/assets/svg/sidebar-left.svg";
import Subscription from "@/assets/svg/subscription.svg";
import Logout from "@/assets/svg/log-out.svg";
import Library from "@/assets/svg/Group.svg";
import Notification from "@/assets/svg/notification.svg";
import Help from "@/assets/svg/help.svg";
import Analytics from "@/assets/svg/analytics.svg";
import Folder from "@/assets/svg/folder.svg";
import UserLab from "@/assets/svg/library.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { currentUser } from "@/lib/currentUser";
import Cookies from "js-cookie";
import { authPostRequest } from "@/lib/apiClient";

type NavlistType = {
  title: string;
  icon: any;
  path: string;
};
export const superAdminNavlist = [
  { title: "Home", icon: HomeIcon, path: "/dashboard" },
  { title: "Video Library", icon: Library, path: "/dashboard/videoLibrary" },
];
export const adminNavlist = [
  { title: "Home", icon: HomeIcon, path: "/dashboard" },
  { title: "Library", icon: Library, path: "/dashboard/library" },
  { title: "breaker", icon: "", path: "" },
  {
    title: "Subscription",
    icon: Subscription,
    path: "/dashboard/subscription",
  },
];
export const contentNavlist = [
  { title: "Home", icon: HomeIcon, path: "/dashboard" },
  { title: "Skill-Up Lab", icon: Folder, path: "/dashboard/skillupLab" },
  {
    title: "User Library",
    icon: UserLab,
    path: "",
  },
  {
    title: "Analytics",
    icon: Analytics,
    path: "",
  },
  { title: "breaker", icon: "", path: "" },
  {
    title: "Help",
    icon: Help,
    path: "",
  },
  {
    title: "Notification",
    icon: Notification,
    path: "",
  },
];

const Sidebar = () => {
  const [toggleSidebar, settoggleSidebar] = useState(true);
  const [navlist, setNavlist] = useState<NavlistType[]>([]);
  const router = useRouter();
  const currentPath = usePathname();

  const handleToggleSidebar = () => {
    settoggleSidebar(!toggleSidebar);
  };

  const handleMenu = (path: string) => {
    router.push(path);
  };
  const handleLogout = async () => {
    try {
      const token = Cookies.get("token");
      await authPostRequest(`auth/logout?Authorization=${token}`);
      router.push("/");
      Cookies.remove("token");
      Cookies.remove("reset");
      Cookies.remove("superAdmin");
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };
  const handleCurrentUser = () => {
    const role = currentUser();
    if (role === "ROLE_SUPER_ADMIN") {
      setNavlist(superAdminNavlist);
    } else if (role === "ROLE_ADMIN") {
      setNavlist(adminNavlist);
    } else if (role === "ROLE_CONTENT") {
      setNavlist(contentNavlist);
    } else {
      setNavlist([]);
    }
  };
  useEffect(() => {
    handleCurrentUser();
  }, []);

  return (
    <div
      className={`${
        toggleSidebar ? "w-96" : "w-24"
      } h-full flex flex-col border-r border-[#DADADA] justify-between relative transition-all duration-300 ease-in-out`}
    >
      <div
        className={`flex flex-col gap-8 px-4 transition-opacity duration-300 ease-in-out`}
      >
        <div className="flex flex-row justify-between items-center pt-6 relative">
          <div className="flex gap-3">
            <Image
              src={"/images/skillup-icon.png"}
              width={37}
              height={37}
              alt="logo"
            />
            {toggleSidebar && <Image src={Vector} alt="Vector" />}
          </div>
          {toggleSidebar && (
            <div
              className={`flex items-center ${!toggleSidebar && "hidden"}`}
              onClick={handleToggleSidebar}
            >
              <Image
                src={Sidebaricon}
                alt="Sidebaricon"
                className={`cursor-pointer`}
              />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1">
          {navlist &&
            navlist.map((item, index) => {
              if (item.title === "breaker") {
                return (
                  <div
                    key={index}
                    className="w-full border border-gray mt-6"
                  ></div>
                );
              } else {
                return (
                  <div
                    key={index}
                    title={item.title}
                    className={`flex items-center gap-2 px-3 py-2 rounded cursor-pointer ${
                      currentPath === item.path
                        ? "bg-gray-200 text-[#1c3268]"
                        : "hover:bg-gray-200"
                    }`}
                    onClick={() => handleMenu(item.path)}
                  >
                    {item.icon && <Image src={item.icon} alt={item.title} />}
                    {toggleSidebar && item.title && <p>{item.title}</p>}
                  </div>
                );
              }
            })}
        </div>
      </div>
      <div className="border-t pl-5 pr-6 pt-6 pb-3">
        <div
          className="flex flex-row gap-[10px] px-3 py-2 cursor-pointer"
          onClick={handleLogout}
        >
          <Image src={Logout} alt="Logout" />
          <p>{toggleSidebar && "Log out"}</p>
        </div>
      </div>

      {!toggleSidebar && (
        <div
          className={`absolute top-7 right-[-12px] transition-transform duration-300 ease-in-out`}
          onClick={handleToggleSidebar}
        >
          <Image
            src={Sidebaricon}
            alt="Sidebaricon"
            className={`cursor-pointer rotate-180 bg-white`}
          />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
