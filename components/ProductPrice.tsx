interface ProductPriceProps {
  price: number;
  discountPercentage: number;
}

export default function ProductPrice({
  price,
  discountPercentage,
}: ProductPriceProps) {
  const discountedPrice = price * (1 - discountPercentage / 100);

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center gap-3 mb-2">
        {discountPercentage > 0 ? (
          <>
            <span className="text-4xl font-bold text-green-600">
              ${discountedPrice.toFixed(2)}
            </span>
            <span className="text-xl text-gray-500 line-through">
              ${price.toFixed(2)}
            </span>
            <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
              -{discountPercentage.toFixed(0)}% OFF
            </span>
          </>
        ) : (
          <span className="text-4xl font-bold text-gray-900">
            ${price.toFixed(2)}
          </span>
        )}
      </div>
    </div>
  );
}
