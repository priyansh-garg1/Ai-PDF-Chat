"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const response = await axios.get("/api/auth/me");
      if (response.data.user) {
        setUser(response.data.user);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoaded(true);
    }
  };

  const signIn = async (email, password) => {
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      setUser(response.data.user);
      toast.success("Logged in successfully!");
      router.push("/dashboard");
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
      return { success: false, message };
    }
  };

  const signUp = async (data) => {
    try {
      const response = await axios.post("/api/auth/register", data);
      setUser(response.data.user);
      toast.success("Account created successfully!");
      router.push("/dashboard");
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed";
      toast.error(message);
      return { success: false, message };
    }
  };

  const signOut = async () => {
    try {
      await axios.post("/api/auth/logout");
      setUser(null);
      toast.success("Logged out successfully!");
      router.push("/");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoaded,
        signIn,
        signUp,
        signOut,
        checkUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// For compatibility with useUser from Clerk (used in multiple places)
export const useUser = () => {
  const { user, isLoaded } = useAuth();
  
  // Map our user object to what Clerk useUser returns (approximately)
  const mappedUser = user ? {
    id: user.id,
    fullName: user.fullName,
    primaryEmailAddress: { emailAddress: user.email },
    emailAddresses: [{ emailAddress: user.email }],
    imageUrl: user.imageUrl,
  } : null;

  return { user: mappedUser, isLoaded, isSignedIn: !!user };
};
