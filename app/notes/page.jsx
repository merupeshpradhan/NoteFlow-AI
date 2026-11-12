import { useEffect, useState } from "react";
import NoteLeftHeader from "../../components/Layout/Navbar/NoteLeftHeader.tsx";
import NoteTopHeader from "../../components/Layout/Navbar/NoteTopHeader.tsx";
import NoteList from "../../components/NotePage/NoteList.tsx";
import NoteFooter from "../../components/Layout/Footer/NoteFooter.tsx";
import Profile from "../../components/UserView/Profile.tsx";
import StudyTime from "../../components/NotePage/CateGories/StudyTime.tsx";
import FavoritesNotes from "../../components/NotePage/CateGories/FavoriteNotes.tsx";
import Marketing from "../../components/NotePage/CateGories/Marketing.jsx";
import MovieWatching from "../../components/NotePage/CateGories/MovieWatching.tsx";
import CreateNote from "../../components/NotePage/CreateNote.tsx";
import api from "../../Api/api.js";
import { FaStar, FaRegStar } from "react-icons/fa";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [viewCreateNot, setViewCreateNote] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [updateNoteView, setUpdateNoteView] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  // Get active sidebar item from URL
  const activeTab =
    currentPath === "/notes"
      ? "all"
      : currentPath === "/notes/favorites"
        ? "favorites"
        : currentPath === "/notes/study"
          ? "study"
          : currentPath === "/notes/marketing"
            ? ""
            : currentPath === "/notes/movies"
              ? "movies"
              : currentPath === "/notes/profile"
                ? "profile"
                : "all";

  // =========================================================
  // FETCH NOTES
  // =========================================================

  async function fetchNote() {
    try {
      const res = await api.get("/note");

      setNotes(res.data.notes || []);
    } catch (error) {
      console.log(error);

      toast.error("Please sign in again to see your notes.", {
        autoClose: 3000,
        toastId: "fetch-notes-error",
      });

      navigate("/");
    }
  }

  useEffect(() => {
    fetchNote();
  }, []);

  // =========================================================
  // SEARCH
  // =========================================================

  const filterNotes = notes.filter((note) =>
    note?.noteName?.toLowerCase().includes(searchText.toLowerCase()),
  );

  // =========================================================
  // DELETE NOTE
  // =========================================================

  async function handleDeleteNote(noteId) {
    setLoading(true);

    try {
      await api.delete(`/note/notedelete/${noteId}`);

      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));

      toast.success("Note deleted successfully!", {
        autoClose: 3000,
      });
    } catch (error) {
      console.log(error);

      toast.error("Failed to delete note.");
    } finally {
      setLoading(false);
    }
  }

  // =========================================================
  // UPDATE NOTE
  // =========================================================

  async function handleUpdateSuccess(updatedNote) {
    await fetchNote();
  }

  // =========================================================
  // STAR NOTE
  // =========================================================

  async function handleStarNote(noteId) {
    try {
      const res = await api.post(`/note/star/${noteId}`);

      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === noteId
            ? {
                ...note,
                isStarred: !note.isStarred,
              }
            : note,
        ),
      );

      toast.success(res.data.message || "Note star updated!");
    } catch (error) {
      console.log(error);

      toast.error("Failed to update star status.");
    }
  }

  return (
    <div className="relative flex min-h-screen overflow-x-hidden bg-slate-950 text-slate-100 selection:bg-teal-500 selection:text-white">
      {/* =========================================================
          BACKGROUND AMBIENT GLOW
      ========================================================== */}

      <div className="pointer-events-none absolute left-1/4 top-0 h-96 w-96 rounded-full bg-teal-500/10 blur-[120px]" />

      <div className="pointer-events-none absolute bottom-10 right-10 h-96 w-96 rounded-full bg-indigo-500/10 blur-[120px]" />

      {/* =========================================================
          LEFT SIDEBAR
      ========================================================== */}

      <NoteLeftHeader
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onGoToAllNotes={() => {
          setIsSidebarOpen(false);
          setSearchText("");
        }}
        onSelectContent={() => {
          setIsSidebarOpen(false);
        }}
      />

      {/* =========================================================
          MAIN CONTENT

          IMPORTANT:
          lg:pl-72 instead of md:pl-72

          Tablet:
          768px - 1023px = no sidebar padding

          Laptop/Desktop:
          1024px+ = sidebar padding
      ========================================================== */}

      <div className="relative z-10 flex min-w-0 flex-1 flex-col transition-all duration-300 lg:pl-72">
        {/* =======================================================
            TOP HEADER
        ======================================================== */}

        <NoteTopHeader
          onOpenSidebar={() => setIsSidebarOpen(true)}
          clickNewNote={() => setViewCreateNote(true)}
          onSelectContent={() => {
            setIsSidebarOpen(false);
          }}
          searchText={searchText}
          setSearchText={setSearchText}
        />

        {/* =======================================================
            MAIN
        ======================================================== */}

        <main className="flex flex-1 flex-col justify-between px-3 pb-12 pt-24 sm:px-6 lg:px-8">
          <div className="w-full animate-in fade-in zoom-in-95 fill-mode-forwards space-y-6 duration-300">
            {searchText === "" ? (
              <>
                {/* ALL NOTES */}

                {currentPath === "/notes" && (
                  <NoteList
                    notes={notes}
                    updateNoteView={updateNoteView}
                    setUpdateNoteView={setUpdateNoteView}
                    selectedNote={selectedNote}
                    setSelectedNote={setSelectedNote}
                    handleStarNote={handleStarNote}
                    handleDeleteNote={handleDeleteNote}
                    handleUpdateSuccess={handleUpdateSuccess}
                  />
                )}

                {/* FAVORITES */}

                {currentPath === "/notes/favorites" && <FavoritesNotes />}

                {/* STUDY */}

                {currentPath === "/notes/study" && (
                  <StudyTime
                    notes={notes}
                    updateNoteView={updateNoteView}
                    setUpdateNoteView={setUpdateNoteView}
                    selectedNote={selectedNote}
                    setSelectedNote={setSelectedNote}
                    handleStarNote={handleStarNote}
                    handleDeleteNote={handleDeleteNote}
                    handleUpdateSuccess={handleUpdateSuccess}
                  />
                )}

                {/* MARKETING */}

                {currentPath === "/notes/marketing" && (
                  <Marketing
                    notes={notes}
                    updateNoteView={updateNoteView}
                    setUpdateNoteView={setUpdateNoteView}
                    selectedNote={selectedNote}
                    setSelectedNote={setSelectedNote}
                    handleStarNote={handleStarNote}
                    handleDeleteNote={handleDeleteNote}
                    handleUpdateSuccess={handleUpdateSuccess}
                  />
                )}

                {/* MOVIES */}

                {currentPath === "/notes/movies" && (
                  <MovieWatching
                    notes={notes}
                    updateNoteView={updateNoteView}
                    setUpdateNoteView={setUpdateNoteView}
                    selectedNote={selectedNote}
                    setSelectedNote={setSelectedNote}
                    handleStarNote={handleStarNote}
                    handleDeleteNote={handleDeleteNote}
                    handleUpdateSuccess={handleUpdateSuccess}
                  />
                )}

                {/* PROFILE */}

                {currentPath === "/notes/profile" && <Profile />}
              </>
            ) : (
              /* =================================================
                 SEARCH RESULTS
              ================================================== */

              <section className="w-full px-1 py-6 sm:px-3 lg:px-6">
                {/* Search Header */}

                <div className="mx-auto mb-8 w-full max-w-7xl">
                  <h2 className="flex items-center gap-3 text-xl font-bold tracking-tight text-white sm:text-2xl">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-teal-500/20 bg-teal-500/10 text-teal-400 shadow-inner">
                      🔍
                    </span>

                    <span className="min-w-0 wrap-break-word">
                      Search Results for "{searchText}"
                    </span>
                  </h2>

                  <p className="mt-2 text-sm text-slate-400">
                    Found {filterNotes.length} matching{" "}
                    {filterNotes.length === 1 ? "note" : "notes"}.
                  </p>
                </div>

                {/* No Results */}

                {filterNotes.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in-95 duration-500">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-700/50 bg-slate-800/60 text-2xl text-slate-400 shadow-inner">
                      🔍
                    </div>

                    <h3 className="text-xl font-semibold tracking-tight text-white">
                      No matching notes found
                    </h3>

                    <p className="mt-2 max-w-sm text-sm text-slate-400">
                      Try searching with a different keyword or check your
                      spelling.
                    </p>
                  </div>
                ) : (
                  /* =================================================
                     SEARCH NOTE GRID

                     Phone = 1 column
                     Tablet = 2 columns
                     Laptop = 2 columns
                     Large = 3 columns
                  ================================================== */

                  <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3">
                    {filterNotes.map((note, index) => (
                      <div
                        key={note.id}
                        style={{
                          animationDelay: `${index * 50}ms`,
                        }}
                        className="group relative flex min-w-0 flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/85 p-5 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-teal-500/40 hover:shadow-2xl hover:shadow-teal-500/10 sm:p-6 animate-in fade-in zoom-in-95 fill-mode-forwards"
                      >
                        {/* Hover Glow */}

                        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-b from-teal-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                        <div className="relative z-10 space-y-3">
                          {/* Type + Star */}

                          <div className="flex w-full items-center justify-between gap-3">
                            <div className="min-w-0">
                              {note.type ? (
                                <span className="inline-block max-w-full truncate rounded-lg border border-teal-500/20 bg-teal-500/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-teal-400 shadow-sm">
                                  {note.type}
                                </span>
                              ) : (
                                <span />
                              )}
                            </div>

                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-700/50 bg-slate-800/60">
                              {note.isStarred ? (
                                <FaStar className="text-sm text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                              ) : (
                                <FaRegStar className="text-sm text-slate-400" />
                              )}
                            </div>
                          </div>

                          {/* Title */}

                          <h4 className="line-clamp-1 text-lg font-bold tracking-tight text-white transition-colors group-hover:text-teal-400">
                            {note.noteName}
                          </h4>

                          {/* Description */}

                          <p className="line-clamp-4 wrap-break-words text-sm leading-relaxed text-slate-300">
                            {note.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}
          </div>
        </main>

        {/* =======================================================
            FOOTER
        ======================================================== */}

        <footer className="mt-auto pb-6">
          <div className="border-t border-slate-800/80 px-4 pt-6 sm:px-8">
            <NoteFooter />
          </div>
        </footer>
      </div>

      {/* =========================================================
          CREATE NOTE MODAL
      ========================================================== */}

      {viewCreateNot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg animate-in zoom-in-95 duration-200">
            <CreateNote
              onClose={() => setViewCreateNote(false)}
              setNotes={setNotes}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Notes;
