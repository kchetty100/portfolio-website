import React, { useState } from 'react';
import { getIcon, getCategoryColor, getCategoryBgColor } from '../lib/iconMapping.jsx';

const SkillCard = ({ technologyName, category, proficiency, description, icon }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getProficiencyColor = (level) => {
    if (level >= 90) return 'bg-green-500';
    if (level >= 80) return 'bg-blue-500';
    if (level >= 70) return 'bg-yellow-500';
    if (level >= 60) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getProficiencyLabel = (level) => {
    if (level >= 90) return 'Expert';
    if (level >= 80) return 'Advanced';
    if (level >= 70) return 'Intermediate';
    if (level >= 60) return 'Beginner+';
    return 'Beginner';
  };

  return (
    <div
      className={`
        relative group cursor-pointer transition-all duration-300 ease-in-out
        ${isHovered ? 'transform scale-105' : 'transform scale-100'}
        bg-netflixGray/50 backdrop-blur-sm rounded-lg p-6
        border border-gray-700/50 hover:border-netflixRed/50
        hover:shadow-2xl hover:shadow-netflixRed/10
        ${getCategoryBgColor(category)}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hover overlay effect */}
      <div className={`
        absolute inset-0 rounded-lg transition-opacity duration-300
        ${isHovered ? 'opacity-10' : 'opacity-0'}
        bg-gradient-to-br from-netflixRed/20 to-transparent
      `} />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon and Technology Name */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-shrink-0">
            {getIcon(icon, 48)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-white truncate group-hover:text-netflixRed transition-colors duration-200">
              {technologyName}
            </h3>
            <p className={`text-sm font-medium ${getCategoryColor(category)}`}>
              {category}
            </p>
          </div>
        </div>

        {/* Description */}
        {description && (
          <p className="text-gray-300 text-sm mb-4 line-clamp-2 group-hover:text-gray-200 transition-colors duration-200">
            {description}
          </p>
        )}

        {/* Proficiency Section */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
              Proficiency
            </span>
            <span className="text-xs font-bold text-white">
              {proficiency}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
              <div
                className={`
                  h-2 rounded-full transition-all duration-1000 ease-out
                  ${getProficiencyColor(proficiency)}
                  ${isHovered ? 'shadow-lg' : ''}
                `}
                style={{ 
                  width: `${proficiency}%`,
                  transitionDelay: isHovered ? '0ms' : '200ms'
                }}
              />
            </div>
            
            {/* Animated glow effect on hover */}
            <div className={`
              absolute top-0 left-0 h-2 rounded-full transition-opacity duration-300
              ${isHovered ? 'opacity-60' : 'opacity-0'}
              ${getProficiencyColor(proficiency)} blur-sm
            `}
            style={{ width: `${proficiency}%` }}
            />
          </div>

          {/* Proficiency Label */}
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">
              {getProficiencyLabel(proficiency)}
            </span>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`
                    w-1.5 h-1.5 rounded-full transition-all duration-200
                    ${i < Math.floor(proficiency / 20) 
                      ? getProficiencyColor(proficiency).replace('bg-', 'bg-').replace('-500', '-400')
                      : 'bg-gray-600'
                    }
                    ${isHovered ? 'scale-110' : 'scale-100'}
                  `}
                  style={{ transitionDelay: `${i * 50}ms` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hover border effect */}
      <div className={`
        absolute inset-0 rounded-lg border-2 border-transparent transition-all duration-300
        ${isHovered ? 'border-netflixRed/30' : ''}
        pointer-events-none
      `} />
    </div>
  );
};

export default SkillCard;
