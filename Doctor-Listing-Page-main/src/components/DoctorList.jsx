import { useState } from 'react';
import DoctorCard from './DoctorCard';

function DoctorList({ doctors }) {
  const [displayCount, setDisplayCount] = useState(15);
  
  const visibleDoctors = doctors.slice(0, displayCount);
  const hasMore = displayCount < doctors.length;
  
  const handleLoadMore = () => {
    setDisplayCount(prevCount => prevCount + 15);
  };

  return (
    <div className="flex-1 space-y-4">
      {doctors.length > 0 ? (
        <>
          <div className="space-y-4">
            {visibleDoctors.map(doctor => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
          
          {hasMore && (
            <div className="flex justify-center mt-8">
              <button 
                onClick={handleLoadMore}
                className="bg-white border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-medium py-3 px-8 rounded-xl transition-colors flex items-center"
              >
                Load More
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl shadow">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-gray-400 mb-4">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <h3 className="text-xl font-semibold text-gray-700">No doctors found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}

export default DoctorList;