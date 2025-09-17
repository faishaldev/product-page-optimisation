import Image from 'next/image';

interface ProductHighlightsProps {
  brand: string;
  sku: string;
  availabilityStatus: string;
  qrCode?: string;
}

export default function ProductHighlights({
  brand,
  sku,
  availabilityStatus,
  qrCode,
}: ProductHighlightsProps) {
  return (
    <div className="mt-8 space-y-4">
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-2">Product Highlights</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
            Brand: {brand}
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
            SKU: {sku}
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
            Availability: {availabilityStatus}
          </li>
        </ul>
      </div>

      {qrCode && (
        <div className="bg-white rounded-lg p-4 shadow-sm text-center">
          <h4 className="font-medium text-gray-900 mb-2">QR Code</h4>
          <Image
            src={qrCode}
            alt="Product QR Code"
            width={80}
            height={80}
            className="mx-auto"
          />
          <p className="text-xs text-gray-600 mt-2">Scan for quick access</p>
        </div>
      )}
    </div>
  );
}
