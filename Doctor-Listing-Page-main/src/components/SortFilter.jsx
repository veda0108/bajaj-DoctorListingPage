function SortFilter({ currentSort, onChange, isExpanded, toggleSection }) {
    return (
      <div className="mb-6 pb-6 border-b border-gray-200 last:border-b-0 last:pb-0 last:mb-0">
        <h3 
          onClick={toggleSection}
          data-testid="filter-header-sort"
          className="flex justify-between items-center font-semibold text-gray-800 cursor-pointer transition-colors hover:text-blue-600"
        >
          Sort
          <span className="text-blue-500 transition-transform duration-300" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </span>
        </h3>
        {isExpanded && (
          <div className="mt-3 space-y-3 pl-1">
            <label className="flex items-center space-x-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="radio"
                  name="sort"
                  checked={currentSort === 'fees'}
                  onChange={() => onChange('fees')}
                  data-testid="sort-fees"
                  className="peer sr-only"
                />
                <div className="w-5 h-5 border border-gray-300 rounded-full peer-checked:border-blue-500 peer-checked:border-2"></div>
                <div className="absolute w-3 h-3 bg-blue-500 rounded-full top-1 left-1 opacity-0 peer-checked:opacity-100"></div>
              </div>
              <span className="text-gray-700 group-hover:text-blue-600 transition-colors">Fees (Low to High)</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="radio"
                  name="sort"
                  checked={currentSort === 'experience'}
                  onChange={() => onChange('experience')}
                  data-testid="sort-experience"
                  className="peer sr-only"
                />
                <div className="w-5 h-5 border border-gray-300 rounded-full peer-checked:border-blue-500 peer-checked:border-2"></div>
                <div className="absolute w-3 h-3 bg-blue-500 rounded-full top-1 left-1 opacity-0 peer-checked:opacity-100"></div>
              </div>
              <span className="text-gray-700 group-hover:text-blue-600 transition-colors">Experience (High to Low)</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="radio"
                  name="sort"
                  checked={!currentSort}
                  onChange={() => onChange(null)}
                  className="peer sr-only"
                />
                <div className="w-5 h-5 border border-gray-300 rounded-full peer-checked:border-blue-500 peer-checked:border-2"></div>
                <div className="absolute w-3 h-3 bg-blue-500 rounded-full top-1 left-1 opacity-0 peer-checked:opacity-100"></div>
              </div>
              <span className="text-gray-700 group-hover:text-blue-600 transition-colors">None</span>
            </label>
          </div>
        )}
      </div>
    );
  }
  
  export default SortFilter;