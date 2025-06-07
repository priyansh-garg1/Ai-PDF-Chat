"use client";

import { SignIn } from "@clerk/nextjs";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-indigo-200 px-4">
      <div className="bg-white/10  p-8 max-w-md w-full space-y-6">
        <motion.button
          onClick={() => router.push("/")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="absolute top-4 left-4 text-md  font-medium text-gray-600 hover:text-gray-800 transition border border-gray-300 rounded-lg px-4 py-2 shadow-sm hover:shadow-md"
        >
          ← Home
        </motion.button>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Welcome to <span className="text-indigo-600">AI Note PDF</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="items-center align text-gray-600 mb-6"
        >
          <SignIn />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-xs text-gray-600 text-center"
        >
          By continuing, you agree to our{" "}
          <button className="underline hover:text-indigo-600 transition">
            Terms
          </button>{" "}
          and{" "}
          <button className="underline hover:text-indigo-600 transition">
            Privacy Policy
          </button>
          .
        </motion.p>
      </div>
    </div>
  );
}
