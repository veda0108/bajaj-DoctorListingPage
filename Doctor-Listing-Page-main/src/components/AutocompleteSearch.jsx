import { useState, useEffect, useRef } from 'react';

function AutocompleteSearch({ doctors, onSearch, initialValue }) {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    setSearchTerm(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target) && 
          inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.length > 0) {
      const filtered = doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (doctor) => {
    setSearchTerm(doctor.name);
    setShowSuggestions(false);
    onSearch(doctor.name);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setShowSuggestions(false);
      onSearch(searchTerm);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (searchTerm.length > 0) {
      setShowSuggestions(true);
    }
  };

  return (
    <div className="relative">
      <div className={`flex items-center relative rounded-xl overflow-hidden border-2 transition-all duration-300 ${isFocused ? 'border-blue-500 shadow-md' : 'border-gray-300'}`}>
        <div className="absolute left-4 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={() => setIsFocused(false)}
          placeholder="Search for doctors..."
          data-testid="autocomplete-input"
          className="w-full p-4 pl-12 outline-none text-gray-800 bg-white placeholder-gray-400 font-medium"
        />
        {searchTerm && (
          <button 
            onClick={() => {
              setSearchTerm('');
              setSuggestions([]);
              setShowSuggestions(false);
              onSearch('');
              inputRef.current.focus();
            }}
            className="absolute right-4 text-gray-400 hover:text-gray-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <ul 
          ref={suggestionsRef}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
        >
          {suggestions.map((doctor) => (
            <li 
              key={doctor.id} 
              onClick={() => handleSuggestionClick(doctor)}
              data-testid="suggestion-item"
              className="p-3 hover:bg-blue-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0 flex items-center"
            >
              <img 
                src={doctor.photo} 
                alt={doctor.name} 
                className="w-8 h-8 rounded-full mr-3 object-cover"
              />
              <div>
                <div className="font-medium text-gray-800">{doctor.name}</div>
                <div className="text-xs text-gray-500">
                  {doctor.specialities.map(s => s.name).join(', ')}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AutocompleteSearch;