function SpecialtyFilter({ specialties, selectedSpecialties, onChange, isExpanded, toggleSection }) {
    return (
      <div className="mb-6 pb-6 border-b border-gray-200 last:border-b-0 last:pb-0 last:mb-0">
        <h3 
          onClick={toggleSection}
          data-testid="filter-header-speciality"
          className="flex justify-between items-center font-semibold text-gray-800 cursor-pointer transition-colors hover:text-blue-600"
        >
          Speciality
          <span className="text-blue-500 transition-transform duration-300" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </span>
        </h3>
        {isExpanded && (
          <div className="mt-3 space-y-3 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100 pl-1">
            {specialties.map(specialty => {
              const testId = `filter-specialty-${specialty.replace(/\s+/g, '-').replace('/', '-')}`;
              return (
                <label key={specialty} className="flex items-center space-x-3 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={selectedSpecialties.includes(specialty)}
                      onChange={(e) => onChange(specialty, e.target.checked)}
                      data-testid={testId}
                      className="peer sr-only"
                    />
                    <div className="w-5 h-5 border border-gray-300 rounded peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-colors"></div>
                    <div className="absolute w-3 h-2 border-t-0 border-r-2 border-b-2 border-l-0 border-white rotate-45 left-1.5 top-1.5 opacity-0 peer-checked:opacity-100"></div>
                  </div>
                  <span className="text-gray-700 group-hover:text-blue-600 transition-colors">{specialty}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>
    );
  }
  
  export default SpecialtyFilter;