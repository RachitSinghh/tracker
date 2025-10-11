import { useState } from "react";
import {
  Briefcase,
  CheckCircle2,
  TrendingUp,
  Clock,
  LogIn,
} from "lucide-react";
import { LoginForm } from "./LoginForm";
import { SignUpForm } from "./SignUpForm";
// import { motion } from "framer-motion";

import { PointerHighlight } from "./ui/pointer-highlight";


export function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white">
      <nav className="border-b border-zinc-800/50 backdrop-blur-sm bg-black/30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl italic font-bold">Tracker</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowLogin(true)}
              className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors"
            >
              Log In
            </button>
            <button
              onClick={() => setShowSignUp(true)}
              className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-6">
            Track Job Applications
            <br />
            <span className="relative inline-block italic">
            <PointerHighlight>

              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Hassle-Free
              </span>
            </PointerHighlight>
             
             
            </span>
          </h1>

          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
            Stay organized, motivated, and in control of your job search. Track
            every application, celebrate wins, and learn from rejections.
          </p>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setShowSignUp(true)}
              className="px-8 py-4 text-lg font-medium bg-blue-600 hover:bg-blue-700 rounded-xl transition-all hover:scale-105 flex items-center gap-2"
            >
              Get Started Free
              <LogIn size={20} />
            </button>
            <button
              onClick={() => setShowLogin(true)}
              className="px-8 py-4 text-lg font-medium bg-zinc-800/50 hover:bg-zinc-800 rounded-xl transition-colors border border-zinc-700"
            >
              Log In
            </button>
          </div>
        </div>
        {/* footer */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900/50 backdrop-blur-sm rounded-full border border-zinc-800/50">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500"></div>
            </div>
            <span className="text-sm text-zinc-400">
              Join thousands tracking their career journey
            </span>
          </div>
        </div>
      </main>

      {showLogin && (
        <LoginForm
          onClose={() => setShowLogin(false)}
          onSwitchToSignUp={() => {
            setShowLogin(false);
            setShowSignUp(true);
          }}
        />
      )}
      {showSignUp && (
        <SignUpForm
          onClose={() => setShowSignUp(false)}
          onSwitchToLogin={() => {
            setShowSignUp(false);
            setShowLogin(true);
          }}
        />
      )}
    </div>
  );
}
