import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Flag } from 'lucide-react';

const Calendar = ({ entries }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Extract all unique dates from entries (YYYY-MM-DD)
  const activeDates = useMemo(() => {
    const dates = new Set(entries.map(entry => entry.date));
    return dates;
  }, [entries]);

  // Calendar Logic
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 = Sunday

  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const days = [];
  // Empty slots for days before the 1st
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="h-8"></div>);
  }

  // Actual days
  for (let d = 1; d <= daysInMonth; d++) {
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const isActive = activeDates.has(dateString);
    const isToday = new Date().toDateString() === new Date(year, month, d).toDateString();

    days.push(
      <div 
        key={d} 
        className={`
          h-8 flex items-center justify-center text-xs font-medium rounded-full relative group cursor-default transition-all
          ${isActive 
            ? 'bg-red-500 text-white shadow-sm scale-110 font-bold' 
            : 'text-slate-400 hover:bg-slate-100'}
          ${isToday && !isActive ? 'ring-2 ring-indigo-400 text-indigo-600' : ''}
        `}
        title={isActive ? 'Study Record Found!' : ''}
      >
        {d}
        {isActive && (
          <Flag 
            size={10} 
            className="absolute -top-1 -right-1 text-yellow-300 drop-shadow-md fill-yellow-300 animate-bounce" 
            style={{ animationDuration: '3s' }}
          />
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 sticky top-24">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-700">{monthName} {year}</h3>
        <div className="flex gap-1">
          <button onClick={prevMonth} className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600">
            <ChevronLeft size={16} />
          </button>
          <button onClick={nextMonth} className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
          <div key={day} className="text-[10px] font-bold text-slate-300 uppercase">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-400 flex items-center gap-2 justify-center">
        <div className="w-2 h-2 rounded-full bg-red-500"></div>
        <span>Study Day</span>
        <div className="w-2 h-2 rounded-full bg-indigo-400 ml-2"></div>
        <span>Today</span>
      </div>
    </div>
  );
};

export default Calendar;
