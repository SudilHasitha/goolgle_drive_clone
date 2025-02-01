import { FileText } from "lucide-react"

const documents = [
  { name: "Report.docx", icon: FileText },
  { name: "Presentation.pptx", icon: FileText },
  { name: "Spreadsheet.xlsx", icon: FileText },
]

export default function Documents() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Documents</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {documents.map((doc) => (
          <div key={doc.name} className="bg-gray-800 p-4 rounded-md flex items-center cursor-pointer hover:bg-gray-700">
            <doc.icon className="h-8 w-8 mr-2 text-blue-400" />
            <span>{doc.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

