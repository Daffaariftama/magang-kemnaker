import { motion } from 'framer-motion';
import { useJobs } from "../hooks/useJobs";

const Header = () => {
  const { stats } = useJobs();

  return (
    <header className="relative bg-gradient-to-br from-purple-200 via-pink-100 to-indigo-200 overflow-hidden animate-gradient">
      {/* Aurora Gradient Blur Effects with Float Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-400/50 rounded-full blur-[150px] animate-float-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-400/50 rounded-full blur-[150px] animate-float-reverse"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-400/40 rounded-full blur-[130px] animate-pulse-slow"></div>
        <div className="absolute top-1/4 right-1/3 w-[400px] h-[400px] bg-violet-400/35 rounded-full blur-[120px] animate-float-diagonal"></div>
      </div>


      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-28 lg:py-36 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Small Badge */}
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-100 shadow-sm mb-8 hover:shadow-md transition-shadow">
            <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
            <span className="text-sm font-semibold text-gray-700">
              Unofficial Platform Magang Kemnaker
            </span>
          </div>

          {/* Main Heading with Sticky Note */}
          <div className="relative inline-block">
            {/* Batch 3 Sticky Note (Completed) */}
            <div className="absolute -top-12 -right-16 sm:-top-16 sm:-right-20 md:-right-24 z-10 pointer-events-none select-none opacity-80 rotate-12 scale-90 grayscale">
              <div className="relative bg-gradient-to-br from-yellow-200 to-yellow-300 px-3 py-2 sm:px-4 sm:py-2.5 shadow-md">
                {/* Tape effect at top */}
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-8 h-2.5 bg-yellow-100/80 rounded-sm rotate-3"></div>
                {/* Content */}
                <div className="text-center relative">
                  <div className="text-[8px] sm:text-[10px] font-bold text-yellow-800/60 uppercase tracking-wide">Program</div>
                  <div className="text-sm sm:text-base md:text-lg font-black text-yellow-900/60 leading-tight whitespace-nowrap animate-scribble">
                    Batch 3
                  </div>
                </div>
              </div>
            </div>

            {/* Batch 4 Sticky Note (Natural Wind Animation with Framer Motion) */}
            <motion.div
              className="absolute -top-6 -right-2 sm:-top-8 sm:-right-4 md:-right-8 z-20 pointer-events-none select-none"
              style={{ originX: 0.5, originY: 0 }} // Pivot at top center (tape location)
              animate={{
                rotate: [0, 4, -4, 2, -2, 0], // Natural sway keyframes
              }}
              transition={{
                duration: 4, // Slower duration for more natural feel
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror",
                delay: 0.5, // Slight offset
              }}
            >
              <div className="relative bg-gradient-to-br from-pink-200 to-rose-300 px-3 py-2 sm:px-4 sm:py-2.5 shadow-lg transform rotate-[-2deg] border-b-2 border-r-2 border-black/5">
                {/* Tape effect at top */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 sm:w-10 h-2.5 sm:h-3 bg-white/40 backdrop-blur-sm rounded-sm shadow-sm rotate-[-1deg] border border-white/20"></div>
                {/* Content */}
                <div className="text-center">
                  <div className="text-[8px] sm:text-[9px] font-bold text-rose-900/70 uppercase tracking-wider mb-0.5">Upcoming</div>
                  <div className="text-sm sm:text-base md:text-lg font-black text-rose-950 leading-none whitespace-nowrap mb-0.5">
                    Batch 4
                  </div>
                  <div className="text-[8px] sm:text-[10px] font-bold text-rose-800 bg-white/30 rounded-full px-2 py-0.5 inline-block mx-auto">
                    Coming Soon
                  </div>
                </div>
                {/* Paper fold shadow */}
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-gradient-to-br from-transparent via-transparent to-black/10"></div>
              </div>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-[1.15] tracking-tight px-4 sm:px-0">
              <span className="relative inline-block pb-2">
                Seamless Platform
                <div className="absolute bottom-0 left-0 right-0 h-4 bg-purple-300/70 rounded-full -z-10"></div>
              </span>
              <br />
              <span className="text-gray-700">for Smarter</span>{" "}
              <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
                Internships
              </span>
            </h1>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Optimize your workflow. Experience a seamless, more productive internship search journey.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col items-center justify-center mb-6">
            <button
              onClick={() => {
                document.getElementById('filter-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-10 py-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Mulai Cari Magang
            </button>
          </div>

          {/* Small Text */}
          <p className="text-sm text-gray-500">
            Gratis 100% • Bergabung dengan ribuan pencari magang
          </p>

          {/* Stats Section */}
          <div className="mt-24 pt-12 border-t border-gray-200/50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              <div className="text-center group">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {stats?.["Jumlah Lowongan"]?.toLocaleString() || "1,200"}+
                </div>
                <div className="text-sm text-gray-600 font-medium">Lowongan Aktif</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {stats?.["Jumlah Perusahaan"]?.toLocaleString() || "1,000"}+
                </div>
                <div className="text-sm text-gray-600 font-medium">Perusahaan</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  100%
                </div>
                <div className="text-sm text-gray-600 font-medium">Gratis</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  24/7
                </div>
                <div className="text-sm text-gray-600 font-medium">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
