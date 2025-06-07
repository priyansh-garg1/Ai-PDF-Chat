import "./globals.css";
import { Outfit } from "next/font/google";
import Provider from "./provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "PDF Editor",
  description: "Edit your PDF files with ease",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={outfit.className}>
          <Provider>{children}
          </Provider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
