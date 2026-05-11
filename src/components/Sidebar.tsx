
import {  LayoutDashboard, BookOpen, Trophy, Users, Star, ShoppingBag, User, Flame } from 'lucide-react';
import { motion } from 'motion/react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const MENU_ITEMS = [
  { id: 'inicio', label: 'Inicio', icon: LayoutDashboard },
  { id: 'aprender', label: 'Aprender', icon: BookOpen },
  { id: 'retos', label: 'Retos', icon: Trophy },
  { id: 'amigos', label: 'Amigos', icon: Users },
  { id: 'ranking', label: 'Ranking', icon: Star },
  { id: 'tienda', label: 'Tienda', icon: ShoppingBag },
  { id: 'perfil', label: 'Perfil', icon: User },
];

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <div className="w-64 bg-pink-950 text-white flex flex-col h-full sticky top-0">
      <div className="p-8">
        <h1 className="text-2xl font-black tracking-tight flex flex-col leading-none">
          <span className="text-pink-400 text-sm italic">ENGLISH</span>
          <span>QUEST</span>
        </h1>
      </div>

      <nav className="flex-1 space-y-1 px-4">
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${
                isActive ? 'bg-pink-800 text-white shadow-lg' : 'text-pink-300/60 hover:text-white hover:bg-pink-800/50'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'group-hover:text-white'}`} />
              <span className="font-semibold">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-2 w-1 h-6 bg-pink-400 rounded-full"
                />
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4">
        <div className="bg-pink-900 rounded-2xl p-4 relative overflow-hidden group">
           <div className="relative z-10">
             <div className="flex items-center space-x-2 text-pink-400 font-bold mb-1">
               <Flame className="w-5 h-5 fill-current" />
               <span>Racha diaria</span>
             </div>
             <div className="text-3xl font-black">14 días</div>
             <div className="text-xs text-slate-300 font-medium mt-1 uppercase tracking-wider">¡Sigue así!</div>
           </div>
           
           <img 
             src="https://api.dicebear.com/7.x/bottts/svg?seed=duo&backgroundColor=transparent" 
             alt="Mascot"
             className="absolute -right-4 -bottom-4 w-24 h-24 opacity-30 group-hover:scale-110 transition-transform"
             referrerPolicy="no-referrer"
           />
        </div>
      </div>
    </div>
  );
}
