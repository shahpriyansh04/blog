import { SearchIcon } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  //Make a navbar with tailwind
  return (
    <div>
      <div className="flex justify-between items-center px-24 py-4">
        <p className="text-2xl font-bold text-gray-800"> Blog</p>
        <div className="flex space-x-6 bg-gray-100 p-4">
          <SearchIcon className="h-6 w-6" />
          <input
            type="text"
            placeholder="Search"
            className="border-none outline-none bg-gray-100"
          />
        </div>
        <div className="flex">
          <ThemeToggle />
        </div>
      </div>
      <hr />
    </div>
  );
}
