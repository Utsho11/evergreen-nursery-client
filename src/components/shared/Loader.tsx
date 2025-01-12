const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Loader Wrapper */}
      <div className="relative w-1/2 max-w-xs sm:max-w-sm lg:max-w-md">
        {/* Animated GIF */}
        <img
          src="/loader.gif"
          alt="Loading..."
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default Loader;
