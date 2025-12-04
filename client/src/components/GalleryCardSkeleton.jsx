// src/components/GalleryCardSkeleton.jsx
export function GalleryCardSkeleton() {
  return (
    <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
      <div className="aspect-w-16 aspect-h-9">
        <div className="w-full h-80 bg-gradient-to-r from-amber-100 to-amber-200"></div>
      </div>

      <div className="p-6">
        <div className="h-6 bg-gradient-to-r from-amber-100 to-amber-200 rounded-lg mb-3 w-3/4"></div>
        <div className="h-4 bg-gradient-to-r from-amber-100 to-amber-200 rounded-lg mb-2 w-1/2"></div>
        <div className="h-8 bg-gradient-to-r from-amber-100 to-amber-200 rounded-full w-24"></div>
      </div>
    </div>
  );
}
