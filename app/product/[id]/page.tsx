'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getProduct } from '@/lib/api';
import { Product } from '@/types/product';
import ImageCarousel from '@/components/ImageCarousel';
import ProductDetailSkeleton from '@/components/skeletons/ProductDetailSkeleton';

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <ProductDetailSkeleton />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md mx-4">
          <div className="text-red-500 text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-6">{error || 'Product not found'}</p>
          <div className="space-y-3">
            <button
              onClick={() => window.history.back()}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 cursor-pointer"
            >
              Go Back
            </button>
            <button
              onClick={() => (window.location.href = '/')}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 cursor-pointer"
            >
              Browse Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors font-medium group cursor-pointer"
          >
            <svg
              className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
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
            Back to Products
          </Link>
        </div>

        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link
            href="/"
            className="hover:text-blue-600 transition-colors font-medium cursor-pointer"
          >
            Home
          </Link>
          <span>›</span>
          <span className="text-gray-800 capitalize font-medium">
            {product.category}
          </span>
          <span>›</span>
          <span className="text-gray-900 font-medium truncate">
            {product.title}
          </span>
        </nav>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image Gallery */}
            <div className="p-8 bg-gray-50 flex flex-col">
              <ImageCarousel images={product.images} title={product.title} />

              {/* Additional Product Details Below Images */}
              <div className="mt-8 space-y-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Product Highlights
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                      Brand: {product.brand}
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                      SKU: {product.sku}
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                      Availability: {product.availabilityStatus}
                    </li>
                  </ul>
                </div>

                {product.meta?.qrCode && (
                  <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                    <h4 className="font-medium text-gray-900 mb-2">QR Code</h4>
                    <Image
                      src={product.meta.qrCode}
                      alt="Product QR Code"
                      width={80}
                      height={80}
                      className="mx-auto"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Scan for quick access
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="p-8 lg:p-12">
              <div className="space-y-6">
                {/* Category Badge */}
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 capitalize">
                  {product.category.replace('-', ' ')}
                </div>

                {/* Title */}
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  {product.title}
                </h1>

                {/* Rating */}
                <div className="flex items-center space-x-3">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400 text-lg">★</span>
                    <span className="text-lg font-semibold text-gray-800">
                      {product.rating.toFixed(1)}
                    </span>
                    <span className="text-gray-600">
                      ({product.reviews.length} reviews)
                    </span>
                  </div>
                  <span className="text-gray-400">|</span>
                  <span className="text-sm text-gray-700">
                    Brand: {product.brand}
                  </span>
                </div>

                {/* Price */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    {product.discountPercentage > 0 ? (
                      <>
                        <span className="text-4xl font-bold text-green-600">
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
                      <span className="text-4xl font-bold text-gray-900">
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

                {/* Description */}
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Availability */}
                <div className="flex items-center gap-4">
                  <div
                    className={`px-3 py-2 rounded-full text-sm font-medium ${
                      product.stock > 10
                        ? 'bg-green-100 text-green-800'
                        : product.stock > 0
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {product.availabilityStatus}
                  </div>
                  <span className="text-gray-700">
                    {product.stock > 0
                      ? `${product.stock} units available`
                      : 'Out of stock'}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4 pt-6">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer">
                    Add to Cart
                  </button>
                  <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-4 px-8 rounded-xl transition-colors duration-200 cursor-pointer">
                    Add to Wishlist
                  </button>
                </div>

                {/* Product Features */}
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl mb-2">🚚</div>
                    <div className="text-sm font-medium text-gray-700">
                      Free Shipping
                    </div>
                    <div className="text-xs text-gray-500">
                      On orders over $50
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl mb-2">↩️</div>
                    <div className="text-sm font-medium text-gray-700">
                      Easy Returns
                    </div>
                    <div className="text-xs text-gray-500">
                      30-day return policy
                    </div>
                  </div>
                </div>

                {/* Product Information */}
                <div className="space-y-4 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Product Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-800">Weight:</span>
                      <span className="ml-2 text-gray-700">
                        {product.weight} kg
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-800">
                        Dimensions:
                      </span>
                      <span className="ml-2 text-gray-700">
                        {product.dimensions.width} × {product.dimensions.height}{' '}
                        × {product.dimensions.depth} cm
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-800">
                        Warranty:
                      </span>
                      <span className="ml-2 text-gray-700">
                        {product.warrantyInformation}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-800">
                        Shipping:
                      </span>
                      <span className="ml-2 text-gray-700">
                        {product.shippingInformation}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-800">
                        Return Policy:
                      </span>
                      <span className="ml-2 text-gray-700">
                        {product.returnPolicy}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-800">
                        Min. Order:
                      </span>
                      <span className="ml-2 text-gray-700">
                        {product.minimumOrderQuantity} units
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                {product.tags.length > 0 && (
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-gray-200 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        {product.reviews.length > 0 && (
          <div className="mt-16 bg-white rounded-2xl shadow-xl p-8 lg:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Customer Reviews
            </h2>

            {/* Review Summary */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-4xl font-bold text-gray-900">
                    {product.rating.toFixed(1)}
                  </div>
                  <div className="flex items-center mt-1">
                    <span className="text-yellow-400 text-lg">★</span>
                  </div>
                  <div className="text-gray-700 mt-1">
                    Based on {product.reviews.length} reviews
                  </div>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 cursor-pointer">
                  Write a Review
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.reviews.map((review, index) => (
                <div
                  key={index}
                  className="border border-gray-200 p-6 rounded-xl"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {review.reviewerName.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">
                          {review.reviewerName}
                        </h4>
                        <span className="text-sm text-gray-600">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-sm ${
                              i < review.rating
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
