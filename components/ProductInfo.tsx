import ProductPrice from '@/components/ProductPrice';
import ProductRating from '@/components/ProductRating';
import ProductSpecs from '@/components/ProductSpecs';
import ProductActions from '@/components/ProductActions';

interface Review {
  reviewerName: string;
  rating: number;
  comment: string;
  date: string;
}

interface ProductInfoProps {
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  availabilityStatus: string;
  category: string;
  brand: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  returnPolicy: string;
  tags: string[];
  reviews?: Review[];
}

export default function ProductInfo({
  title,
  description,
  price,
  discountPercentage,
  rating,
  stock,
  availabilityStatus,
  category,
  brand,
  weight,
  dimensions,
  warrantyInformation,
  shippingInformation,
  returnPolicy,
  tags,
  reviews = [],
}: ProductInfoProps) {
  return (
    <div className="p-8 lg:p-12">
      <div className="space-y-6">
        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 capitalize">
          {category.replace('-', ' ')}
        </div>

        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
          {title}
        </h1>

        <ProductRating
          rating={rating}
          reviewCount={reviews.length}
          brand={brand}
        />

        <ProductPrice price={price} discountPercentage={discountPercentage} />

        <ProductActions
          stock={stock}
          availabilityStatus={availabilityStatus}
          price={price}
          discountPercentage={discountPercentage}
        />

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Description
          </h3>
          <p className="text-gray-700 leading-relaxed">{description}</p>
        </div>

        <ProductSpecs
          weight={weight}
          dimensions={dimensions}
          warrantyInformation={warrantyInformation}
          shippingInformation={shippingInformation}
          returnPolicy={returnPolicy}
        />

        {tags.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
