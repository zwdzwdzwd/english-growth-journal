import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw, Quote } from 'lucide-react';
import daoData from './dao-de-jing.json';

const DailyWisdom = () => {
  const [chapter, setChapter] = useState(null);

  const pickRandomChapter = () => {
    const randomIndex = Math.floor(Math.random() * daoData.length);
    setChapter(daoData[randomIndex]);
  };

  useEffect(() => {
    pickRandomChapter();
  }, []);

  if (!chapter) return null;

  return (
    <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-xl shadow-lg text-white overflow-hidden mb-12 relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
        <Quote size={120} />
      </div>

      <div className="p-8 relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-2 text-indigo-300 uppercase tracking-widest text-xs font-bold">
            <Sparkles size={14} />
            Daily Wisdom • Tao Te Ching • Chapter {chapter.chapter}
          </div>
          <button 
            onClick={pickRandomChapter}
            className="text-slate-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
            title="Load another chapter"
          >
            <RefreshCw size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Chinese Text */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif leading-relaxed text-indigo-100 opacity-90">
              {chapter.chinese}
            </h3>
          </div>

          {/* English Text */}
          <div className="space-y-4 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-8">
            <p className="text-slate-300 font-light leading-relaxed whitespace-pre-line italic">
              "{chapter.english}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyWisdom;
