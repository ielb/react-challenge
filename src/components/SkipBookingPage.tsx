import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, AlertCircle, RotateCcw } from "lucide-react";
import { getSkipsByLocation } from "../services/skipService";
import { API_CONFIG } from "../api/constants";
import ProgressIndicator from "./ProgressIndicator";
import SkipSelectionStep from "./SkipSelectionStep";
import type { BookingStep, Skip } from "../types";

// Mock data as fallback
const mockSkips: Skip[] = [
  {
    id: "1",
    size: "4 Yard Skip",
    capacity: "4 cubic yards",
    price: 195,
    hirePeriod: 7,
    description: "Perfect for small home projects",
    dimensions: { length: 8, width: 4, height: 3 },
    suitableFor: [
      "Garden waste",
      "Small renovations",
      "General household waste",
    ],
    allowedOnRoad: false,
    allowsHeavyWaste: false,
    priceBeforeVat: 0,
    vat: 0,
  },
  {
    id: "2",
    size: "6 Yard Skip",
    capacity: "6 cubic yards",
    price: 245,
    hirePeriod: 7,
    description: "Great for medium-sized projects",
    dimensions: { length: 10, width: 4, height: 4 },
    suitableFor: ["Kitchen renovation", "Bathroom refits", "Garden clearance"],
    allowedOnRoad: false,
    allowsHeavyWaste: false,
    priceBeforeVat: 0,
    vat: 0,
  },
  {
    id: "3",
    size: "8 Yard Skip",
    capacity: "8 cubic yards",
    price: 325,
    hirePeriod: 7,
    description: "Ideal for larger home projects",
    dimensions: { length: 12, width: 4, height: 4 },
    suitableFor: [
      "Home renovations",
      "Construction waste",
      "Large garden projects",
      "House clearance",
    ],
    allowedOnRoad: false,
    allowsHeavyWaste: false,
    priceBeforeVat: 0,
    vat: 0,
  },
  {
    id: "4",
    size: "12 Yard Skip",
    capacity: "12 cubic yards",
    price: 395,
    hirePeriod: 7,
    description: "Perfect for big commercial projects",
    dimensions: { length: 14, width: 6, height: 4 },
    suitableFor: [
      "Construction projects",
      "Commercial waste",
      "Large house clearance",
    ],
    allowedOnRoad: false,
    allowsHeavyWaste: false,
    priceBeforeVat: 0,
    vat: 0,
  },
  {
    id: "5",
    size: "16 Yard Skip",
    capacity: "16 cubic yards",
    price: 485,
    hirePeriod: 7,
    description: "For the largest projects",
    dimensions: { length: 16, width: 6, height: 5 },
    suitableFor: [
      "Major construction",
      "Industrial waste",
      "Large commercial projects",
    ],
    allowedOnRoad: false,
    allowsHeavyWaste: false,
    priceBeforeVat: 0,
    vat: 0,
  },
  {
    id: "6",
    size: "20 Yard Skip",
    capacity: "20 cubic yards",
    price: 595,
    hirePeriod: 7,
    description: "Maximum capacity for industrial use",
    dimensions: { length: 18, width: 6, height: 6 },
    suitableFor: [
      "Industrial projects",
      "Major construction",
      "Large scale clearance",
    ],
    allowedOnRoad: false,
    allowsHeavyWaste: false,
    priceBeforeVat: 0,
    vat: 0,
  },
];

const SkipBookingPage: React.FC = () => {
  const [currentStep] = useState<BookingStep>("skip-selection");
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);
  const [skips, setSkips] = useState<Skip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkips = async () => {
      try {
        setLoading(true);
        setError(null);

        // Use the service to fetch data
        const apiSkips = await getSkipsByLocation(
          API_CONFIG.DEFAULT_POSTCODE,
          API_CONFIG.DEFAULT_AREA
        );

        if (apiSkips.length > 0) {
          setSkips(apiSkips);
          // Pre-select the 8 Yard Skip if available
          const eightYardSkip = apiSkips.find((skip: Skip) =>
            skip.size.includes("8 Yard")
          );
          if (eightYardSkip) {
            setSelectedSkip(eightYardSkip);
          }
        } else {
          // Fallback to mock data
          setSkips(mockSkips);
          const eightYardSkip = mockSkips.find(
            (skip) => skip.size === "8 Yard Skip"
          );
          if (eightYardSkip) {
            setSelectedSkip(eightYardSkip);
          }
        }
      } catch (err) {
        // Use mock data as fallback
        console.warn("API not available, using mock data:", err);
        setSkips(mockSkips);
        const eightYardSkip = mockSkips.find(
          (skip) => skip.size === "8 Yard Skip"
        );
        if (eightYardSkip) {
          setSelectedSkip(eightYardSkip);
        }
        setError(null); // Don't show error since we have fallback data
      } finally {
        setLoading(false);
      }
    };

    fetchSkips();
  }, []);

  const handleContinue = () => {
    if (!selectedSkip) return;

    // For this demo, we'll just show an alert
    // In a real app, this would navigate to the next step
    alert(
      `Continuing with ${selectedSkip.size} - £${selectedSkip.price} for ${selectedSkip.hirePeriod} days`
    );
  };

  const handleBack = () => {
    // In a real app, this would navigate to the previous step
    alert("Going back to previous step");
  };

  const steps: { id: BookingStep; label: string; completed: boolean }[] = [
    { id: "postcode", label: "Location", completed: true },
    { id: "waste-type", label: "Waste Type", completed: true },
    { id: "skip-selection", label: "Skip Selection", completed: false },
    { id: "permit", label: "Permit Check", completed: false },
    { id: "date", label: "Date Selection", completed: false },
    { id: "payment", label: "Payment", completed: false },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Header */}
      <header className="bg-black/80 backdrop-blur-md border-b border-gray-700/50 sticky top-0 z-50">
        <div className="w-full px-2 sm:px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Skip Booking
            </h1>
            <div className="text-sm text-gray-300 hidden sm:block">
              Step 3 of 6
            </div>
          </div>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="w-full px-2 sm:px-4 py-6">
        <ProgressIndicator steps={steps} currentStep={currentStep} />
      </div>

      {/* Main Content */}
      <main className="w-full px-2 sm:px-4 pb-24">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Choose Your Skip Size
          </h2>
          <p className="text-lg text-gray-300">
            Select the perfect skip size for your project. All prices include
            delivery, collection, and disposal costs.
          </p>
        </div>

        {error ? (
          <div className="bg-red-900/20 border border-red-800/50 rounded-xl p-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <div className="text-red-300 text-lg font-medium mb-2">
              Unable to load skip options
            </div>
            <p className="text-red-400">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 mx-auto"
            >
              <RotateCcw className="w-4 h-4" />
              Try Again
            </button>
          </div>
        ) : (
          <SkipSelectionStep
            skips={skips}
            selectedSkip={selectedSkip}
            onSelectSkip={setSelectedSkip}
            loading={loading}
          />
        )}
      </main>

      {/* Sticky Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-md border-t border-gray-700/50 shadow-lg z-40">
        <div className="w-full px-2 sm:px-4 py-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <button
              onClick={handleBack}
              className="w-full sm:w-auto px-8 py-3 border-2 border-gray-600 text-gray-300 rounded-xl hover:border-gray-500 hover:bg-gray-800 transition-all duration-200 font-medium flex items-center gap-2 justify-center"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <button
              onClick={handleContinue}
              disabled={!selectedSkip}
              className={`w-full sm:w-auto px-8 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 justify-center ${
                selectedSkip
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 shadow-lg hover:shadow-xl"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkipBookingPage;
