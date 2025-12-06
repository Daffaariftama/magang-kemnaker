
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleIGClick = () => {
    window.open('https://instagram.com/dqffqriftm', '_blank');
  };

  return (
    <footer className="bg-gray-900 text-white py-8 sm:py-10">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Main Content */}
        <div className="text-center space-y-6">
          {/* Logo/Brand */}
          <div className="flex items-center justify-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Explore Magang
            </span>
          </div>

          {/* Tagline */}
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            Unofficial platform untuk mencari lowongan magang dari Kemnaker dengan lebih mudah dan cepat.
          </p>

          {/* Contact CTA */}
          <div className="py-4">
            <button
              onClick={handleIGClick}
              className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-full transition-all hover:scale-105 active:scale-95"
            >
              <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-white">Ada masalah? DM saya di Instagram</span>
            </button>
          </div>

          {/* Powered By & Copyright */}
          <div className="pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-gray-500">
            <span>Data dari <a href="https://maganghub.kemnaker.go.id/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors">Maganghub Kemnaker</a></span>
            <span className="hidden sm:inline">•</span>
            <span>© {currentYear} Daffa Ariftama</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;