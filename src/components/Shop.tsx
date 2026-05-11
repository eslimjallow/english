
import { motion } from 'motion/react';
import { Gem, Flame, Clock, Zap, ShoppingBag } from 'lucide-react';

const SHOP_ITEMS = [
  { id: 'streak', name: 'Racha guardián', price: 300, icon: Flame, color: 'text-orange-500' },
  { id: 'gems', name: 'Diamantes', price: 100, icon: Gem, color: 'text-cyan-500' },
  { id: 'double', name: 'Día doble XP', price: 150, icon: Zap, color: 'text-yellow-500' },
  { id: 'time', name: 'Más tiempo', price: 200, icon: Clock, color: 'text-blue-500' },
];

export function Shop() {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div className="flex items-center space-x-4 mb-8">
        <ShoppingBag className="w-8 h-8 text-pink-950" />
        <h2 className="text-3xl font-black text-pink-950">Tienda de recompensas</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SHOP_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded-[32px] border-2 border-pink-50 shadow-sm flex items-center justify-between group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-pink-50/50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                   <Icon className={`w-8 h-8 ${item.color} fill-current`} />
                </div>
                <div>
                  <h3 className="font-black text-pink-950">{item.name}</h3>
                  <div className="flex items-center space-x-1 text-slate-500 font-bold">
                     <Gem className="w-4 h-4 text-cyan-500 fill-current" />
                     <span>{item.price}</span>
                  </div>
                </div>
              </div>
              <button 
                className="px-6 py-3 bg-pink-600 text-white font-bold rounded-xl active:scale-95 transition-transform"
                onClick={() => alert('¡Compra realizada!')}
              >
                Canjear
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
