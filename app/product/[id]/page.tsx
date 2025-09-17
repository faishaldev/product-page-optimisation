'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getProduct } from '@/lib/api';
import { Product } from '@/types/product';
import ImageCarousel from '@/components/ImageCarousel';

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        setError(null);
        const productId = parseInt(params.id as string);
        
        if (isNaN(productId)) {
          setError('Invalid product ID');
          return;
        }

        const productData = await getProduct(productId);
        setProduct(productData);
      } catch (err) {
        setError('Failed to load product. Please try again later.');
        console.error('Error loading product:', err);
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      loadProduct();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="text-gray-600">Loading product...</span>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-md p-6 max-w-md">
            <h2 className="text-lg font-semibold text-red-800 mb-2">Error</h2>
            <p className="text-red-700 mb-4">{error || 'Product not found'}</p>
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              ← Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const discountedPrice = product.price * (1 - product.discountPercentage / 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Products
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Carousel */}
          <div>
            <ImageCarousel images={product.images} title={product.title} />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Title and Category */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded-full capitalize">
                  {product.category.replace('-', ' ')}
                </span>
                <span className="text-sm text-gray-500">SKU: {product.sku}</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
              <p className="text-gray-600 text-lg">{product.description}</p>
            </div>

            {/* Rating and Reviews */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <span className="text-yellow-400 text-lg">★</span>
                <span className="font-semibold">{product.rating.toFixed(1)}</span>
                <span className="text-gray-500">({product.reviews.length} reviews)</span>
              </div>
              <span className="text-gray-400">|</span>
              <span className="text-sm text-gray-600">Brand: {product.brand}</span>
            </div>

            {/* Price */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                {product.discountPercentage > 0 ? (
                  <>
                    <span className="text-3xl font-bold text-green-600">
                      ${discountedPrice.toFixed(2)}
                    </span>
                    <span className="text-xl text-gray-500 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                      -{product.discountPercentage.toFixed(0)}% OFF
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
              {product.discountPercentage > 0 && (
                <p className="text-sm text-green-600">
                  You save ${(product.price - discountedPrice).toFixed(2)}
                </p>
              )}
            </div>

            {/* Availability */}
            <div className="flex items-center gap-4">
              <div className={`px-3 py-2 rounded-full text-sm font-medium ${
                product.stock > 10 
                  ? 'bg-green-100 text-green-800' 
                  : product.stock > 0 
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {product.availabilityStatus}
              </div>
              <span className="text-gray-600">
                {product.stock > 0 ? `${product.stock} units available` : 'Out of stock'}
              </span>
            </div>

            {/* Product Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Product Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Weight:</span>
                  <span className="ml-2 text-gray-600">{product.weight} kg</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Dimensions:</span>
                  <span className="ml-2 text-gray-600">
                    {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} cm
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Warranty:</span>
                  <span className="ml-2 text-gray-600">{product.warrantyInformation}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Shipping:</span>
                  <span className="ml-2 text-gray-600">{product.shippingInformation}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Return Policy:</span>
                  <span className="ml-2 text-gray-600">{product.returnPolicy}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Min. Order:</span>
                  <span className="ml-2 text-gray-600">{product.minimumOrderQuantity} units</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            {product.tags.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        {product.reviews.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.reviews.map((review, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${
                            i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-3">{review.comment}</p>
                  <p className="text-sm font-medium text-gray-900">{review.reviewerName}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}