import "./globals.css"
import { Inter } from "next/font/google"
import { Sidebar } from "./components/sidebar"
import { Header } from "./components/header"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Google Drive Clone",
  description: "A Google Drive clone with dark mode",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-900 text-gray-100`}>
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex flex-col flex-1">
            <Header />
            <main className="flex-1 overflow-y-auto p-4">{children}</main>
          </div>
        </div>
      </body>
    </html>
  )
}

