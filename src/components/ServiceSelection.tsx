import React, { useState } from 'react';
import { Service } from '../types/booking';
import { services, serviceCategories } from '../data/services';
import { Clock, DollarSign } from 'lucide-react';

interface ServiceSelectionProps {
  selectedService: Service | null;
  onServiceSelect: (service: Service) => void;
}

export const ServiceSelection: React.FC<ServiceSelectionProps> = ({
  selectedService,
  onServiceSelect
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">اختر خدمتك</h2>
        <p className="text-gray-600">اختر من مجموعة خدمات الجمال الاحترافية</p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {serviceCategories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700'
            }`}
          >
            <span className="mr-2">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map(service => (
          <div
            key={service.id}
            className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer transform hover:scale-105 border ${
              selectedService?.id === service.id ? 'ring-2 ring-blue-500 border-blue-200' : 'border-gray-100'
            }`}
            onClick={() => onServiceSelect(service)}
          >
            <div className="aspect-w-16 aspect-h-9 bg-gray-200">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm">{service.duration} دقيقة</span>
                  </div>
                  <div className="flex items-center text-amber-600 font-semibold">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span className="text-sm">{service.price} د.ج</span>
                  </div>
                </div>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                  {service.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};