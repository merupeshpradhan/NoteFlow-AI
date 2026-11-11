"use client";

import { FaTwitter, FaGithub, FaLinkedin, FaArrowRight } from "react-icons/fa";

function Footer() {
  return (
    <footer className="w-full bg-zinc-950 text-zinc-400 py-16 px-6 border-t border-zinc-800 cursor-default">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info & Newsletter */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-lime-500 inline-block"></span>
              NoteSpace
            </h2>
            <p className="text-sm text-zinc-400 max-w-sm">
              The all-in-one workspace for your notes, tasks, and personal
              knowledge. Capture faster, think clearer.
            </p>

            {/* Newsletter input */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-zinc-900 border border-zinc-800 text-sm rounded-xl px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-lime-500 w-full sm:w-auto flex-1"
              />
              <button className="bg-lime-500 hover:bg-lime-400 text-zinc-950 font-semibold px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer">
                <span>Join</span>
                <FaArrowRight className="text-xs" />
              </button>
            </div>
          </div>

          {/* Product Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Product
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#features"
                  className="hover:text-lime-400 transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="hover:text-lime-400 transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#download"
                  className="hover:text-lime-400 transition-colors"
                >
                  Download
                </a>
              </li>
              <li>
                <a
                  href="#changelog"
                  className="hover:text-lime-400 transition-colors"
                >
                  Changelog
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Resources
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#docs"
                  className="hover:text-lime-400 transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#guides"
                  className="hover:text-lime-400 transition-colors"
                >
                  Knowledge Base
                </a>
              </li>
              <li>
                <a
                  href="#blog"
                  className="hover:text-lime-400 transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#community"
                  className="hover:text-lime-400 transition-colors"
                >
                  Community
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Legal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#privacy"
                  className="hover:text-lime-400 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  className="hover:text-lime-400 transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#security"
                  className="hover:text-lime-400 transition-colors"
                >
                  Security
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Divider & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-zinc-800/80 gap-4 text-xs">
          <p>
            &copy; 2026 NoteSpace, Inc. All rights
            reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 text-lg">
            <a
              href="#twitter"
              aria-label="Twitter"
              className="hover:text-white transition-colors"
            >
              <FaTwitter />
            </a>
            <a
              href="#github"
              aria-label="GitHub"
              className="hover:text-white transition-colors"
            >
              <FaGithub />
            </a>
            <a
              href="#linkedin"
              aria-label="LinkedIn"
              className="hover:text-white transition-colors"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
