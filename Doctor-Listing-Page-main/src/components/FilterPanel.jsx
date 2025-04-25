import { useState } from 'react';
import ConsultationModeFilter from './ConsultationModeFilter';
import SpecialtyFilter from './SpecialtyFilter';
import SortFilter from './SortFilter';

function FilterPanel({ doctors, searchParams, onFilterChange }) {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleModeChange = (mode) => {
    const newParams = new URLSearchParams(searchParams);
    if (mode) {
      newParams.set('mode', mode);
    } else {
      newParams.delete('mode');
    }
    onFilterChange(newParams);
  };

  const handleSpecialtyChange = (specialty, isChecked) => {
    const newParams = new URLSearchParams(searchParams);
    let specialties = newParams.get('specialty') ? newParams.get('specialty').split(',') : [];
    
    if (isChecked) {
      specialties.push(specialty);
    } else {
      specialties = specialties.filter(s => s !== specialty);
    }
    
    if (specialties.length > 0) {
      newParams.set('specialty', specialties.join(','));
    } else {
      newParams.delete('specialty');
    }
    
    onFilterChange(newParams);
  };

  const handleSortChange = (sortBy) => {
    const newParams = new URLSearchParams(searchParams);
    if (sortBy) {
      newParams.set('sort', sortBy);
    } else {
      newParams.delete('sort');
    }
    onFilterChange(newParams);
  };

  // Extract all unique specialties from doctors
  const allSpecialties = Array.from(
    new Set(
      doctors.flatMap(doctor => 
        doctor.specialities ? doctor.specialities.map(s => s.name) : []
      )
    )
  ).sort();

  return (
    <div className="w-full md:w-64 bg-white p-5 rounded-xl shadow-lg">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Filters</h2>
      <ConsultationModeFilter 
        currentMode={searchParams.get('mode')} 
        onChange={handleModeChange}
        isExpanded={expandedSection === 'mode'}
        toggleSection={() => toggleSection('mode')}
      />
      
      <SpecialtyFilter 
        specialties={allSpecialties}
        selectedSpecialties={searchParams.get('specialty')?.split(',') || []}
        onChange={handleSpecialtyChange}
        isExpanded={expandedSection === 'specialty'}
        toggleSection={() => toggleSection('specialty')}
      />
      
      <SortFilter 
        currentSort={searchParams.get('sort')}
        onChange={handleSortChange}
        isExpanded={expandedSection === 'sort'}
        toggleSection={() => toggleSection('sort')}
      />
    </div>
  );
}

export default FilterPanel;