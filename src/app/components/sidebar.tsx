"use client"

import { Folder, Image, FileText, Briefcase } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const folders = [
  { name: "My Drive", icon: Folder, path: "/" },
  { name: "Documents", icon: FileText, path: "/documents" },
  { name: "Images", icon: Image, path: "/images" },
  { name: "Work", icon: Briefcase, path: "/work" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-gray-800 p-4">
      <nav>
        <ul>
          {folders.map((folder) => (
            <li key={folder.name} className="mb-2">
              <Link
                href={folder.path}
                className={`flex items-center text-gray-300 hover:text-white ${
                  pathname === folder.path ? "bg-gray-700 text-white" : ""
                } rounded-md p-2`}
              >
                <folder.icon className="mr-2 h-5 w-5" />
                {folder.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

