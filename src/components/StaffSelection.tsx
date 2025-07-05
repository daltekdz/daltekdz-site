import React, { useState } from 'react';
import { Staff } from '../types/booking';
import { StaffMember } from '../types/staff';
import { Star, Award, User } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface StaffSelectionProps {
  selectedStaff: Staff | null;
  onStaffSelect: (staff: Staff) => void;
  serviceId?: string;
  storeStaff?: StaffMember[];
}

export const StaffSelection: React.FC<StaffSelectionProps> = ({
  selectedStaff,
  onStaffSelect,
  serviceId,
  storeStaff = []
}) => {
  const { isRTL } = useLanguage();
  
  // Filter staff who can provide the selected service
  const availableStaff = serviceId 
    ? storeStaff.filter(member => member.services.includes(serviceId))
    : storeStaff;

  // Add "Any available staff" option
  const anyStaffOption: Staff = {
    id: 'any',
    name: isRTL ? 'أي موظف متاح' : 'Tout employé disponible',
    specialties: [isRTL ? 'جميع الخدمات' : 'Tous services'],
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.5,
    experience: isRTL ? 'فريق محترف' : 'Équipe professionnelle'
  };

  const allOptions = [anyStaffOption, ...availableStaff.map(member => ({
    id: member.id,
    name: member.name,
    specialties: member.specialties,
    image: member.image,
    rating: member.rating,
    experience: member.description
  }))];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {isRTL ? 'اختر المختص' : 'Choisissez le spécialiste'}
        </h2>
        <p className="text-gray-600">
          {isRTL ? 'اختر من فريق خبراء الجمال المحترفين' : 'Choisissez parmi notre équipe d\'experts beauté professionnels'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allOptions.map(member => (
          <div
            key={member.id}
            className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer transform hover:scale-105 border ${
              selectedStaff?.id === member.id ? 'ring-2 ring-blue-500 border-blue-200' : 'border-gray-100'
            }`}
            onClick={() => onStaffSelect(member)}
          >
            <div className="aspect-w-16 aspect-h-9 bg-gray-200 relative">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-48 object-cover"
              />
              {member.id === 'any' && (
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/80 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <User className="h-8 w-8 mb-2" />
                    <p className="text-sm font-medium">
                      {isRTL ? 'سيتم اختيار أفضل موظف متاح' : 'Le meilleur employé disponible sera choisi'}
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            <div className={`p-6 ${isRTL ? 'text-right' : 'text-left'}`}>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
              
              <div className={`flex items-center mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(member.rating) ? 'text-amber-500 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className={`text-sm text-gray-600 ${isRTL ? 'mr-2' : 'ml-2'}`}>
                  {member.rating.toFixed(1)}
                </span>
              </div>
              
              <div className={`flex items-center text-gray-500 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Award className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                <span className="text-sm">{member.experience}</span>
              </div>
              
              <div className={`flex flex-wrap gap-2 ${isRTL ? 'justify-end' : 'justify-start'}`}>
                {member.specialties.slice(0, 3).map((specialty, index) => (
                  <span
                    key={index}
                    className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded"
                  >
                    {specialty}
                  </span>
                ))}
                {member.specialties.length > 3 && (
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    +{member.specialties.length - 3}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {availableStaff.length === 0 && serviceId && (
        <div className="text-center py-12">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {isRTL ? 'لا يوجد موظفين متاحين' : 'Aucun employé disponible'}
          </h3>
          <p className="text-gray-500">
            {isRTL ? 'لا يوجد موظفين يقدمون هذه الخدمة حالياً' : 'Aucun employé ne propose ce service actuellement'}
          </p>
        </div>
      )}
    </div>
  );
};