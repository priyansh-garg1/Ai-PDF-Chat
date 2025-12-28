"use client";
import React from "react";
import { FileProvider } from "@/context/FileContext";

function WorkspaceLayout({ children }) {
  return <FileProvider>{children}</FileProvider>;
}

export default WorkspaceLayout;
