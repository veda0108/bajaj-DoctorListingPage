function DoctorCard({ doctor }) {
    return (
      <div 
        className="flex flex-col sm:flex-row gap-6 p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
        data-testid="doctor-card"
      >
        <div className="flex-shrink-0 flex items-center justify-center">
          <img 
            src={doctor.photo} 
            alt={doctor.name} 
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white shadow-md"
          />
        </div>
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
            <h3 className="font-semibold text-xl text-gray-900" data-testid="doctor-name">{doctor.name}</h3>
            <p className="font-medium text-blue-600" data-testid="doctor-fee">{doctor.fees}</p>
          </div>
          <p className="text-gray-700 font-medium mb-1" data-testid="doctor-specialty">
            {doctor.specialities.map(s => s.name).join(', ')}
          </p>
          <p className="text-gray-600 text-sm mb-3" data-testid="doctor-experience">{doctor.experience}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {doctor.video_consult && (
              <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <path d="M23 7l-7 5 7 5V7z"></path>
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                </svg>
                Video Consult
              </span>
            )}
            {doctor.in_clinic && (
              <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                In Clinic
              </span>
            )}
          </div>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">Book Appointment</button>
        </div>
      </div>
    );
  }
  
  export default DoctorCard;