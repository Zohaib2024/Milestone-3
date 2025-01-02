const CircularLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="loader w-16 h-16 border-4 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
      <style jsx>{`
        .loader {
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default CircularLoader;
