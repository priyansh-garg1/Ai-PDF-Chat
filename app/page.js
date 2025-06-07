"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CardsDetails = [
  {
    title: "Upload Multiple PDFs",
    desc: "Manage and analyze all your documents in one place.",
  },
  {
    title: "Ask AI Anything",
    desc: "Interact with your notes and get instant intelligent answers.",
  },
  {
    title: "Lightning-Fast Responses",
    desc: "Optimized for fast and accurate response times.",
  },
  {
    title: "Simple & Clean UI",
    desc: "Designed to help you focus on learning without distractions.",
  },
  {
    title: "Secure and Private",
    desc: "Your data is encrypted and securely stored.",
  },
  {
    title: "Flexible Subscription Plans",
    desc: "Plans that grow with your needs and usage.",
  },
];

export default function Home() {
  const { user } = useUser();
  const createUser = useMutation(api.user.createUser);
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);
  const [showMobileWarning, setShowMobileWarning] = useState(false);

  useEffect(() => {
    if (user) {
      CheckUser();
    }
  }, [user]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
    }
  }, []);

  const CheckUser = async () => {
    await createUser({
      userName: user?.fullName,
      email: user?.primaryEmailAddress?.emailAddress,
      imageUrl: user?.imageUrl,
    });
  };

  const handleGetStarted = () => {
    if (isMobile) {
      setShowMobileWarning(true);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="bg-white text-gray-900">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
        {/* Header */}
        <header className="w-full py-5 px-6 border-b border-gray-200 flex items-center justify-between z-50 relative">
          <div className="pl-4">
            <Image src="/logo.png" alt="Logo" width={40} height={40} />
          </div>

          <nav className=" space-x-6 sm:block">
            <div className="flex gap-4">
              <Link href="#features">
                <motion.p
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-gray-700 hover:text-indigo-600 transition cursor-pointer"
                >
                  Features
                </motion.p>
              </Link>
              <Link href="/dashboard/upgrade">
                <motion.p
                  whileHover={{ scale: 1.05 }}
                  animate={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: -10 }}
                  className="text-gray-700 hover:text-indigo-600 transition cursor-pointer"
                >
                  Pricing
                </motion.p>
              </Link>
            </div>
          </nav>
        </header>

        {/* Hero Section with animated gradient */}
        <section className="relative text-center h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
          {/* Background animation layer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            className="absolute inset-0 bg-[radial-gradient(#fff3_1px,transparent_1px)] bg-[size:20px_20px] z-0"
          />
          <div className="relative z-10 max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-5xl sm:text-6xl font-extrabold mb-6 leading-tight"
            >
              Unlock the {" "}
              <span className="text-emerald-500"> Power of Your PDFs </span>
                with Intelligent <span className="text-indigo-600">AI Note-Taking</span>  
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-xl text-gray-800 mb-10"
            >
              Upload your notes, ask AI-powered questions, and get instant,{" "}
              <span className="font-semibold text-indigo-700">
                accurate answers
              </span>
              . Effortlessly take notes, highlight key points, and get instant
              answers — all within your PDFs.
            </motion.p>

            <motion.button
              onClick={handleGetStarted}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="inline-block px-10 py-4 z-10 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:bg-indigo-700"
            >
              Try It Now — Free
            </motion.button>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-6 bg-white">
          <div className="absolute inset-0">
            <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(69,184,199,0.5)] opacity-50 blur-[80px]" />
          </div>
          <div className="max-w-6xl mx-auto text-center">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-semibold mb-6 text-gray-900"
            >
              Why Choose AI Note PDF?
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 mb-12"
            >
              Explore powerful features crafted for your note-taking experience.
            </motion.p>

            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 px-4">
              {CardsDetails.map(({ title, desc }) => (
                <motion.div
                  key={title}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 150 }}
                  className="bg-gray-50 p-6 rounded-xl border shadow-sm hover:shadow-lg transition"
                >
                  <h4 className="text-lg font-medium text-indigo-700 mb-2">
                    {title}
                  </h4>
                  <p className="text-gray-600 text-sm">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          id="contact"
          className="py-10 px-6 bg-gradient-to-r from-gray-100 to-gray-200 mt-10"
        >
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-gray-800">Made with ❤️ for productivity</p>
            <p className="text-sm text-gray-700">
              Built for learners, students, and professionals.
            </p>
            <p className="mt-2 text-sm text-gray-600">
              &copy; {new Date().getFullYear()} AI Note PDF. All rights
              reserved.
            </p>
          </div>
        </footer>

        {/* Mobile Warning Modal */}
        {showMobileWarning && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-sm text-center space-y-4">
              <p className="text-lg font-semibold text-gray-800">
                For the best experience, please open this app on a desktop or
                use the mobile app.
              </p>
              <div className="flex justify-center gap-4">
                <a
                  href="https://play.google.com/store/apps/details?id=YOUR_APP_ID" // replace with your real app store URL
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Download App
                </a>
                <button
                  onClick={() => setShowMobileWarning(false)}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
