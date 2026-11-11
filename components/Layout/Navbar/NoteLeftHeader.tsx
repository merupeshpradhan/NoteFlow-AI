import {
  FaBook,
  FaStar,
  FaGraduationCap,
  FaBullhorn,
  FaFilm,
  FaTimes,
} from "react-icons/fa";
import SignOut from "../../Auth/SignOut.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

function NoteLeftHeader({ isOpen, onClose, onGoToAllNotes, onSelectContent }) {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  const [user, setUser] = useState({ name: "", email: "" });

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
    <section>
      {/* Mobile Overlay Background */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900/90 backdrop-blur-xl border-r border-slate-800 flex flex-col justify-between shadow-2xl md:shadow-none transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Top Section: Brand & Search */}
        <div>
          <div className="flex items-center justify-between px-6 py-4.5 border-b border-slate-800/80">
            <div
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                onGoToAllNotes();
                navigate("/notes");
              }}
              // onClick={navigate}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <span className="w-3.5 h-3.5 rounded-full bg-teal-500 inline-block ring-4 ring-teal-500/25"></span>
              <span className="font-bold text-lg tracking-tight text-white">
                NoteSpace
              </span>
            </div>
            {/* Close button for mobile screens */}
            <button
              onClick={onClose}
              className="lg:hidden text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
            >
              <FaTimes className="text-lg" />
            </button>
          </div>

          <div className="px-4 pt-5 cursor-default">
            <div className="relative bg-slate-900/60 border border-slate-800/80 rounded-2xl p-3 backdrop-blur-xl flex items-center gap-3 group hover:border-teal-500/40 transition-all duration-300">
              {/* Compact Animated GIF Thumbnail */}
              <div className="relative w-11 h-11 shrink-0 rounded-xl bg-slate-950 border border-slate-800 p-1 flex items-center justify-center overflow-hidden shadow-inner group-hover:border-teal-500/50">
                <div className="absolute inset-0 bg-teal-500/10 blur-sm"></div>
                <img
                  src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2ZsOTNmamc3cDYzMnlzZzV4eXdvZzc3d2NpYndtbDZxNTRubWc5OCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/WNhxL5edM8Tn6aISYh/giphy.gif"
                  alt="Productivity"
                  className="relative z-10 w-full h-full object-contain filter drop-shadow-sm"
                />
              </div>

              {/* Dynamic Status / Quick Info */}
              <div className="flex flex-col justify-center min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
                  <span className="text-[9px] uppercase tracking-wider font-mono text-teal-400 font-semibold">
                    Synced
                  </span>
                </div>
                <h3 className="text-xs font-bold text-slate-100 tracking-tight truncate">
                  Cloud Ready
                </h3>
                <p className="text-[10px] text-slate-400 truncate">
                  All notes are synced
                </p>
              </div>
            </div>
          </div>

          {/* Main Navigation Links */}
          <div className="px-4 py-6 space-y-6">
            <div className="space-y-1">
              <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Menu
              </p>
              <button
                onClick={() => {
                  onClose();
                  navigate("/notes");
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                  currentPath === "/notes" || currentPath === "/notes/all"
                    ? "bg-teal-500/10 text-teal-400 font-semibold border border-teal-500/20"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                }`}
              >
                <FaBook className="text-sm" />
                All Notes
              </button>
              <button
                onClick={() => {
                  navigate("/notes/favorites");
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                  currentPath === "/notes/favorites"
                    ? "bg-teal-500/10 text-teal-400 font-semibold border border-teal-500/20"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                }`}
              >
                <FaStar className="text-sm" />
                Favorites
              </button>
            </div>

            {/* Categories / Folders */}
            <div className="space-y-1">
              <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Categories
              </p>
              <button
                onClick={() => {
                  navigate("/notes/study");
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                  currentPath === "/notes/study"
                    ? "bg-slate-800 text-white font-semibold border border-slate-700"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                }`}
              >
                <FaGraduationCap className="text-teal-400 text-sm" />
                Study Times
              </button>
              <button
                onClick={() => {
                  navigate("/notes/marketing");
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                  currentPath === "/notes/marketing"
                    ? "bg-slate-800 text-white font-semibold border border-slate-700"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                }`}
              >
                <FaBullhorn className="text-amber-400 text-sm" />
                Marketing Dates
              </button>
              <button
                onClick={() => {
                  navigate("/notes/movies");
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                  currentPath === "/notes/movies"
                    ? "bg-slate-800 text-white font-semibold border border-slate-700"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                }`}
              >
                <FaFilm className="text-indigo-400 text-sm" />
                Movie Watching
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section: User Profile & SignOut */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/30">
          <button
            onClick={() => {
              navigate("/notes/profile");
              onClose();
            }}
            className="flex items-center gap-3 mb-3 px-2 cursor-pointer w-full text-left"
          >
            <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 font-semibold text-sm border border-slate-700 ">
              <img
                src={
                  user?.avatar ||
                  "https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif"
                }
                alt={user?.name || "User Profile"}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-slate-200 truncate">
                Account Profile
              </p>
              <p className="text-xs text-slate-500 truncate">Active session</p>
            </div>
          </button>

          <div className="grid gap-2">
            <SignOut className="w-full border border-slate-800 rounded-xl py-2 text-xs font-semibold bg-slate-900 text-slate-300 hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/30 transition-all cursor-pointer shadow-sm" />
          </div>
        </div>
      </aside>
    </section>
  );
}

export default NoteLeftHeader;
