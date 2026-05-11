
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Volume2, Mic, CheckCircle2 } from 'lucide-react';
import { generateLessonContent } from '../services/geminiService';

interface LessonViewProps {
  onClose: () => void;
  onComplete: (xp: number) => void;
}

export function LessonView({ onClose, onComplete }: LessonViewProps) {
  const [content, setContent] = useState<any>(null);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await generateLessonContent(1);
      if (data) {
        setContent(data);
        setAvailableWords([...data.wordChips].sort(() => Math.random() - 0.5));
      }
      setIsLoading(false);
    }
    load();
  }, []);

  const handleWordClick = (word: string, fromSelected: boolean) => {
    if (fromSelected) {
      setSelectedWords(prev => prev.filter(w => w !== word));
      setAvailableWords(prev => [...prev, word]);
    } else {
      setAvailableWords(prev => prev.filter(w => w !== word));
      setSelectedWords(prev => [...prev, word]);
    }
    setIsCorrect(null);
  };

  const checkAnswer = () => {
    const answer = selectedWords.join(' ').toLowerCase();
    const correct = content.englishTranslation.toLowerCase().replace(/[.,!]/g, '');
    if (answer === correct) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-8 text-center bg-pink-50">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-32 h-32 mb-8"
        >
          <img src="https://api.dicebear.com/7.x/bottts/svg?seed=loading" alt="Loading" referrerPolicy="no-referrer" />
        </motion.div>
        <h2 className="text-2xl font-black text-pink-950">Generando tu lección AI...</h2>
        <p className="text-pink-600 font-bold mt-2">Personalizando ejercicios para tu nivel</p>
      </div>
    );
  }

  if (!content) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      <header className="p-6 flex items-center justify-between border-b">
        <button onClick={onClose} className="p-2 hover:bg-pink-50 rounded-full">
          <ChevronLeft className="w-6 h-6 text-pink-600" />
        </button>
        <div className="flex-1 px-8">
           <div className="h-3 w-full bg-pink-50 rounded-full overflow-hidden">
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: isCorrect ? '100%' : '20%' }}
               className="h-full bg-pink-500"
             />
           </div>
        </div>
        <div className="w-10" />
      </header>

      <main className="flex-1 p-8 overflow-y-auto bg-pink-50/10">
        <div className="max-w-2xl mx-auto space-y-12">
           <div className="space-y-4">
             <h2 className="text-2xl font-black text-pink-950">Traduce esta oración</h2>
             <div className="text-sm text-pink-400 font-bold uppercase tracking-widest">Traduce al inglés</div>
           </div>

           <div className="flex items-start space-x-6">
             <div className="w-24 h-24 flex-shrink-0 bg-pink-100 rounded-3xl flex items-center justify-center border-2 border-pink-200">
               <img src="https://api.dicebear.com/7.x/bottts/svg?seed=duo" className="w-16 h-16" alt="Mascot" referrerPolicy="no-referrer" />
             </div>
             <div className="bg-white border-2 border-pink-100 rounded-3xl p-6 shadow-sm flex items-center space-x-4 flex-1">
               <button 
                 onClick={() => {
                   const utterance = new SpeechSynthesisUtterance(content.englishTranslation);
                   utterance.lang = 'en-US';
                   window.speechSynthesis.speak(utterance);
                 }}
                 className="p-3 bg-pink-600 text-white rounded-2xl hover:scale-110 active:scale-95 transition-transform"
               >
                 <Volume2 className="w-6 h-6" />
               </button>
               <div>
                 <div className="text-xl font-bold text-pink-950">{content.spanishPhrase}</div>
               </div>
             </div>
           </div>

           <div className="min-h-[120px] bg-white rounded-[32px] p-6 border-2 border-dashed border-pink-200 flex flex-wrap gap-3 items-center">
              {selectedWords.map(word => (
                <button
                  key={word}
                  onClick={() => handleWordClick(word, true)}
                  className="px-4 py-2 bg-pink-50 border-2 border-pink-200 rounded-xl font-bold shadow-sm hover:border-pink-400 transition-colors text-pink-900"
                >
                  {word}
                </button>
              ))}
           </div>

           <div className="flex flex-wrap gap-3 justify-center">
              {availableWords.map(word => (
                <button
                  key={word}
                  onClick={() => handleWordClick(word, false)}
                  className="px-4 py-2 bg-white border-2 border-pink-100 rounded-xl font-bold shadow-sm hover:border-pink-400 transition-colors"
                >
                  {word}
                </button>
              ))}
           </div>
        </div>
      </main>

      <footer className={`p-8 border-t transition-colors duration-500 ${
        isCorrect === true ? 'bg-green-50' : isCorrect === false ? 'bg-red-50' : 'bg-white'
      }`}>
        <div className="max-w-2xl mx-auto flex items-center justify-between">
           <div className="flex-1">
             <AnimatePresence mode="wait">
               {isCorrect === true && (
                 <motion.div 
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   className="space-y-1"
                 >
                   <div className="flex items-center space-x-2 text-green-600 font-black">
                     <CheckCircle2 className="w-6 h-6" />
                     <span>¡Correcto!</span>
                   </div>
                   <div className="text-green-700 font-bold">{content.englishTranslation}</div>
                 </motion.div>
               )}
               {isCorrect === false && (
                 <motion.div 
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   className="space-y-1"
                 >
                   <div className="text-red-600 font-black text-xl">¿Casi?</div>
                   <div className="text-red-700 font-bold">Solución: {content.englishTranslation}</div>
                 </motion.div>
               )}
             </AnimatePresence>
           </div>
           
           {isCorrect === null ? (
             <button 
              disabled={selectedWords.length === 0}
              onClick={checkAnswer}
              className="px-12 py-4 bg-pink-600 text-white font-bold rounded-2xl disabled:bg-slate-200 disabled:text-slate-400"
             >
               Comprobar
             </button>
           ) : (
             <button 
              onClick={() => isCorrect ? onComplete(20) : setIsCorrect(null)}
              className={`px-12 py-4 text-white font-bold rounded-2xl ${
                isCorrect ? 'bg-green-500' : 'bg-red-500'
              }`}
             >
               {isCorrect ? 'Continuar' : 'Reintentar'}
             </button>
           )}
        </div>
      </footer>
    </div>
  );
}
