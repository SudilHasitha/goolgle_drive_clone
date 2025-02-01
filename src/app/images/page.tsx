import { Image } from "lucide-react"

const images = [
  { name: "Profile.jpg", icon: Image },
  { name: "Vacation.png", icon: Image },
  { name: "Screenshot.png", icon: Image },
]

export default function Images() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Images</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.name} className="bg-gray-800 p-4 rounded-md flex items-center cursor-pointer hover:bg-gray-700">
            <img.icon className="h-8 w-8 mr-2 text-green-400" />
            <span>{img.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

