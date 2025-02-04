import Link from "next/link"
import { Folder, FileText, Image } from "lucide-react"

const topLevelFolders = [
  { name: "Documents", icon: Folder, path: "/documents" },
  { name: "Images", icon: Folder, path: "/images" },
  { name: "Work", icon: Folder, path: "/work" },
]

const mockFiles = [
  { name: "Report.docx", icon: FileText, type: "file" },
  { name: "Presentation.pptx", icon: FileText, type: "file" },
  { name: "Profile.jpg", icon: Image, type: "file" },
]

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Drive</h1>

      {/* Top-level folders */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Folders</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {topLevelFolders.map((folder) => (
            <Link href={folder.path} key={folder.name}>
              <div className="bg-gray-800 p-4 rounded-md flex items-center cursor-pointer hover:bg-gray-700">
                <folder.icon className="h-8 w-8 mr-2 text-blue-400" />
                <span>{folder.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Files */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Files</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mockFiles.map((file) => (
            <div
              key={file.name}
              className="bg-gray-800 p-4 rounded-md flex items-center cursor-pointer hover:bg-gray-700"
            >
              <file.icon className="h-8 w-8 mr-2 text-blue-400" />
              <span>{file.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

