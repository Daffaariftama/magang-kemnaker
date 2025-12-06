import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface JobCardProps {
  job: any;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const navigate = useNavigate();
  const [showProgramStudiModal, setShowProgramStudiModal] = useState(false);


  const parseJSON = (data: string) => {
    try {
      if (!data) return [];
      return typeof data === 'string' ? JSON.parse(data) : data || [];
    } catch {
      return [];
    }
  };

  const programStudi = parseJSON(job.program_studi);
  const displayedProgramStudi = programStudi.slice(0, 3);
  const remainingCount = programStudi.length - 3;

  const handleCardClick = () => {
    sessionStorage.setItem("magang_scrollPosition", window.scrollY.toString());
    sessionStorage.setItem("magang_shouldRestoreScroll", 'true');
    navigate(`/lowongan/${job.id_posisi}`, { state: { job } });
  };

  const ProgramStudiModal = () => (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={() => setShowProgramStudiModal(false)}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-700 p-5 text-white">
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold">Program Studi</h3>
                <p className="text-purple-200 text-xs">{programStudi.length} program tersedia</p>
              </div>
            </div>
            <button
              onClick={() => setShowProgramStudiModal(false)}
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto max-h-[calc(85vh-180px)] subtle-scrollbar">
          <div className="space-y-2">
            {programStudi.map((ps: any, index: number) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-gradient-to-r from-purple-50 to-white text-gray-700 px-4 py-3 rounded-xl border border-purple-100 hover:border-purple-200 hover:shadow-sm transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 text-xs font-bold">{index + 1}</span>
                </div>
                <span className="font-medium text-sm">{ps.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 p-4 bg-gray-50">
          <button
            onClick={() => setShowProgramStudiModal(false)}
            className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-semibold text-sm transition-all"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div
        onClick={handleCardClick}
        className="group relative bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-md hover:shadow-xl hover:shadow-purple-500/10 hover:border-purple-200 transition-all duration-300 h-full flex flex-col cursor-pointer"
      >
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-4 sm:mb-6">
            {/* Company Logo */}
            <div className="flex-shrink-0">
              {job.perusahaan.logo ? (
                <img
                  src={job.perusahaan.logo}
                  alt={job.perusahaan.nama_perusahaan}
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl object-contain p-1 border border-gray-100 bg-white"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) fallback.classList.remove('hidden');
                  }}
                />
              ) : null}
              <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-[#F3E8FF] flex items-center justify-center ${job.perusahaan.logo ? 'hidden' : ''}`}>
                <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#8b5cf6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {job.jumlah_kuota > 0 && (
                <span className="px-2 py-1 sm:px-3 rounded-full bg-gray-50 text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {job.jumlah_kuota} Kuota
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Title and Company */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-[#2E1065] mb-2 line-clamp-2 group-hover:text-[#8b5cf6] transition-colors">
            {job.posisi}
          </h3>
          <div className="text-sm text-gray-500 font-medium flex items-center gap-2">
            {job.perusahaan.nama_perusahaan}
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span className="text-gray-400">{job.perusahaan.nama_kabupaten}</span>
          </div>
        </div>

        {/* Program Studies - Minimalist Pills */}
        <div className="mb-8 flex-1">
          {Array.isArray(programStudi) && programStudi.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {displayedProgramStudi.map((ps: any, idx: number) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-white border border-gray-200 text-xs font-semibold text-gray-500 group-hover:border-[#8b5cf6] group-hover:text-[#8b5cf6] transition-colors"
                >
                  {ps.title || ps}
                </span>
              ))}
              {remainingCount > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowProgramStudiModal(true);
                  }}
                  className="px-3 py-1 rounded-full bg-gray-50 text-xs font-semibold text-gray-400 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                >
                  +{remainingCount}
                </button>
              )}
            </div>
          ) : (
            <div className="text-xs text-gray-400 italic">
              Semua jurusan
            </div>
          )}
        </div>

        {/* Footer Action */}
        <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white" />
              <div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white" />
              <div className="w-6 h-6 rounded-full bg-gray-400 border-2 border-white" />
            </div>
            <span className="text-xs text-gray-400 font-medium">
              {job.jumlah_terdaftar > 0 ? `+${job.jumlah_terdaftar} pendaftar` : 'Jadilah yang pertama'}
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#F3E8FF] flex items-center justify-center group-hover:bg-[#8b5cf6] transition-colors">
            <svg className="w-5 h-5 text-[#8b5cf6] group-hover:text-white rotate-180 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </div>
        </div>
      </div>

      {/* Modal Program Studi */}
      {showProgramStudiModal && <ProgramStudiModal />}
    </>
  );
};

export default JobCard;