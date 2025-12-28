"use client";
import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LogOut, User as UserIcon, CreditCard, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useFiles } from "@/context/FileContext";

function UserButton() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const dropdownRef = useRef(null);
  const { files } = useFiles();

  // Get user plan based on file count
  const getUserPlan = () => {
    if (!files) return "Free";
    const fileCount = files.length;
    if (fileCount <= 5) return "Free";
    if (fileCount <= 20) return "Medium";
    return "Pro";
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    
    function handleEscape(event) {
      if (event.key === "Escape") {
        setShowProfileModal(false);
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  if (!user) return null;

  const planBadgeStyles = {
    Free: "bg-gray-100 text-gray-700 border-gray-200",
    Medium: "bg-blue-50 text-blue-700 border-blue-200",
    Pro: "bg-purple-50 text-purple-700 border-purple-200",
  };

  const currentPlan = getUserPlan();

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-label="User menu"
        >
          <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200">
            {user.imageUrl ? (
              <Image
                src={user.imageUrl}
                alt={user.fullName}
                width={36}
                height={36}
                className="object-cover"
              />
            ) : (
              <UserIcon className="text-gray-600 w-5 h-5" />
            )}
          </div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-[100]"
            >
              {/* User info */}
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.fullName}
                </p>
                <p className="text-xs text-gray-500 truncate mt-0.5">
                  {user.email}
                </p>
                <div className="mt-2">
                  <span className={`inline-block text-xs px-2 py-1 rounded border ${planBadgeStyles[currentPlan]}`}>
                    {currentPlan} Plan
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="py-1">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setShowProfileModal(true);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Eye size={16} />
                  View profile
                </button>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    router.push("/dashboard/upgrade");
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <CreditCard size={16} />
                  Manage plan
                </button>
              </div>

              {/* Logout */}
              <div className="border-t border-gray-100 py-1">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    signOut();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <LogOut size={16} />
                  Sign out
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Profile Modal */}
      <AnimatePresence>
        {showProfileModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setShowProfileModal(false)}
              className="fixed inset-0 bg-black/40 z-[200] backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[201] flex items-center justify-center p-4"
              onClick={() => setShowProfileModal(false)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-lg shadow-xl max-w-md w-full"
              >
                {/* Header */}
                <div className="px-6 py-5 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Profile
                  </h2>
                </div>

                {/* Content */}
                <div className="px-6 py-6 space-y-6">
                  {/* Avatar and name */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-gray-200">
                      {user.imageUrl ? (
                        <Image
                          src={user.imageUrl}
                          alt={user.fullName}
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                      ) : (
                        <UserIcon className="text-gray-600 w-8 h-8" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-gray-900">
                        {user.fullName}
                      </h3>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  {/* Plan info */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-600">
                        Current plan
                      </span>
                      <span className={`text-sm px-2 py-1 rounded border ${planBadgeStyles[currentPlan]}`}>
                        {currentPlan}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>PDFs uploaded</span>
                        <span className="font-medium text-gray-900">
                          {files?.length || 0} / {currentPlan === "Free" ? 5 : currentPlan === "Medium" ? 20 : 50}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setShowProfileModal(false);
                        router.push("/dashboard/upgrade");
                      }}
                      className="w-full px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      {currentPlan === "Free" ? "Upgrade plan" : "Change plan"}
                    </button>
                    <button
                      onClick={() => {
                        setShowProfileModal(false);
                        signOut();
                      }}
                      className="w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      Sign out
                    </button>
                  </div>
                </div>

                {/* Footer note */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 rounded-b-lg">
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Your data is private and encrypted. Only you can access your files.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default UserButton;
