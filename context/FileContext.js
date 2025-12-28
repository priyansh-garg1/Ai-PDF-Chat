"use client";
import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { useUser } from "./AuthContext";

const FileContext = createContext();

export const FileProvider = ({ children }) => {
  const { user, isLoaded } = useUser();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Track the email to prevent refetching when user object changes but email stays the same
  const lastEmailRef = useRef(null);
  const isFetchingRef = useRef(false);

  const fetchFiles = useCallback(async (forceRefresh = false) => {
    const userEmail = user?.primaryEmailAddress?.emailAddress;
    
    if (!userEmail) {
      setFiles([]);
      setLoading(false);
      return;
    }

    // Prevent duplicate requests
    if (isFetchingRef.current && !forceRefresh) {
      return;
    }

    // Skip if email hasn't changed (unless force refresh)
    if (lastEmailRef.current === userEmail && !forceRefresh) {
      return;
    }

    isFetchingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`/api/pdf-file?userEmail=${userEmail}`);
      setFiles(response.data || []);
      lastEmailRef.current = userEmail;
    } catch (err) {
      console.error("Error fetching files:", err);
      setError(err);
      setFiles([]);
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, [user?.primaryEmailAddress?.emailAddress]);

  // Fetch files when user is loaded and available
  useEffect(() => {
    if (isLoaded && user) {
      fetchFiles();
    } else if (isLoaded && !user) {
      setFiles([]);
      setLoading(false);
    }
  }, [isLoaded, user?.primaryEmailAddress?.emailAddress, fetchFiles]);

  // Method to manually refresh files
  const refreshFiles = useCallback(() => {
    return fetchFiles(true);
  }, [fetchFiles]);

  // Optimistic update when a file is added
  const addFile = useCallback((newFile) => {
    setFiles(prevFiles => [newFile, ...prevFiles]);
  }, []);

  const value = {
    files,
    loading,
    error,
    refreshFiles,
    addFile,
  };

  return (
    <FileContext.Provider value={value}>
      {children}
    </FileContext.Provider>
  );
};

export const useFiles = () => {
  const context = useContext(FileContext);
  if (context === undefined) {
    throw new Error("useFiles must be used within a FileProvider");
  }
  return context;
};
