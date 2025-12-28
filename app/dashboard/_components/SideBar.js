"use client";
import { Progress } from "@/components/ui/progress";
import { Layout, Shield } from "lucide-react";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useFiles } from "@/context/FileContext";

function SideBar() {
  const path = usePathname();
  const { files } = useFiles();

  const menuItems = [
    { icon: Layout, label: "Workspace", href: "/dashboard" },
    { icon: Shield, label: "Upgrade", href: "/dashboard/upgrade" },
  ];

  return (
    <aside className="h-screen bg-gray-50 border-r border-gray-200 flex flex-col">
      <nav className="p-4 flex-1">
        <div className="space-y-1 mt-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = path === item.href;
            
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>

      {files && (
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-xs font-medium text-gray-700">
                  Storage
                </span>
                <span className="text-xs text-gray-500">
                  {files.length} / 5
                </span>
              </div>
              <Progress value={(files.length / 5) * 100} className="h-1.5" />
            </div>
            
            <p className="text-xs text-gray-500 leading-relaxed">
              {files.length >= 5
                ? "You've reached your limit. Upgrade to add more."
                : `${5 - files.length} PDFs remaining on Free plan.`}
            </p>
            
            {files.length >= 5 && (
              <Link href="/dashboard/upgrade">
                <button className="w-full text-xs px-3 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                  Upgrade now
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </aside>
  );
}

export default SideBar;
