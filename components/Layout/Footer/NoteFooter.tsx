import React from "react";

function NoteFooter() {
  return (
    <footer className="w-full py-5 px-6 border-t border-slate-800 bg-slate-900/50 backdrop-blur-md text-slate-400 text-xs flex flex-col sm:flex-row items-center justify-between gap-2 rounded-2xl cursor-default">
      <p>&copy; {new Date().getFullYear()} NoteSpace. All rights reserved.</p>

      <div className="flex items-center gap-4">
        {/* Live sync/status indicator */}
        <span className="flex items-center gap-1.5 text-teal-400 font-medium">
          <span className="w-2 h-2 rounded-full bg-teal-500 inline-block animate-pulse"></span>
          All changes saved
        </span>

        <span className="text-slate-700">|</span>

        <a href="#help" className="hover:text-slate-200 transition-colors">
          Help
        </a>
        <a href="#privacy" className="hover:text-slate-200 transition-colors">
          Privacy
        </a>
      </div>
    </footer>
  );
}

export default NoteFooter;