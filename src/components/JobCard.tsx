import { useState } from 'react';

interface JobCardProps {
  job: any;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const [showProgramStudiModal, setShowProgramStudiModal] = useState(false);
  const [showJobDetailModal, setShowJobDetailModal] = useState(false);

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const parseJSON = (data: string) => {
    try {
      return typeof data === 'string' ? JSON.parse(data) : data || [];
    } catch {
      return [];
    }
  };

  const programStudi = parseJSON(job.program_studi);
  const jenjang = parseJSON(job.jenjang);
  const displayedProgramStudi = programStudi.slice(0, 3);
  const remainingCount = programStudi.length - 3;

  const handleCardClick = () => {
    setShowJobDetailModal(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setShowJobDetailModal(false);
    // Restore body scroll
    document.body.style.overflow = 'unset';
  };

  const handleDaftarClick = () => {
    window.open(`https://maganghub.kemnaker.go.id/lowongan/view/${job.id_posisi}`, '_blank');
  };

  const calculateDuration = () => {
    if (!job?.jadwal) return 0;
    const start = new Date(job.jadwal.tanggal_mulai);
    const end = new Date(job.jadwal.tanggal_selesai);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
    return diffMonths;
  };

  const duration = calculateDuration();

  const ProgramStudiModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowProgramStudiModal(false)}>
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-96 overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="bg-gradient-to-r from-primary-900 to-purple-900 p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-white font-bold text-lg">Program Studi</h3>
            <button
              onClick={() => setShowProgramStudiModal(false)}
              className="text-white hover:text-gray-200 transition-colors p-1"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div className="p-4 max-h-64 overflow-y-auto">
          <div className="space-y-2">
            {programStudi.map((ps: any, index: number) => (
              <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg border border-blue-100">
                <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-blue-800 font-medium">{ps.title}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
          <button
            onClick={() => setShowProgramStudiModal(false)}
            className="w-full bg-gradient-to-r from-primary-900 to-purple-900 text-white py-2 px-4 rounded-lg hover:from-primary-800 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200 font-medium"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );

  const JobDetailModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={handleCloseModal}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-900 to-purple-900 p-6 text-white">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                {job.perusahaan.logo && (
                  <img 
                    src={job.perusahaan.logo} 
                    alt={`Logo ${job.perusahaan.nama_perusahaan}`}
                    className="w-12 h-12 object-contain bg-white rounded-xl p-2 flex-shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                )}
                <div className="flex-1">
                  <h1 className="text-xl font-bold leading-tight">{job.posisi}</h1>
                  <p className="text-white/90 text-sm mt-1">{job.perusahaan.nama_perusahaan}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center text-white/80">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  {job.perusahaan.nama_kabupaten}, {job.perusahaan.nama_provinsi}
                </div>
                <div className="flex items-center text-white/80">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {duration} Bulan
                </div>
                <div className="flex items-center text-green-300">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {job.ref_status_posisi.nama_status_posisi}
                </div>
              </div>
            </div>
            
            <button
              onClick={handleCloseModal}
              className="text-white hover:text-gray-200 transition-colors p-1 flex-shrink-0"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="text-gray-600 text-sm mb-1">Kuota Tersedia</div>
                  <div className="text-2xl font-bold text-primary-900">{job.jumlah_kuota}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="text-gray-600 text-sm mb-1">Sudah Daftar</div>
                  <div className="text-2xl font-bold text-green-600">{job.jumlah_terdaftar}</div>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Timeline Magang
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <div className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Mulai
                    </div>
                    <span className="font-semibold text-gray-900">{formatDate(job.jadwal.tanggal_mulai)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <div className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Selesai
                    </div>
                    <span className="font-semibold text-gray-900">{formatDate(job.jadwal.tanggal_selesai)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2">
                    <div className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Batas Daftar
                    </div>
                    <span className="font-semibold text-red-600">{formatDate(job.jadwal.tanggal_batas_pendaftaran)}</span>
                  </div>
                </div>
              </div>

              {/* Program Studi */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  </svg>
                  Program Studi ({programStudi.length})
                </h3>
                
                <div className="flex flex-wrap gap-2">
                  {programStudi.map((ps: any, index: number) => (
                    <span 
                      key={index} 
                      className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-800 text-sm px-3 py-2 rounded-lg border border-blue-200 font-medium"
                    >
                      {ps.title}
                    </span>
                  ))}
                </div>
              </div>

              {/* Deskripsi */}
              {job.deskripsi_posisi && (
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-4">📝 Deskripsi Pekerjaan</h3>
                  <div className="text-gray-700 leading-relaxed space-y-3">
                    {job.deskripsi_posisi.split('\n').map((paragraph: string, index: number) => (
                      paragraph.trim() && (
                        <p key={index}>{paragraph}</p>
                      )
                    ))}
                  </div>
                </div>
              )}

              {/* Jenjang Pendidikan */}
              {jenjang.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-4">🎓 Jenjang Pendidikan</h3>
                  <div className="flex flex-wrap gap-2">
                    {jenjang.map((j: any, index: number) => (
                      <span 
                        key={index} 
                        className="bg-white text-gray-700 px-3 py-2 rounded-lg font-medium border border-gray-300"
                      >
                        {j.title}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Action Buttons */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <button
                  onClick={handleDaftarClick}
                  className="w-full bg-gradient-to-r from-primary-900 to-purple-900 text-white py-3 px-4 rounded-xl font-bold hover:from-primary-800 hover:to-purple-800 transition-all duration-200 shadow-lg mb-3"
                >
                  📝 Daftar Sekarang
                </button>
                
                <div className="text-center">
                  <p className="text-xs text-gray-500">
                    Anda akan diarahkan ke halaman resmi MagangHub Kemnaker
                  </p>
                </div>
              </div>

              {/* Company Info */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4">🏢 Informasi Perusahaan</h3>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Alamat</p>
                    <p className="text-gray-900 font-medium text-sm leading-relaxed">
                      {job.perusahaan.alamat}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {job.perusahaan.nama_kabupaten}, {job.perusahaan.nama_provinsi}
                    </p>
                  </div>
                  
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">Status Lowongan</p>
                    <div className="flex items-center justify-between">
                      <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium">
                        {job.ref_status_posisi.nama_status_posisi}
                      </span>
                      <span className="text-xs text-gray-500">
                        {job.jumlah_terdaftar}/{job.jumlah_kuota} pendaftar
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Sumber: MagangHub Kemnaker
            </p>
            <button
              onClick={handleCloseModal}
              className="bg-white text-gray-700 py-2 px-4 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50 transition-all duration-200"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div 
        onClick={handleCardClick}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-lg hover:border-primary-300 cursor-pointer h-full flex flex-col group transition-all duration-300"
      >
        {/* Header - Company & Position */}
        <div className="flex items-start space-x-3 mb-3">
          {job.perusahaan.logo && (
            <img 
              src={job.perusahaan.logo} 
              alt={`Logo ${job.perusahaan.nama_perusahaan}`}
              className="w-10 h-10 object-contain rounded-lg border border-gray-200 flex-shrink-0"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          )}
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-bold text-gray-900 line-clamp-2 group-hover:text-primary-900 transition-colors leading-tight">
              {job.posisi}
            </h2>
            <p className="text-primary-900 font-semibold text-sm line-clamp-1 mt-1">
              {job.perusahaan.nama_perusahaan}
            </p>
          </div>
        </div>

        {/* Location & Deadline */}
        <div className="space-y-2 mb-3">
          <div className="flex items-center text-gray-600 text-sm">
            <svg className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            <span className="line-clamp-1">{job.perusahaan.nama_kabupaten}, {job.perusahaan.nama_provinsi}</span>
          </div>

          <div className="flex items-center text-gray-600 text-sm">
            <svg className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Batas: <strong>{formatDate(job.jadwal.tanggal_batas_pendaftaran)}</strong></span>
          </div>
        </div>

        {/* Program Studi */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">Program Studi:</span>
            {remainingCount > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowProgramStudiModal(true);
                }}
                className="text-xs text-primary-900 hover:text-primary-800 font-medium transition-colors bg-primary-50 px-2 py-1 rounded-lg"
              >
                +{remainingCount} lainnya
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {displayedProgramStudi.map((ps: any, index: number) => (
              <span 
                key={index} 
                className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-800 text-xs px-2.5 py-1.5 rounded-lg border border-blue-200 font-medium"
              >
                {ps.title}
              </span>
            ))}
          </div>
        </div>

        {/* Footer - Applicants & Quota */}
        <div className="mt-auto pt-3 border-t border-gray-200">
          <div className="flex justify-between items-center text-sm">
            <div className="text-gray-600">
              <span className="font-bold text-gray-900">{job.jumlah_terdaftar}</span> pendaftar
            </div>
            <div className="text-gray-600">
              Kuota: <span className="font-bold text-gray-900">{job.jumlah_kuota}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Program Studi */}
      {showProgramStudiModal && <ProgramStudiModal />}

      {/* Modal Detail Lowongan */}
      {showJobDetailModal && <JobDetailModal />}
    </>
  );
};

export default JobCard;