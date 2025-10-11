
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleIGClick = () => {
    window.open('https://instagram.com/dqffqriftm', '_blank');
  };

  const handleKemnakerClick = () => {
    window.open('https://maganghub.kemnaker.go.id/', '_blank');
  };

  return (
    <footer className="bg-gradient-to-r from-purple-900 via-blue-900 to-cyan-900 text-white py-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
      
      {/* Animated Orbs */}
      <div className="absolute -top-4 -left-4 w-8 h-8 bg-pink-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-cyan-400 rounded-full blur-xl opacity-30 animate-bounce delay-1000"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
          
          {/* Left Side - Kemnaker Data */}
          <div 
            onClick={handleKemnakerClick}
            className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
          >
            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/20 hover:bg-white/15 hover:border-purple-300/50">
              <div className="relative">
                <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-ping absolute"></div>
                <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-400 rounded-full relative"></div>
              </div>
              <div className="text-left">
                <div className="text-xs text-gray-300 font-light">Powered by</div>
                <div className="text-sm font-semibold bg-gradient-to-r from-green-300 to-blue-300 bg-clip-text text-transparent">
                  Maganghub kemnaker
                </div>
              </div>
              <svg className="w-4 h-4 text-gray-400 group-hover:text-cyan-300 transform group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          </div>

          {/* Center - Copyright */}
          <div className="text-center">
            <div className="text-xs text-gray-300 mb-1 font-light">
              Built with 💫 by the community
            </div>
            <div className="text-sm text-gray-200">
              © {currentYear} • All vibes reserved
            </div>
          </div>

          {/* Right Side - Author */}
          <div 
            onClick={handleIGClick}
            className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
          >
            <div className="flex items-center space-x-3 bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl px-4 py-3 border border-pink-400/30 hover:border-pink-300/50 hover:from-pink-500/30 hover:to-purple-500/30">
              <div className="text-left">
                <div className="text-xs text-gray-300 font-light">Crafted by</div>
                <div className="text-sm font-bold bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                  Daffa Ariftama
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <div className="w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-400 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full border-2 border-purple-900 animate-pulse"></div>
                </div>
                <svg className="w-4 h-4 text-pink-300 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Tagline */}
        <div className="text-center mt-6 pt-4 border-t border-white/10">
          <div className="text-xs text-gray-400 font-light">
            Leveling up internships, one connection at a time 🚀
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;