import React from "react";
import NavigationSidebar from "@/components/organisms/NavigationSidebar";

const Layout = ({ children }) => {
  return (
    <div className="h-screen bg-gray-50">
      <NavigationSidebar />
      <div className="lg:pl-64 flex flex-col flex-1">
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;