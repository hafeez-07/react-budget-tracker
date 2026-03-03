import { FaSun, FaMoon } from "react-icons/fa";

type Props = {
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
  // setIsDark: (value:boolean | ((prev:boolean) => boolean))=>void
};

const Navbar = ({ isDark, setIsDark }: Props) => {
  return (
    <div
      className="sticky top-0 z-50 backdrop-blur-md 
bg-white/70 border-b border-zinc-200 
dark:bg-zinc-900/70 dark:border-zinc-800 
transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Budget Tracker
        </h1>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-xl 
bg-zinc-200 hover:bg-zinc-300 
dark:bg-zinc-800 dark:hover:bg-zinc-700 
transition"
          >
            {isDark ? (
              <FaSun className="text-yellow-400" />
            ) : (
              <FaMoon className="text-gray-700" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
