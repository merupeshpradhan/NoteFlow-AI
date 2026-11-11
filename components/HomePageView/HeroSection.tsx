import Link from "next/link";

function HeroSection({ handleSignIn }) {
  return (
    <section className="relative w-full min-h-[70vh] lg:h-[80vh] flex items-center justify-center bg-linear-to-br from-lime-400 to-lime-600 px-6 py-12 lg:px-16 overflow-hidden cursor-default">
      <div className="max-w-7xl w-full mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Text Content */}
        <div className="text-black flex flex-col items-start text-left max-w-xl space-y-6">
          <span className="px-3 py-1 text-xs font-semibold uppercase tracking-widest bg-lime-800 text-lime-100 rounded-full">
            Your Second Brain
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight font-extrabold leading-tight">
            Capture, Organize & Find Your Ideas Instantly
          </h1>

          <p className="text-lg lg:text-xl text-zinc-900 font-medium">
            The all-in-one workspace for your notes, tasks, and personal
            knowledge.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full pt-2">
            <button
              onClick={handleSignIn}
              className="px-8.5 py-4 bg-black text-white font-semibold rounded-xl shadow-lg hover:bg-zinc-800 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <p>Get started</p>
            </button>
            <button className="px-6 py-4 bg-lime-300/60 text-black font-semibold rounded-xl hover:bg-lime-300 transition-all duration-200">
              <Link href="about">Learn more &rarr;</Link>
            </button>
          </div>
        </div>

        {/* Image / Visual Preview */}
        <div className="relative w-full max-w-md lg:max-w-lg flex justify-center">
          {/* Decorative glow background effect */}
          <div className="absolute -inset-1 bg-lime-300 rounded-3xl blur-xl opacity-70 animate-pulse"></div>

          <img
            src="/NoteSpace-home-view.png"
            alt="Note app dashboard preview"
            width={600}
            className="relative rounded-2xl shadow-2xl border border-lime-300/40 object-cover w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
