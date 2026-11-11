import { FaSearch, FaBell, FaBars, FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function NoteTopHeader({
  onOpenSidebar,
  clickNewNote,
  onSelectContent,
  searchText,
  setSearchText,
}) {
  const [user, setUser] = useState({ name: "", email: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        setUser({ name: "User", email: "" });

        toast.update(toastId, {
          render: "Please signIn again to access your notes.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });

        console.log(error);
        navigate("/");
      }
    }
  }, []);

  return (
    <header className="fixed top-0 left-0 lg:left-72 right-0 h-16 bg-slate-900/85 backdrop-blur-xl border-b border-slate-800 px-3 sm:px-6 md:px-8 flex items-center justify-between z-30 shadow-lg gap-2 sm:gap-4">
      {/* Left side: Mobile Hamburger & Search */}
      <div className="flex items-center gap-2 sm:gap-3 flex-1 max-w-xs sm:max-w-md">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
          aria-label="Open Sidebar"
        >
          <FaBars className="text-base sm:text-lg" />
        </button>

        <div className="relative w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500">
            <FaSearch className="text-xs" />
          </span>
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search notes..."
            className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 sm:py-2 text-[11px] sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
          />
        </div>
      </div>

      {/* Right side: Notifications & Profile */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        {/* Responsive Create Note Button */}
        <button
          onClick={clickNewNote}
          className="flex items-center gap-1.5 sm:gap-2 bg-teal-500 hover:bg-teal-600 text-slate-950 font-semibold px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm shadow-md hover:shadow-teal-500/20 transition-all duration-200 cursor-pointer active:scale-95 shrink-0"
        >
          <FaPlus className="text-[10px] sm:text-xs" />
          <span className="hidden xs:inline sm:inline">New Note</span>
        </button>

        {/* User Details */}
        <div className="flex items-center gap-2 sm:gap-3 pl-2 border-l border-slate-800">
          <div className="text-right hidden md:block cursor-default">
            <p className="text-xs font-semibold text-slate-200 truncate max-w-30">
              {user?.name || "User"}
            </p>
            <p className="text-[10px] text-slate-500 truncate max-w-30">
              {user?.email || ""}
            </p>
          </div>
          <div
            onClick={() => {
              onSelectContent("profile");
              navigate("/notes/profile");
            }}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-slate-300 text-xs shrink-0 cursor-pointer"
          >
            <img
              src={
                user?.avatar ||
                "https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif"
              }
              alt={user?.name || "User Profile"}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default NoteTopHeader;
