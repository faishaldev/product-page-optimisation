import Image from 'next/image';

interface ImageCarouselThumbnailsProps {
  images: string[];
  currentIndex: number;
  onThumbnailClick: (index: number) => void;
  title: string;
  isTransitioning: boolean;
}

export default function ImageCarouselThumbnails({
  images,
  currentIndex,
  onThumbnailClick,
  title,
  isTransitioning,
}: ImageCarouselThumbnailsProps) {
  if (images.length <= 1) return null;

  return (
    <div className="flex space-x-2 overflow-x-auto pb-2">
      {images.map((image, index) => (
        <button
          key={index}
          onClick={() => onThumbnailClick(index)}
          disabled={isTransitioning}
          className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
            index === currentIndex
              ? 'border-blue-500 ring-2 ring-blue-200'
              : 'border-gray-200 hover:border-gray-300'
          } ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <Image
            src={image}
            alt={`${title} thumbnail ${index + 1}`}
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        </button>
      ))}
    </div>
  );
}
