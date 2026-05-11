import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { LessonView } from './components/LessonView';
import { Shop } from './components/Shop';
import { Ranking } from './components/Ranking';
import { UserProgress } from './types';
import { getUserProgress, saveUserProgress } from './lib/storage';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(getUserProgress());
  const [activeTab, setActiveTab] = useState('inicio');
  const [currentLesson, setCurrentLesson] = useState<string | null>(null);

  useEffect(() => {
    saveUserProgress(progress);
  }, [progress]);

  const handleCompleteLesson = (xpReward: number) => {
    setProgress(prev => ({
      ...prev,
      xp: prev.xp + xpReward,
      coins: prev.coins + 50,
      level: Math.floor((prev.xp + xpReward) / 100) + 1
    }));
    setCurrentLesson(null);
  };

  return (
    <div className="flex min-h-screen bg-[#FDFDFF] font-sans selection:bg-pink-200 selection:text-pink-900">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col">
        <Header progress={progress} />
        
        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'inicio' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Dashboard 
                  onStartLesson={(id) => setCurrentLesson(id)} 
                  onNavigate={(tab) => setActiveTab(tab)}
                />
              </motion.div>
            )}
            
            {['tienda', 'ranking', 'retos', 'amigos', 'aprender', 'perfil'].map(tab => (
              activeTab === tab && (
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {tab === 'tienda' ? <Shop /> : 
                   tab === 'ranking' ? <Ranking /> :
                   <div className="p-8 text-center mt-20">
                    <div className="w-48 h-48 mx-auto mb-6">
                      <img src="https://api.dicebear.com/7.x/bottts/svg?seed=wip" alt="WIP" referrerPolicy="no-referrer" />
                    </div>
                    <h3 className="text-3xl font-black text-pink-950">Próximamente</h3>
                    <p className="text-slate-500 font-bold mt-2">Esta sección está siendo pulida por nuestros expertos.</p>
                    <button 
                      onClick={() => setActiveTab('inicio')}
                      className="mt-6 px-8 py-3 bg-pink-600 text-white font-bold rounded-xl"
                    >
                      Volver al inicio
                    </button>
                   </div>
                  }
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </main>
      </div>

      <AnimatePresence>
        {currentLesson && (
          <LessonView 
            onClose={() => setCurrentLesson(null)} 
            onComplete={handleCompleteLesson}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
