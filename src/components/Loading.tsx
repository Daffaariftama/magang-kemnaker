interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = "Memuat..." }) => {
  return (
    <div className="flex flex-col justify-center items-center py-16">
      {/* Animated Spinner with Purple Gradient */}
      <div className="relative">
        <div className="w-14 h-14 rounded-full border-4 border-purple-100"></div>
        <div className="absolute top-0 left-0 w-14 h-14 rounded-full border-4 border-transparent border-t-purple-600 border-r-purple-600 animate-spin"></div>
      </div>

      {/* Loading Text */}
      <p className="mt-5 text-gray-600 font-medium text-sm">{message}</p>

      {/* Animated Dots */}
      <div className="flex gap-1.5 mt-3">
        <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 rounded-full bg-purple-600 animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );
};

export default Loading;