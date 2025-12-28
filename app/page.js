"use client";

import { useUser } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Home() {
  const { user } = useUser();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
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
      
      const handleScroll = () => {
        setScrolled(window.scrollY > 20);
      };
      
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const CheckUser = async () => {
    try {
      await axios.post("/api/user", {
        userName: user?.fullName || "Anonymous",
        email: user?.primaryEmailAddress?.emailAddress,
        imageUrl: user?.imageUrl,
      });
    } catch (error) {
      console.error("Error syncing user:", error);
    }
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
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/80 backdrop-blur-md border-b border-gray-100" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="AI Note PDF" width={32} height={32} />
            <span className="text-lg font-medium text-gray-900">AI Note PDF</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-gray-600 hover:text-gray-900 transition">
              Features
            </Link>
            <Link href="/dashboard/upgrade" className="text-sm text-gray-600 hover:text-gray-900 transition">
              Pricing
            </Link>
            <Link href="#how-it-works" className="text-sm text-gray-600 hover:text-gray-900 transition">
              How it works
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            {user ? (
              <Link
                href="/dashboard"
                className="text-sm px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
              >
                Go to dashboard
              </Link>
            ) : (
              <>
                <Link href="/dashboard" className="hidden sm:block text-sm text-gray-600 hover:text-gray-900 transition">
                  Sign in
                </Link>
                <button
                  onClick={handleGetStarted}
                  className="text-sm px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
                >
                  Get started
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <section className="relative pt-32 pb-20 px-6 min-h-[85vh] flex items-center">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-[1.1] text-gray-900"
          >
            Turn PDFs into conversations
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg sm:text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto"
          >
            Ask questions. Get answers. Your documents become something you can actually talk to.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={handleGetStarted}
              className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition font-medium"
            >
              Start for free
            </button>
            <Link
              href="#how-it-works"
              className="px-8 py-3 text-gray-600 hover:text-gray-900 transition font-medium"
            >
              See how it works
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6 text-center"
          >
            <p className="text-lg text-gray-700 leading-relaxed">
              Reading through documents is slow. Taking notes is tedious. Remembering where you read something is impossible.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              This tool exists to make that easier. Upload a PDF, ask it questions, and get answers from the text itself. That's it.
            </p>
          </motion.div>
        </div>
      </section>

      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold mb-16 text-center text-gray-900"
          >
            How it works
          </motion.h2>

          <div className="space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row gap-8 items-start"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center font-medium">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Upload your document</h3>
                <p className="text-gray-600 leading-relaxed">
                  Drop a PDF into the tool. We'll read it and break it down so it's searchable.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col md:flex-row gap-8 items-start"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center font-medium">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Ask your question</h3>
                <p className="text-gray-600 leading-relaxed">
                  Type what you want to know in plain language. No special formatting needed.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col md:flex-row gap-8 items-start"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center font-medium">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Get an answer</h3>
                <p className="text-gray-600 leading-relaxed">
                  The system finds relevant sections and gives you a clear answer based on what's actually in your document.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="features" className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold mb-4 text-center text-gray-900"
          >
            Built to stay out of your way
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-600 mb-16 text-center max-w-2xl mx-auto"
          >
            No learning curve. No feature bloat. Just the essentials.
          </motion.p>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="md:col-span-2 bg-white p-10 rounded-lg border border-gray-200"
            >
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Search across everything you've uploaded
              </h3>
              <p className="text-gray-600 leading-relaxed">
                All your PDFs live in one workspace. Ask a question and get answers from any of them. No need to remember which file had what.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-8 rounded-lg border border-gray-200"
            >
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Take notes as you read</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Highlight passages, jot down thoughts. Your notes stay attached to the source.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-8 rounded-lg border border-gray-200"
            >
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Fast enough to not notice</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Answers come back quickly. You won't lose your train of thought waiting.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-8 rounded-lg border border-gray-200"
            >
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Simple pricing</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Start free. Pay only when you need more storage or usage.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white p-8 rounded-lg border border-gray-200"
            >
              <h3 className="text-lg font-semibold mb-3 text-gray-900">No clutter</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                We removed everything that wasn't essential. What's left just works.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gray-50 p-10 rounded-lg border border-gray-200"
          >
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 text-center">
              Your files are private
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                What you upload stays yours. We don't train models on your documents. We don't share your data. We don't read your files.
              </p>
              <p>
                Your PDFs and notes are encrypted and stored securely. Only you can access them.
              </p>
              <p className="text-sm text-gray-500 pt-2">
                If you delete your account, everything is permanently removed.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="py-16 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <Image src="/logo.png" alt="AI Note PDF" width={24} height={24} />
                <span className="font-medium text-gray-900">AI Note PDF</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Turn your documents into conversations.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#features" className="text-sm text-gray-600 hover:text-gray-900 transition">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/upgrade" className="text-sm text-gray-600 hover:text-gray-900 transition">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#how-it-works" className="text-sm text-gray-600 hover:text-gray-900 transition">
                    How it works
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900 transition">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900 transition">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900 transition">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900 transition">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="text-sm text-gray-600 hover:text-gray-900 transition">
                    Help
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100">
            <p className="text-sm text-gray-500 text-center">
              © {new Date().getFullYear()} AI Note PDF. Made for anyone who needs to understand their documents better.
            </p>
          </div>
        </div>
      </footer>

      {showMobileWarning && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-sm space-y-4">
            <p className="text-lg text-gray-800 leading-relaxed">
              This works better on desktop right now. We're still working on the mobile experience.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => setShowMobileWarning(false)}
                className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
