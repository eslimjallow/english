
import { Gem, Triangle, CircleDollarSign } from 'lucide-react';
import { UserProgress } from '../types';

interface HeaderProps {
  progress: UserProgress;
}

export function Header({ progress }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-8 py-6 bg-white/50 backdrop-blur-sm sticky top-0 z-30 border-b border-slate-100">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">¡Hola, Alex! 👋</h2>
        <p className="text-slate-500 font-medium">Listo para tu misión diaria?</p>
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
          <Gem className="w-5 h-5 text-cyan-500 fill-current" />
          <span className="font-bold text-slate-700">25/30</span>
          <span className="text-xs text-slate-400 font-semibold">+ en 10:45</span>
        </div>

        <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
          <Triangle className="w-5 h-5 text-purple-500 fill-current rotate-180" />
          <span className="font-bold text-slate-700">{progress.gems}</span>
          <span className="text-lg text-slate-400">+</span>
        </div>

        <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
          <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-[10px] font-black text-yellow-800">
            <CircleDollarSign className="w-4 h-4" />
          </div>
          <span className="font-bold text-slate-700">{progress.coins.toLocaleString()}</span>
          <span className="text-lg text-slate-400">+</span>
        </div>

        <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-md overflow-hidden">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" 
            alt="Profile"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </header>
  );
}
