import React from 'react';
import { BookingStep } from '../types/booking';
import { Check } from 'lucide-react';

interface ProgressBarProps {
  steps: BookingStep[];
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ steps }) => {
  return (
    <div className="bg-white border-b border-gray-200 py-3 sm:py-4">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between overflow-x-auto">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center min-w-max">
              <div className={`flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full ${
                step.completed 
                  ? 'bg-green-500 text-white' 
                  : step.active 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-600'
              }`}>
                {step.completed ? (
                  <Check className="h-3 w-3 sm:h-5 sm:w-5" />
                ) : (
                  <span className="text-xs sm:text-sm font-medium">{step.id}</span>
                )}
              </div>
              <span className={`mr-1 sm:mr-2 text-xs sm:text-sm ${
                step.active ? 'text-blue-600 font-medium' : 'text-gray-500'
              }`}>
                {step.title}
              </span>
              {index < steps.length - 1 && (
                <div className={`w-4 sm:w-8 h-0.5 mx-2 sm:mx-4 ${
                  step.completed ? 'bg-green-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};