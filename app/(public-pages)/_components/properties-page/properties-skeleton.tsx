
export function PropertySkeleton() {
  return (
    <div className="relative w-full flex overflow-hidden items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100/30 to-transparent animate-shimmer" />
      <div className="w-full h-[20rem] sm:h-[22rem] md:h-[25rem] relative">
        <div className="flex w-full space-x-4 px-2 animate-pulse">
          {[...Array(1)].map((_, i) => (
            <div
              key={i}
              className="relative w-full h-[20rem] sm:h-[22rem] md:h-[25rem] basis-3/4"
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                {/* Main image placeholder */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600" />
                
                {/* Content overlay */}
                <div className="absolute inset-0 p-4 flex flex-col justify-between">
                  {/* Button placeholder */}
                  <div className="relative flex-1 flex items-center justify-center">
                    <div className="h-10 w-40 bg-gray-300 dark:bg-gray-600 rounded-lg" />
                  </div>
                  
                  {/* Text placeholders */}
                  <div className="grid gap-2">
                    <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-600 rounded-md" />
                    <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-600 rounded-md" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation buttons placeholder */}
        <div className="absolute flex gap-2 right-4 top-1/2 -translate-y-1/2">
          <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600" />
          <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600" />
        </div>
      </div>
    </div>
  );
}