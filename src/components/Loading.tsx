interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = "Memuat..." }) => {
  return (
    <div className="flex flex-col justify-center items-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
      <p className="text-gray-600">{message}</p>
    </div>
  );
};

export default Loading;