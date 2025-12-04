// src/components/BlogCardSkeleton.jsx
export function BlogCardSkeleton() {
  return (
    <article className="bg-white rounded-2xl shadow-lg border border-amber-100 overflow-hidden">
      {/* Image Skeleton */}
      <div className="h-48 bg-gradient-to-br from-amber-200 to-red-200 animate-pulse"></div>

      {/* Content Skeleton */}
      <div className="p-6">
        {/* Meta Information Skeleton */}
        <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gradient-to-r from-amber-200 to-red-200 rounded mr-1 animate-pulse"></div>
            <div className="w-20 h-4 bg-gradient-to-r from-amber-200 to-red-200 rounded animate-pulse"></div>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gradient-to-r from-amber-200 to-red-200 rounded mr-1 animate-pulse"></div>
            <div className="w-16 h-4 bg-gradient-to-r from-amber-200 to-red-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Title Skeleton */}
        <div className="h-6 bg-gradient-to-r from-amber-200 to-red-200 rounded mb-3 animate-pulse"></div>
        <div className="h-4 bg-gradient-to-r from-amber-200 to-red-200 rounded mb-3 w-3/4 animate-pulse"></div>

        {/* Excerpt Skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gradient-to-r from-amber-100 to-red-100 rounded animate-pulse"></div>
          <div className="h-4 bg-gradient-to-r from-amber-100 to-red-100 rounded animate-pulse"></div>
          <div className="h-4 bg-gradient-to-r from-amber-100 to-red-100 rounded w-2/3 animate-pulse"></div>
        </div>

        {/* Tags Skeleton */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="w-16 h-6 bg-gradient-to-r from-amber-100 to-red-100 rounded-full animate-pulse"></div>
          <div className="w-12 h-6 bg-gradient-to-r from-amber-100 to-red-100 rounded-full animate-pulse"></div>
          <div className="w-20 h-6 bg-gradient-to-r from-amber-100 to-red-100 rounded-full animate-pulse"></div>
        </div>

        {/* Read More Button Skeleton */}
        <div className="w-24 h-4 bg-gradient-to-r from-amber-200 to-red-200 rounded animate-pulse"></div>
      </div>
    </article>
  );
}
