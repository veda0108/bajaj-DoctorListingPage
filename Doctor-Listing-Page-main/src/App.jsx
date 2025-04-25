// src/App.jsx
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import DoctorList from './components/DoctorList';
import FilterPanel from './components/FilterPanel';
import AutocompleteSearch from './components/AutocompleteSearch';

function App() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json');
        const data = await response.json();
        setDoctors(data);
        setFilteredDoctors(data);
        setLoading(false);
        
        applyFilters(data, searchParams);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const applyFilters = (doctorList, params) => {
    let filtered = [...doctorList];
    
    if (params.get('name')) {
      filtered = filtered.filter(doctor => 
      doctor.name.toLowerCase().includes(params.get('name').toLowerCase())
      );
    }
    
    if (params.get('mode')) {
      const mode = params.get('mode');
      if (mode === 'video') {
        filtered = filtered.filter(doctor => doctor.video_consult);
      } else if (mode === 'clinic') {
        filtered = filtered.filter(doctor => doctor.in_clinic);
      }
    }
    
    if (params.get('specialty')) {
      const specialties = params.get('specialty').split(',');
      filtered = filtered.filter(doctor => 
        doctor.specialities.some(s => specialties.includes(s.name))
      );
    }
    

    if (params.get('sort')) {
      const sortBy = params.get('sort');
      if (sortBy === 'fees') {
        filtered.sort((a, b) => parseFloat(a.fees.replace(/[^\d.]/g, '')) - parseFloat(b.fees.replace(/[^\d.]/g, '')));
      } else if (sortBy === 'experience') {
        filtered.sort((a, b) => {
          const expA = parseInt(a.experience);
          const expB = parseInt(b.experience);
          return expB - expA;
        });
      }
    }
    
    setFilteredDoctors(filtered);
  };

  const handleSearch = (searchTerm) => {
    const newParams = new URLSearchParams(searchParams);
    if (searchTerm) {
      newParams.set('name', searchTerm);
    } else {
      newParams.delete('name');
    }
    setSearchParams(newParams);
    applyFilters(doctors, newParams);
  };

  const handleFilterChange = (newParams) => {
    setSearchParams(newParams);
    applyFilters(doctors, newParams);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="bg-indigo-900 text-white py-6 mb-6 shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl font-bold">Doctor Listing</h1>
          <p className="text-indigo-200 mt-1">Connect with healthcare professionals</p>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 pb-12">
        <div className="bg-white p-4 rounded-xl shadow-md mb-6">
          <AutocompleteSearch 
            doctors={doctors} 
            onSearch={handleSearch} 
            initialValue={searchParams.get('name') || ''}
          />
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <aside className="w-full md:w-64">
            <FilterPanel 
              doctors={doctors} 
              searchParams={searchParams} 
              onFilterChange={handleFilterChange} 
            />
          </aside>
          
          <section className="flex-1">
            {loading ? (
              <div className="bg-white rounded-xl shadow-md p-12 flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
                <p className="text-gray-700 font-medium">Loading doctors...</p>
              </div>
            ) : (
              <DoctorList doctors={filteredDoctors} />
            )}
          </section>
        </div>
        
        {!loading && filteredDoctors.length > 0 && (
          <div className="mt-8 text-center text-gray-500 text-sm">
            Showing {filteredDoctors.length} {filteredDoctors.length === 1 ? 'doctor' : 'doctors'}
          </div>
        )}
      </main>
      
      <footer className="bg-gray-800 text-gray-300 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p>© Showcase by Sarthak Bisht.</p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <a href="#" className="hover:text-white transition-colors">About</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;