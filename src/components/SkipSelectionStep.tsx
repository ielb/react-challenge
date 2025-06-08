import React from "react";
import { Trash2, CheckCircle, Package } from "lucide-react";
import type { Skip } from "../types";

interface SkipSelectionStepProps {
  skips: Skip[];
  selectedSkip: Skip | null;
  onSelectSkip: (skip: Skip) => void;
  loading: boolean;
}

const SkipSelectionStep: React.FC<SkipSelectionStepProps> = ({
  skips,
  selectedSkip,
  onSelectSkip,
  loading,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="relative bg-gray-800 rounded-2xl border-2 border-gray-700 p-6">
              {/* Skip Icon Skeleton */}
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-700"></div>
              </div>

              {/* Skip Size Skeleton */}
              <div className="h-6 bg-gray-700 rounded w-3/4 mx-auto mb-2"></div>

              {/* Capacity Skeleton */}
              <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto mb-4"></div>

              {/* Price Skeleton */}
              <div className="text-center mb-6">
                <div className="h-8 bg-gray-700 rounded w-1/3 mx-auto mb-1"></div>
                <div className="h-3 bg-gray-700 rounded w-1/4 mx-auto"></div>
              </div>

              {/* Features Skeleton */}
              <div className="mb-6">
                <div className="h-4 bg-gray-700 rounded w-1/3 mb-2"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-700 rounded w-full"></div>
                  <div className="h-3 bg-gray-700 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-700 rounded w-5/6"></div>
                </div>
              </div>

              {/* Dimensions Skeleton */}
              <div className="mb-6">
                <div className="h-4 bg-gray-700 rounded w-1/4 mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-2/3"></div>
              </div>

              {/* Button Skeleton */}
              <div className="h-12 bg-gray-700 rounded-xl w-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (skips.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="w-16 h-16 text-gray-500 mx-auto mb-4" />
        <h3 className="text-xl font-medium text-white mb-2">
          No skips available
        </h3>
        <p className="text-gray-300">
          Please try a different location or contact support.
        </p>
      </div>
    );
  }

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    skip: Skip
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelectSkip(skip);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
      {skips.map((skip) => {
        const isSelected = selectedSkip?.id === skip.id;

        return (
          <div
            key={skip.id}
            tabIndex={0}
            role="button"
            aria-label={`Select ${skip.size} skip for £${skip.price}`}
            aria-pressed={isSelected}
            onClick={() => onSelectSkip(skip)}
            onKeyDown={(e) => handleKeyDown(e, skip)}
            className={`
              relative bg-gray-800 rounded-2xl border-2 p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-0
              ${
                isSelected
                  ? "border-cyan-400 shadow-lg ring-4 ring-cyan-400/20"
                  : "border-gray-700 hover:border-gray-600"
              }
            `}
          >
            {/* Selected Badge */}
            {isSelected && (
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full p-2 shadow-lg">
                <CheckCircle className="w-4 h-4" />
              </div>
            )}

            {/* Skip Icon */}
            <div className="text-center mb-4">
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${
                  isSelected
                    ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400"
                    : "bg-gray-700 text-gray-400"
                }`}
              >
                <Trash2 className="w-8 h-8" />
              </div>
            </div>

            {/* Skip Size */}
            <h3 className="text-xl font-bold text-white text-center mb-2">
              {skip.size}
            </h3>

            {/* Capacity */}
            <p className="text-gray-300 text-center mb-4">{skip.capacity}</p>

            {/* Price */}
            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-white mb-1">
                £{skip.price}
              </div>
              <div className="text-sm text-gray-400">
                {skip.hirePeriod} day hire
              </div>
            </div>

            {/* Features */}
            {skip.suitableFor && skip.suitableFor.length > 0 && (
              <div className="mb-6">
                <div className="text-sm font-medium text-gray-200 mb-2">
                  Suitable for:
                </div>
                <div className="space-y-1">
                  {skip.suitableFor.slice(0, 3).map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center text-sm text-gray-300"
                    >
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2"></div>
                      {item}
                    </div>
                  ))}
                  {skip.suitableFor.length > 3 && (
                    <div className="text-sm text-gray-400">
                      +{skip.suitableFor.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Dimensions */}
            {skip.dimensions && (
              <div className="mb-6">
                <div className="text-sm font-medium text-gray-200 mb-2">
                  Dimensions:
                </div>
                <div className="text-sm text-gray-300">
                  {skip.dimensions.length}L × {skip.dimensions.width}W ×{" "}
                  {skip.dimensions.height}H ft
                </div>
              </div>
            )}

            {/* Additional Features */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {skip.allowedOnRoad && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-900/30 text-green-400 border border-green-700">
                    Road Placement OK
                  </span>
                )}
                {skip.allowsHeavyWaste && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-900/30 text-blue-400 border border-blue-700">
                    Heavy Waste OK
                  </span>
                )}
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-700 text-gray-300 border border-gray-600">
                  VAT {skip.vat}%
                </span>
              </div>
            </div>

            {/* Select Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectSkip(skip);
              }}
              className={`
                w-full py-3 px-4 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-0
                ${
                  isSelected
                    ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }
              `}
            >
              {isSelected ? "Selected" : "Select This Skip"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default SkipSelectionStep;
