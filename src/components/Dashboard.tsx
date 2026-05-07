
import { motion } from 'motion/react';
import { Star, Headphones, MessageCircle, BookOpen, PenTool, Lock, Gem } from 'lucide-react';
import { LEARNING_PATH, SAMPLE_QUESTS } from '../constants';

const ICON_MAP: Record<string, any> = {
  Headphones,
  MessageCircle,
  BookOpen,
  PenTool,
  Lock
};

interface DashboardProps {
  onStartLesson: (id: string) => void;
}

export function Dashboard({ onStartLesson }: DashboardProps) {
  const quest = SAMPLE_QUESTS[0];

  return (
    <div className="p-8 space-y-8 max-w-6xl mx-auto">
      {/* Daily Quest Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-gradient-to-r from-[#D0C4FF] to-[#EBE4FF] rounded-[40px] p-10 flex items-center justify-between overflow-hidden group shadow-xl shadow-purple-200/50"
      >
        <div className="relative z-10 space-y-4 max-w-md">
          <div className="inline-block px-4 py-1.5 bg-white/60 backdrop-blur-md rounded-full text-purple-700 font-bold text-sm uppercase tracking-wider">
            {quest.title}
          </div>
          <h3 className="text-4xl font-black text-[#1E114D] leading-tight">
            {quest.description}
          </h3>
          
          <div className="space-y-2">
            <div className="h-4 w-full bg-white/40 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(quest.current / quest.target) * 100}%` }}
                className="h-full bg-green-400"
              />
            </div>
            <div className="flex justify-between text-[#1E114D] font-bold text-sm">
              <span>{quest.current} / {quest.target}</span>
              <div className="flex space-x-4">
                <span className="flex items-center space-x-1">
                  <Gem className="w-4 h-4 text-cyan-500 fill-current" />
                  <span>{quest.rewardXp} XP</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="text-yellow-600">💰</span>
                  <span>{quest.rewardCoins} monedas</span>
                </span>
              </div>
            </div>
          </div>

          <button 
             onClick={() => onStartLesson('1')}
             className="mt-4 px-8 py-4 bg-[#5F33E1] text-white font-bold rounded-2xl shadow-lg shadow-purple-300 hover:scale-105 transition-transform active:scale-95"
          >
            Continuar
          </button>
        </div>

        <div className="relative h-64 w-64 md:h-80 md:w-80 group-hover:scale-110 transition-transform duration-500">
           <img 
             src="https://api.dicebear.com/7.x/bottts/svg?seed=hero&backgroundColor=transparent" 
             alt="Quest Hero"
             className="w-full h-full object-contain filter drop-shadow-2xl"
             referrerPolicy="no-referrer"
           />
           {/* Decorative EQ flag logic from image */}
           <div className="absolute top-4 right-0 bg-[#5F33E1] text-white px-4 py-2 rounded-lg font-black text-xl rotate-12 shadow-lg">
             EQ
           </div>
        </div>
      </motion.div>

      {/* Learning Path */}
      <section className="space-y-6">
        <h4 className="text-2xl font-black text-[#1E114D]">Tu camino de aprendizaje</h4>
        <div className="flex items-center justify-between relative px-4">
          {/* Path Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-100 -translate-y-1/2 -z-10 border-t-2 border-dashed border-slate-200" />
          
          {LEARNING_PATH.map((stage, idx) => {
            const Icon = ICON_MAP[stage.icon] || BookOpen;
            const isLocked = stage.status === 'locked';
            
            return (
              <div key={stage.id} className="flex flex-col items-center space-y-4">
                <motion.button
                  whileHover={!isLocked ? { scale: 1.1 } : {}}
                  disabled={isLocked}
                  onClick={() => onStartLesson(stage.id)}
                  className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg relative ${
                    isLocked 
                      ? 'bg-slate-300 text-slate-500' 
                      : bgColorClass(idx)
                  }`}
                >
                  <Icon className="w-8 h-8" />
                  {!isLocked && (
                    <div className="absolute -bottom-2 flex space-x-0.5">
                      {[1, 2, 3].map(s => (
                        <Star 
                          key={s} 
                          className={`w-4 h-4 ${s <= stage.stars ? 'text-yellow-400 fill-current' : 'text-slate-200 fill-current'}`} 
                        />
                      ))}
                    </div>
                  )}
                </motion.button>
                <div className="text-center">
                   <div className="text-xs font-bold text-slate-400 uppercase">{idx + 1}. {stage.title}</div>
                   {isLocked && <div className="text-[10px] text-slate-400 font-bold uppercase">Bloqueado</div>}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Info Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-[32px] border-2 border-slate-50 shadow-sm space-y-4">
             <div className="flex items-center space-x-3">
               <span className="text-2xl">📅</span>
               <div className="font-black text-[#1E114D]">Reto de 14 días</div>
             </div>
             <div className="text-slate-500 font-bold text-sm">Día 7 de 14</div>
             <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full w-1/2 bg-purple-500" />
             </div>
             <div className="text-purple-600 font-bold text-sm">¡Vas muy bien! ➔</div>
          </div>

          <div className="bg-white p-6 rounded-[32px] border-2 border-slate-50 shadow-sm space-y-4">
             <div className="flex items-center space-x-3">
               <span className="text-2xl">🏆</span>
               <div className="font-black text-[#1E114D]">Reto semanal</div>
             </div>
             <div className="text-slate-500 font-bold text-sm">Posición: 2 de 8</div>
             <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-orange-400" />
             </div>
             <div className="text-slate-400 font-bold text-sm">Ver ranking ➔</div>
          </div>

          <div className="bg-[#EBE4FF] p-6 rounded-[32px] border-2 border-slate-100 shadow-sm space-y-4">
             <div className="font-black text-[#1E114D]">Invita a tus amigos</div>
             <div className="flex -space-x-3">
                {[1,2,3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-slate-200">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="Friend" referrerPolicy="no-referrer" />
                  </div>
                ))}
             </div>
             <div className="text-[#1E114D] text-xs font-bold leading-tight">Gana 50 💎 por cada amigo que se una</div>
             <button className="text-[#5F33E1] font-black text-sm hover:underline">Invitar amigos</button>
          </div>
      </div>
    </div>
  );
}

function bgColorClass(idx: number) {
  const colors = [
    'bg-[#5F33E1] text-white',
    'bg-[#4ADE80] text-white',
    'bg-[#60A5FA] text-white',
    'bg-[#FACC15] text-white',
  ];
  return colors[idx % colors.length];
}
