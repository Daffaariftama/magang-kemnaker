
const RunningMessage = () => {
  const messages = [
    "📢 Data lowongan magang diperoleh dari MagangHub Kemnaker RI",
    "🔍 Data terupdate langsung dari sistem MagangHub Kemnaker",
    "🫶🏻 hidup jokowi"
  ];

  return (
    <div className="bg-blue-900 border-t border-b border-blue-700 py-3 overflow-hidden">
      <div className="flex">
        <div className="animate-marquee whitespace-nowrap flex">
          {messages.map((message, index) => (
            <span key={index} className="mx-8 text-blue-100 text-sm font-medium">
              {message}
            </span>
          ))}
        </div>
        {/* Duplicate for seamless loop */}
        <div className="animate-marquee whitespace-nowrap flex">
          {messages.map((message, index) => (
            <span key={index} className="mx-8 text-blue-100 text-sm font-medium">
              {message}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RunningMessage;