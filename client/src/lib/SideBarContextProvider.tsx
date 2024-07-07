"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface SidebarContextType {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

interface SidebarProviderProps {
  children: ReactNode;
}

const SideBarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: React.FC<SidebarProviderProps> = ({
  children,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <SideBarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </SideBarContext.Provider>
  );
};

export const useSidebar = (): SidebarContextType => {
  const context = useContext(SideBarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
