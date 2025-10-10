import { X } from 'lucide-react';

interface CelebrationModalProps {
  onClose: () => void;
  isAccepted: boolean;
}

const ACCEPTANCE_QUOTES = [
  "I'm proud of you, finally you did it! 🎉",
  "Congratulations! All your hard work paid off! 🎊",
  "You absolutely crushed it! Well deserved! 🏆",
  "Amazing news! They're lucky to have you! ⭐",
  "Your persistence paid off! Congratulations! 🌟",
  "This is just the beginning of great things! 🚀",
  "You earned this! Time to celebrate! 🥳",
  "Knew you could do it! Onwards and upwards! 💪",
  "What an achievement! So proud of you! 🎯",
  "Success! Your journey continues beautifully! 🌈"
];

const REJECTION_QUOTES = [
  "It's okay, not this time but another opportunity awaits! 💫",
  "Every 'no' brings you closer to the right 'yes'! 🌱",
  "Keep your head up! The perfect role is coming! 🌟",
  "This wasn't meant to be, something better is ahead! 🚀",
  "You're building resilience with each application! 💪",
  "Their loss! The right company will recognize your worth! ⭐",
  "Every rejection is redirection to something greater! 🎯",
  "Don't give up! Your breakthrough is just around the corner! 🌈",
  "You're one step closer to where you belong! 🌻",
  "Stay strong! The best is yet to come! 🔥"
];

export function CelebrationModal({ onClose, isAccepted }: CelebrationModalProps) {
  const quotes = isAccepted ? ACCEPTANCE_QUOTES : REJECTION_QUOTES;
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  const bgColor = isAccepted ? 'bg-gradient-to-br from-green-900/90 to-emerald-900/90' : 'bg-gradient-to-br from-orange-900/90 to-amber-900/90';
  const borderColor = isAccepted ? 'border-green-700' : 'border-orange-700';

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className={`${bgColor} ${borderColor} rounded-2xl shadow-2xl w-full max-w-md mx-4 border-2 p-8 text-center`}>
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="text-zinc-300 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>

        <p className="text-2xl font-semibold text-white leading-relaxed">
          {quote}
        </p>

        <button
          onClick={onClose}
          className="mt-8 px-6 py-2.5 text-sm font-medium text-white bg-white/20 hover:bg-white/30 rounded-lg transition-colors backdrop-blur-sm"
        >
          Close
        </button>
      </div>
    </div>
  );
}
