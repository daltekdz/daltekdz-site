import React, { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { generateTimeSlots } from '../data/timeSlots';

interface DateTimeSelectionProps {
  selectedDate: string;
  selectedTime: string;
  onDateSelect: (date: string) => void;
  onTimeSelect: (time: string) => void;
}

export const DateTimeSelection: React.FC<DateTimeSelectionProps> = ({
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect
}) => {
  const [availableSlots, setAvailableSlots] = useState(generateTimeSlots(selectedDate));

  const handleDateChange = (date: string) => {
    onDateSelect(date);
    setAvailableSlots(generateTimeSlots(date));
  };

  // Generate next 14 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const dates = generateDates();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">اختر التاريخ والوقت</h2>
        <p className="text-gray-600">اختر الموعد المناسب لك</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Date Selection */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center mb-4">
            <Calendar className="h-5 w-5 text-amber-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">اختر التاريخ</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {dates.map(date => {
              const dateStr = date.toISOString().split('T')[0];
              const isSelected = selectedDate === dateStr;
              const dayName = date.toLocaleDateString('ar-SA', { weekday: 'short' });
              const dayNum = date.getDate();
              const monthName = date.toLocaleDateString('ar-SA', { month: 'short' });
              
              return (
                <button
                  key={dateStr}
                  onClick={() => handleDateChange(dateStr)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-amber-300 hover:bg-amber-50'
                  }`}
                >
                  <div className="text-sm font-medium">{dayName}</div>
                  <div className="text-lg font-bold">{dayNum}</div>
                  <div className="text-xs text-gray-500">{monthName}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Selection */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center mb-4">
            <Clock className="h-5 w-5 text-amber-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">اختر الوقت</h3>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {availableSlots.map(slot => (
              <button
                key={slot.id}
                onClick={() => onTimeSelect(slot.time)}
                disabled={!slot.available}
                className={`p-3 rounded-lg border text-sm font-medium transition-all duration-200 ${
                  selectedTime === slot.time
                    ? 'border-blue-500 bg-blue-600 text-white'
                    : slot.available
                      ? 'border-gray-200 hover:border-amber-300 hover:bg-amber-50 text-gray-700'
                      : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
                }`}
              >
                {slot.time}
              </button>
            ))}
          </div>
          
          <div className="mt-4 text-sm text-gray-500">
            <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
            متاح
            <span className="inline-block w-3 h-3 bg-gray-300 rounded-full mr-2 ml-4"></span>
            غير متاح
          </div>
        </div>
      </div>
    </div>
  );
};