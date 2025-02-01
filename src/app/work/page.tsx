import { Folder, FileText } from "lucide-react"

const workFiles = [
  { name: "Project A", icon: Folder, type: "folder" },
  { name: "Project B", icon: Folder, type: "folder" },
  { name: "Meeting Notes.docx", icon: FileText, type: "file" },
  { name: "Budget.xlsx", icon: FileText, type: "file" },
]

export default function Work() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Work</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {workFiles.map((file) => (
          <div
            key={file.name}
            className="bg-gray-800 p-4 rounded-md flex items-center cursor-pointer hover:bg-gray-700"
          >
            <file.icon className="h-8 w-8 mr-2 text-yellow-400" />
            <span>{file.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

