import React from "react";
import {
  Check,
  MapPin,
  Trash2,
  Package,
  Shield,
  Calendar,
  CreditCard,
} from "lucide-react";
import type { BookingStep, ProgressStep } from "../types";

interface ProgressIndicatorProps {
  steps: ProgressStep[];
  currentStep: BookingStep;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  steps,
  currentStep,
}) => {
  const currentIndex = steps.findIndex((step) => step.id === currentStep);

  const getStepIcon = (stepId: BookingStep) => {
    const iconProps = { className: "w-4 h-4" };
    switch (stepId) {
      case "postcode":
        return <MapPin {...iconProps} />;
      case "waste-type":
        return <Trash2 {...iconProps} />;
      case "skip-selection":
        return <Package {...iconProps} />;
      case "permit":
        return <Shield {...iconProps} />;
      case "date":
        return <Calendar {...iconProps} />;
      case "payment":
        return <CreditCard {...iconProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {/* Mobile & Tablet Progress Bar */}
      <div className="block lg:hidden mb-4">
        <div className="flex items-center justify-between text-sm text-gray-300 mb-2">
          <span>Progress</span>
          <span>
            {currentIndex + 1} of {steps.length}
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((currentIndex + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Tablet Compact Step Indicator */}
      <div className="hidden sm:flex lg:hidden items-center justify-center mb-4">
        <div className="flex items-center space-x-2">
          {steps.map((step, index) => {
            const isActive = step.id === currentStep;
            const isCompleted = step.completed;
            const isPast = index < currentIndex;

            return (
              <div key={step.id} className="flex items-center">
                <div
                  className={`
                    flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300
                    ${
                      isCompleted || isPast
                        ? "bg-gradient-to-r from-cyan-500 to-blue-500 border-transparent text-white"
                        : isActive
                        ? "border-cyan-400 text-cyan-400 bg-gray-800 shadow-lg"
                        : "border-gray-600 text-gray-500 bg-gray-800"
                    }
                  `}
                >
                  {isCompleted || isPast ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <span className="text-xs font-medium">{index + 1}</span>
                  )}
                </div>
                {/* Connector for tablet */}
                {index < steps.length - 1 && (
                  <div className="w-4 h-0.5 mx-1">
                    <div
                      className={`
                        h-0.5 transition-all duration-300
                        ${
                          isPast || (isActive && index < currentIndex)
                            ? "bg-gradient-to-r from-cyan-500 to-blue-500"
                            : "bg-gray-600"
                        }
                      `}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop Step Indicator */}
      <div className="hidden lg:flex items-center justify-center">
        {steps.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.completed;
          const isPast = index < currentIndex;

          return (
            <div key={step.id} className="flex items-center">
              {/* Step Circle */}
              <div className="flex items-center">
                <div
                  className={`
                    flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300
                    ${
                      isCompleted || isPast
                        ? "bg-gradient-to-r from-cyan-500 to-blue-500 border-transparent text-white"
                        : isActive
                        ? "border-cyan-400 text-cyan-400 bg-gray-800 shadow-lg"
                        : "border-gray-600 text-gray-500 bg-gray-800"
                    }
                  `}
                >
                  {isCompleted || isPast ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>

                {/* Step Label */}
                <div className="ml-3">
                  <div
                    className={`
                      text-sm font-medium transition-colors duration-300 flex items-center gap-2
                      ${
                        isActive
                          ? "text-cyan-400"
                          : isCompleted || isPast
                          ? "text-gray-200"
                          : "text-gray-500"
                      }
                    `}
                  >
                    {getStepIcon(step.id)}
                    {step.label}
                  </div>
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="w-16 mx-4">
                  <div
                    className={`
                      h-0.5 transition-all duration-300
                      ${
                        isPast || (isActive && index < currentIndex)
                          ? "bg-gradient-to-r from-cyan-500 to-blue-500"
                          : "bg-gray-600"
                      }
                    `}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Current Step Name for Mobile & Tablet */}
      <div className="block lg:hidden mt-3">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2">
            {getStepIcon(steps[currentIndex]?.id)}
            <span className="text-lg font-semibold text-white">
              {steps[currentIndex]?.label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
