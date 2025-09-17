'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  return (
    <Link href={`/product/${product.id}`} className="group h-full">
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 h-full flex flex-col">
        <div className="relative aspect-square">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
          {product.discountPercentage > 0 && (
            <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
              -{product.discountPercentage.toFixed(0)}%
            </div>
          )}
        </div>

        <div className="p-5 flex-1 flex flex-col">
          <h3 className="font-semibold text-lg mb-3 line-clamp-2 text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
            {product.title}
          </h3>

          <p className="text-gray-700 text-sm mb-4 line-clamp-2 leading-relaxed flex-1">
            {product.description}
          </p>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {product.discountPercentage > 0 ? (
                <>
                  <span className="text-xl font-bold text-green-600">
                    ${discountedPrice.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
              <span className="text-yellow-500">★</span>
              <span className="text-sm text-gray-700 font-medium">
                {product.rating.toFixed(1)}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm pt-3 border-t border-gray-100">
            <span className="text-gray-600 capitalize font-medium">
              {product.category.replace('-', ' ')}
            </span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                product.stock > 10
                  ? 'bg-green-100 text-green-800'
                  : product.stock > 0
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
