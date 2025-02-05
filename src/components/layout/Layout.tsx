import React from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="pl-0 md:pl-64 min-h-screen">
        <div className="container py-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;