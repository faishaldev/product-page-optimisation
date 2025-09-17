interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
}

export default function HeroSection({
  title,
  subtitle,
  description,
}: HeroSectionProps) {
  return (
    <div className="text-center mb-16">
      <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {title}
      </h1>
      <p className="text-xl text-gray-600 mb-2">{subtitle}</p>
      <p className="text-lg text-gray-500">{description}</p>
    </div>
  );
}
