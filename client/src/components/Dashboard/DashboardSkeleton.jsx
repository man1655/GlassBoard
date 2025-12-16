import React from 'react';

const DashboardSkeleton = () => {
  return (
    <div className="animate-pulse space-y-8">
      {/* 1. Header Skeleton */}
      <div>
        <div className="h-8 w-48 bg-white/10 rounded-lg mb-2"></div>
        <div className="h-4 w-64 bg-white/5 rounded-lg"></div>
      </div>

      {/* 2. Stats Grid Skeleton (Matches your grid-cols-4) */}
      <div className="grid grid-cols-4 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div 
            key={i} 
            className="h-32 bg-white/5 border border-white/5 rounded-2xl" 
          />
        ))}
      </div>

      {/* 3. Charts & Logs Skeleton (Matches your grid layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Area (Span 2) */}
        <div className="lg:col-span-2 h-[450px] bg-white/5 border border-white/5 rounded-2xl p-8 flex flex-col">
            <div className="flex justify-between mb-8">
                <div className="h-6 w-32 bg-white/10 rounded"></div>
                <div className="h-8 w-24 bg-white/10 rounded"></div>
            </div>
            <div className="flex-1 bg-white/5 rounded-xl"></div>
        </div>

        {/* Logs Area (Span 1) */}
        <div className="lg:col-span-1 h-[450px] bg-white/5 border border-white/5 rounded-2xl p-6">
             <div className="flex justify-between mb-6">
                <div className="h-6 w-24 bg-white/10 rounded"></div>
            </div>
            <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((j) => (
                    <div key={j} className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-white/10"></div>
                        <div className="flex-1 space-y-2">
                             <div className="h-3 w-3/4 bg-white/10 rounded"></div>
                             <div className="h-2 w-1/2 bg-white/5 rounded"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;