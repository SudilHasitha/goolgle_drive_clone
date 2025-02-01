import { Search, User } from "lucide-react"

export function Header() {
  return (
    <header className="bg-gray-800 p-4 flex items-center justify-between">
      <div className="flex items-center bg-gray-700 rounded-md">
        <Search className="h-5 w-5 text-gray-400 ml-2" />
        <input
          type="text"
          placeholder="Search in Drive"
          className="bg-transparent border-none focus:outline-none text-white p-2"
        />
      </div>
      <div className="flex items-center">
        <button className="bg-gray-700 p-2 rounded-full">
          <User className="h-5 w-5 text-gray-300" />
        </button>
      </div>
    </header>
  )
}

