import React from "react";
import { FaStar, FaUsers, FaShieldAlt, FaBolt } from "react-icons/fa";

function SocialProof() {
  const stats = [
    {
      icon: <FaUsers className="text-lime-600 text-xl" />,
      value: "10,000+",
      label: "Active Knowledge Builders",
    },
    {
      icon: <FaStar className="text-yellow-500 text-xl" />,
      value: "4.9/5",
      label: "Average User Rating",
    },
    {
      icon: <FaBolt className="text-amber-500 text-xl" />,
      value: "< 0.2s",
      label: "Instant Search Speed",
    },
    {
      icon: <FaShieldAlt className="text-blue-500 text-xl" />,
      value: "100%",
      label: "Private & Encrypted",
    },
  ];

  return (
    <section className="w-full bg-white py-12 px-6 border-b border-zinc-200 cursor-default">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-10">
        {/* Top Mini-Header with Avatars */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="flex -space-x-3 overflow-hidden">
            <img
              className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces"
              alt="User avatar"
            />
            <img
              className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces"
              alt="User avatar"
            />
            <img
              className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces"
              alt="User avatar"
            />
            <img
              className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces"
              alt="User avatar"
            />
          </div>
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-1 text-yellow-500 mb-0.5">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-xs" />
              ))}
            </div>
            <p className="text-sm font-medium text-zinc-600">
              Loved by professionals from{" "}
              <span className="text-zinc-900 font-semibold">
                Notion, Obsidian, and Roam alternatives
              </span>
              .
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full pt-4 border-t border-zinc-100">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center sm:items-start p-4 rounded-xl bg-zinc-50 border border-zinc-100 hover:bg-zinc-100/60 transition-colors"
            >
              <div className="p-2.5 rounded-lg bg-white shadow-sm mb-3">
                {stat.icon}
              </div>
              <h4 className="text-2xl font-extrabold text-zinc-900 tracking-tight">
                {stat.value}
              </h4>
              <p className="text-xs sm:text-sm text-zinc-500 font-medium text-center sm:text-left">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SocialProof;
