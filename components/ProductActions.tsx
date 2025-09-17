'use client';

import Button from '@/components/Button';

interface ProductActionsProps {
  stock: number;
  availabilityStatus: string;
  price: number;
  discountPercentage: number;
}

export default function ProductActions({
  stock,
  availabilityStatus,
  price,
  discountPercentage,
}: ProductActionsProps) {
  const discountedPrice = price * (1 - discountPercentage / 100);
  const finalPrice = discountPercentage > 0 ? discountedPrice : price;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">
          Stock: {stock} units
        </span>
        <span
          className={`text-sm font-medium px-2 py-1 rounded ${
            availabilityStatus === 'In Stock'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {availabilityStatus}
        </span>
      </div>

      <div className="flex gap-3">
        <Button
          variant="primary"
          size="lg"
          className="flex-1"
          disabled={availabilityStatus !== 'In Stock'}
        >
          Add to Cart - ${finalPrice.toFixed(2)}
        </Button>
        <Button
          variant="secondary"
          size="lg"
          disabled={availabilityStatus !== 'In Stock'}
        >
          Buy Now
        </Button>
      </div>

      <div className="text-xs text-gray-500 space-y-1">
        <p>✓ Free shipping on orders over $50</p>
        <p>✓ 30-day return policy</p>
        <p>✓ Secure payment processing</p>
      </div>
    </div>
  );
}
