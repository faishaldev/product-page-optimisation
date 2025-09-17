import { getProduct } from '@/lib/api';
import { notFound } from 'next/navigation';
import ImageCarousel from '@/components/ImageCarousel';
import ProductNavigation from '@/components/ProductNavigation';
import ProductHighlights from '@/components/ProductHighlights';
import ProductInfo from '@/components/ProductInfo';
import ReviewsSection from '@/components/ReviewsSection';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  try {
    const product = await getProduct(parseInt(id));

    if (!product) {
      notFound();
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <ProductNavigation
            category={product.category}
            title={product.title}
          />

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="p-8 bg-gray-50 flex flex-col">
                <ImageCarousel images={product.images} title={product.title} />
                <ProductHighlights
                  brand={product.brand}
                  sku={product.sku}
                  availabilityStatus={product.availabilityStatus}
                  qrCode={product.meta?.qrCode}
                />
              </div>

              <ProductInfo
                title={product.title}
                description={product.description}
                price={product.price}
                discountPercentage={product.discountPercentage}
                rating={product.rating}
                stock={product.stock}
                availabilityStatus={product.availabilityStatus}
                category={product.category}
                brand={product.brand}
                weight={product.weight}
                dimensions={product.dimensions}
                warrantyInformation={product.warrantyInformation}
                shippingInformation={product.shippingInformation}
                returnPolicy={product.returnPolicy}
                tags={product.tags}
                reviews={product.reviews}
              />
            </div>
          </div>

          <ReviewsSection reviews={product.reviews} rating={product.rating} />
        </div>
      </div>
    );
  } catch {
    notFound();
  }
}
