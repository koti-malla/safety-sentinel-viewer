import React from "react";
import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="pl-0 md:pl-64 min-h-screen">
        <DashboardHeader />
        <div className="container py-4 md:py-8 px-4 md:px-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;