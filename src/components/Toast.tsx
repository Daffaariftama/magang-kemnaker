import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onClose?: () => void;
  showAction?: boolean;
  actionLabel?: string;
  onAction?: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = 'success',
  duration = 1500, // Default duration set to 1.5s as requested
  onClose,
  showAction = false,
  actionLabel = 'Lihat',
  onAction,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  // Theme-aware gradients matching the app's purple aesthetic
  const bgClasses = type === 'success'
    ? 'bg-gradient-to-r from-purple-600 to-indigo-600'
    : type === 'error'
      ? 'bg-gradient-to-r from-red-500 to-pink-600'
      : 'bg-gradient-to-r from-blue-500 to-cyan-600';

  const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';

  return (
    <div className={`fixed bottom-4 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 z-50 transition-all duration-300 ${isExiting ? 'translate-y-10 opacity-0' : 'translate-y-0 opacity-100'}`}>
      <div className={`${bgClasses} text-white px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl shadow-lg shadow-purple-900/20 backdrop-blur-sm flex items-center gap-3 w-full sm:w-auto sm:min-w-[320px] max-w-md mx-auto`}>
        <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm sm:text-base border border-white/20">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm sm:text-[15px] leading-snug break-words drop-shadow-sm">{message}</p>
        </div>
        {showAction && onAction && (
          <button
            onClick={onAction}
            className="flex-shrink-0 bg-white/20 hover:bg-white/30 active:bg-white/40 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap border border-white/10"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default Toast;
