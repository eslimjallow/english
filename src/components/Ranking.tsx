
import { motion } from 'motion/react';
import { Trophy, Star } from 'lucide-react';

const RANKING = [
  { id: 1, name: 'Mariana', xp: 950, avatar: 'Mariana' },
  { id: 2, name: 'Alex (tú)', xp: 820, avatar: 'Alex', isMe: true },
  { id: 3, name: 'Carlos', xp: 610, avatar: 'Carlos' },
  { id: 4, name: 'Sofia', xp: 480, avatar: 'Sofia' },
  { id: 5, name: 'Daniel', xp: 320, avatar: 'Daniel' },
];

export function Ranking() {
  return (
    <div className="p-8 max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <Trophy className="w-16 h-16 text-pink-500 mx-auto drop-shadow-lg" />
        <h2 className="text-3xl font-black text-pink-950">Liga de Platino</h2>
        <p className="text-slate-500 font-bold">La competencia termina en: <span className="text-pink-600">3d 12h 45m</span></p>
      </div>

      <div className="bg-white rounded-[40px] border-2 border-pink-50 shadow-xl overflow-hidden">
        {RANKING.map((user, idx) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`flex items-center justify-between p-6 border-b border-pink-50 last:border-0 ${
              user.isMe ? 'bg-pink-50/50' : ''
            }`}
          >
            <div className="flex items-center space-x-6">
              <span className={`w-8 text-center font-black text-xl ${
                idx === 0 ? 'text-pink-700' : idx === 1 ? 'text-pink-500' : 'text-pink-200'
              }`}>
                {idx + 1}
              </span>
              <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden bg-slate-100">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.avatar}`} alt="Avatar" referrerPolicy="no-referrer" />
              </div>
              <span className={`font-black tracking-tight ${user.isMe ? 'text-pink-600' : 'text-pink-950'}`}>
                {user.name}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-pink-400 fill-current" />
              <span className="font-black text-slate-600">{user.xp} XP</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
