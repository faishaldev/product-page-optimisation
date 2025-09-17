import Image from 'next/image';

interface ImageCarouselSlideProps {
  image: string;
  index: number;
  currentIndex: number;
  title: string;
  priority?: boolean;
}

export default function ImageCarouselSlide({
  image,
  index,
  currentIndex,
  title,
  priority = false,
}: ImageCarouselSlideProps) {
  return (
    <div
      className={`absolute inset-0 transition-all duration-500 ease-in-out ${
        index === currentIndex
          ? 'opacity-100 transform translate-x-0'
          : index < currentIndex
          ? 'opacity-0 transform -translate-x-full'
          : 'opacity-0 transform translate-x-full'
      }`}
    >
      <Image
        src={image}
        alt={`${title} - Image ${index + 1}`}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={priority}
      />
    </div>
  );
}
