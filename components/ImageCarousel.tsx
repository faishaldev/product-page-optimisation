'use client';

import { useState, useEffect } from 'react';
import ImageCarouselSlide from './ImageCarouselSlide';
import ImageCarouselControls from './ImageCarouselControls';
import ImageCarouselThumbnails from './ImageCarouselThumbnails';

interface ImageCarouselProps {
  images: string[];
  title: string;
}

export default function ImageCarousel({ images, title }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
        <span className="text-gray-500">No image available</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-square bg-white rounded-lg overflow-hidden shadow-lg">
        <div className="relative w-full h-full">
          {images.map((image, index) => (
            <ImageCarouselSlide
              key={index}
              image={image}
              index={index}
              currentIndex={currentIndex}
              title={title}
              priority={index === 0}
            />
          ))}
        </div>

        <ImageCarouselControls
          onPrevious={goToPrevious}
          onNext={goToNext}
          isTransitioning={isTransitioning}
          showControls={images.length > 1}
        />

        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                className={`w-2 h-2 rounded-full transition-all duration-200 cursor-pointer ${
                  index === currentIndex
                    ? 'bg-white scale-125'
                    : 'bg-white/50 hover:bg-white/75'
                } ${isTransitioning ? 'cursor-not-allowed' : ''}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <ImageCarouselThumbnails
        images={images}
        currentIndex={currentIndex}
        onThumbnailClick={goToSlide}
        title={title}
        isTransitioning={isTransitioning}
      />

      {images.length > 1 && (
        <div className="text-center text-sm text-gray-600">
          {currentIndex + 1} of {images.length}
        </div>
      )}
    </div>
  );
}
