interface ImageCarouselControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  isTransitioning: boolean;
  showControls: boolean;
}

export default function ImageCarouselControls({
  onPrevious,
  onNext,
  isTransitioning,
  showControls,
}: ImageCarouselControlsProps) {
  if (!showControls) return null;

  return (
    <>
      <button
        onClick={onPrevious}
        disabled={isTransitioning}
        className={`absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 cursor-pointer hover:scale-110 ${
          isTransitioning ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        aria-label="Previous image"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={onNext}
        disabled={isTransitioning}
        className={`absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 cursor-pointer hover:scale-110 ${
          isTransitioning ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        aria-label="Next image"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </>
  );
}
