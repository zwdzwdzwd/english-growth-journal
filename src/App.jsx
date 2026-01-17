import React, { useMemo } from 'react';
import { BookOpen, MessageCircle, Lightbulb, Globe, ChevronRight, GraduationCap, Calendar as CalendarIcon } from 'lucide-react';
import entriesData from './data.json';
import DailyWisdom from './DailyWisdom';
import Calendar from './Calendar';

const EntryCard = ({ entry }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8 transition-all hover:shadow-md">
      <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex justify-between items-center">
        <span className="text-sm font-medium text-slate-500 flex items-center gap-2">
          <BookOpen size={16} /> Entry #{entry.id}
        </span>
        {/* Date is removed from here as it's now a section header */}
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side: Comparison */}
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                <MessageCircle size={14} /> Original
              </h4>
              <p className="text-slate-600 leading-relaxed italic">"{entry.original}"</p>
            </div>
            
            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                <GraduationCap size={14} /> Better Version
              </h4>
              <p className="text-slate-800 font-medium leading-relaxed">"{entry.better}"</p>
            </div>
          </div>

          {/* Right Side: Insights */}
          <div className="bg-indigo-50/50 rounded-lg p-5 space-y-4">
            <div>
              <h4 className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2 flex items-center gap-1">
                <Lightbulb size={14} /> Teacher's Notes
              </h4>
              <p className="text-slate-700 text-sm leading-relaxed">
                {entry.notes}
              </p>
            </div>
            
            {entry.culture && (
              <div className="pt-4 border-t border-indigo-100">
                <h4 className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Globe size={14} /> Culture & Context
                </h4>
                <p className="text-slate-700 text-sm leading-relaxed italic">
                  {entry.culture}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  // Group entries by date
  const groupedEntries = useMemo(() => {
    const groups = {};
    entriesData.forEach(entry => {
      if (!groups[entry.date]) {
        groups[entry.date] = [];
      }
      groups[entry.date].push(entry);
    });
    
    // Convert to array of objects for easier sorting/mapping
    // Sort dates in descending order (newest date first)
    return Object.keys(groups)
      .sort((a, b) => new Date(b) - new Date(a))
      .map(date => ({
        date,
        entries: groups[date] // Entries within the group are already in original order (chronological)
      }));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <GraduationCap size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">English Growth Journal</h1>
              <p className="text-xs text-slate-500 italic">Turning every mistake into a milestone</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              {entriesData.length} Lessons Learned
            </span>
          </div>
        </div>
      </header>

      {/* Main Layout Container */}
      <div className="max-w-6xl mx-auto px-6 pt-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Column: Main Content (3 spans) */}
        <main className="lg:col-span-3">
          <DailyWisdom />
          
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">My Learning Path</h2>
            <p className="text-slate-500">Review your daily improvements and cultural insights below.</p>
          </div>

          <div className="space-y-12">
            {groupedEntries.map((group) => (
              <div key={group.date} className="relative">
                {/* Date Header */}
                <div className="flex items-center gap-4 mb-6 sticky top-20 z-10 bg-slate-50/95 backdrop-blur py-2">
                  <div className="h-px bg-slate-300 flex-grow"></div>
                  <div className="flex items-center gap-2 text-slate-500 font-semibold bg-white px-4 py-1.5 rounded-full border border-slate-200 shadow-sm">
                    <CalendarIcon size={16} className="text-indigo-500" />
                    {group.date}
                  </div>
                  <div className="h-px bg-slate-300 flex-grow"></div>
                </div>

                {/* Entries for this date */}
                <div className="space-y-8">
                  {group.entries.map((entry) => (
                    <EntryCard key={entry.id} entry={entry} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Right Column: Sidebar (1 span) */}
        <aside className="lg:col-span-1 space-y-8">
          {/* Calendar Widget */}
          <Calendar entries={entriesData} />
          
          {/* Stats Widget (Optional placeholder for future) */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <h3 className="font-bold text-slate-700 mb-3">Stats</h3>
            <div className="text-sm text-slate-500 space-y-2">
              <div className="flex justify-between">
                <span>Total Entries</span>
                <span className="font-medium text-slate-800">{entriesData.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Active Days</span>
                <span className="font-medium text-slate-800">{groupedEntries.length}</span>
              </div>
            </div>
          </div>
        </aside>

      </div>

      {/* Footer */}
      <footer className="text-center py-10 border-t border-slate-200 mt-10">
        <p className="text-sm text-slate-400">Keep going! Consistency is the secret to fluency.</p>
      </footer>
    </div>
  );
};

export default App;
