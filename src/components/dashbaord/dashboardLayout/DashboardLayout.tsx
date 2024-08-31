"use client";

import PrivateRoute from "@/components/privateRoute/PrivateRoute";
import React, { ReactNode } from "react";
import Sidebar from "./sidebar/Sidebar";
import Navbar from "./navbar/Navbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <main className="w-full h-screen flex flex-row justify-between ">
      <Sidebar />
      <div className="w-full h-full flex flex-col ">
        <div className="w-full h-fit border-b border-[#DADADA]">
          <Navbar />
        </div>
        <div className="w-full h-screen overflow-y-scroll pb-5">{children}</div>
      </div>
    </main>
  );
};

export default PrivateRoute(DashboardLayout);
