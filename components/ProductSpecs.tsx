interface ProductSpecsProps {
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  returnPolicy: string;
}

export default function ProductSpecs({
  weight,
  dimensions,
  warrantyInformation,
  shippingInformation,
  returnPolicy,
}: ProductSpecsProps) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Specifications
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <span className="font-medium text-gray-700">Weight:</span>
          <span className="text-gray-600 ml-2">{weight} kg</span>
        </div>
        <div>
          <span className="font-medium text-gray-700">Dimensions:</span>
          <span className="text-gray-600 ml-2">
            {dimensions.width} × {dimensions.height} × {dimensions.depth} cm
          </span>
        </div>
        <div className="md:col-span-2">
          <span className="font-medium text-gray-700">Warranty:</span>
          <span className="text-gray-600 ml-2">{warrantyInformation}</span>
        </div>
        <div className="md:col-span-2">
          <span className="font-medium text-gray-700">Shipping:</span>
          <span className="text-gray-600 ml-2">{shippingInformation}</span>
        </div>
        <div className="md:col-span-2">
          <span className="font-medium text-gray-700">Returns:</span>
          <span className="text-gray-600 ml-2">{returnPolicy}</span>
        </div>
      </div>
    </div>
  );
}
