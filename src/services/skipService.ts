import apiClient from "../api/client";
import { ENDPOINTS } from "../api/constants";
import type { Skip, SkipApiData } from "../types";

// API Response interface (array of SkipApiData)
type SkipApiResponse = SkipApiData[];

// Helper function to transform API data to UI-friendly format
const transformSkipData = (apiSkip: SkipApiData): Skip => {
  // Calculate total price including VAT
  const totalPrice = Math.round(
    apiSkip.price_before_vat * (1 + apiSkip.vat / 100)
  );

  // Generate capacity description based on size
  const capacity = `${apiSkip.size} cubic yards`;

  // Generate size string
  const sizeString = `${apiSkip.size} Yard Skip`;

  // Generate description based on skip features
  const features = [];
  if (apiSkip.allowed_on_road) features.push("road placement allowed");
  if (apiSkip.allows_heavy_waste) features.push("heavy waste accepted");
  const description =
    features.length > 0
      ? `Perfect for projects where ${features.join(" and ")}`
      : undefined;

  // Generate suitable for list based on size
  const getSuitableFor = (size: number): string[] => {
    if (size <= 4)
      return ["Garden waste", "Small renovations", "General household waste"];
    if (size <= 6)
      return [
        "Kitchen renovation",
        "Bathroom refits",
        "Garden clearance",
        "Small building projects",
      ];
    if (size <= 8)
      return [
        "Home renovations",
        "Construction waste",
        "Large garden projects",
        "House clearance",
      ];
    if (size <= 12)
      return [
        "Construction projects",
        "Commercial waste",
        "Large house clearance",
        "Building work",
      ];
    return [
      "Major construction",
      "Industrial waste",
      "Large commercial projects",
      "Heavy building work",
    ];
  };

  // Generate realistic dimensions based on size
  const getDimensions = (size: number) => {
    const dimensionMap: Record<
      number,
      { length: number; width: number; height: number }
    > = {
      4: { length: 8, width: 4, height: 3 },
      6: { length: 10, width: 4, height: 4 },
      8: { length: 12, width: 4, height: 4 },
      12: { length: 14, width: 6, height: 4 },
      16: { length: 16, width: 6, height: 5 },
      20: { length: 18, width: 6, height: 6 },
    };
    return dimensionMap[size] || { length: 10, width: 5, height: 4 };
  };

  return {
    id: apiSkip.id.toString(),
    size: sizeString,
    capacity,
    price: totalPrice,
    hirePeriod: apiSkip.hire_period_days,
    description,
    dimensions: getDimensions(apiSkip.size),
    suitableFor: getSuitableFor(apiSkip.size),
    allowedOnRoad: apiSkip.allowed_on_road,
    allowsHeavyWaste: apiSkip.allows_heavy_waste,
    priceBeforeVat: apiSkip.price_before_vat,
    vat: apiSkip.vat,
  };
};

// Service class for skip-related API calls
export class SkipService {
  /**
   * Fetch skips by location (postcode and area)
   * @param postcode - The postcode to search for
   * @param area - The area to search for
   * @returns Promise<Skip[]> - Array of available skips
   */
  static async getSkipsByLocation(
    postcode: string,
    area: string
  ): Promise<Skip[]> {
    try {
      const response = await apiClient.get<SkipApiResponse>(
        ENDPOINTS.SKIPS_BY_LOCATION,
        {
          params: {
            postcode,
            area,
          },
        }
      );

      // Validate response data
      if (!response.data || !Array.isArray(response.data)) {
        throw new Error("Invalid response format from API");
      }

      // Transform API data to UI-friendly format
      return response.data.map(transformSkipData);
    } catch (error) {
      console.error("Error fetching skips by location:", error);

      // Rethrow with more context
      if (error instanceof Error) {
        throw new Error(`Failed to fetch skips: ${error.message}`);
      }

      throw new Error("Failed to fetch skips: Unknown error");
    }
  }

  /**
   * Get skip details by ID
   * @param skipId - The ID of the skip
   * @returns Promise<Skip> - Skip details
   */
  static async getSkipById(skipId: string): Promise<Skip> {
    try {
      const response = await apiClient.get<Skip>(`/skips/${skipId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching skip by ID:", error);
      throw new Error(`Failed to fetch skip with ID ${skipId}`);
    }
  }

  /**
   * Check availability for a specific skip
   * @param skipId - The ID of the skip
   * @param date - The requested date
   * @returns Promise<boolean> - Availability status
   */
  static async checkSkipAvailability(
    skipId: string,
    date: string
  ): Promise<boolean> {
    try {
      const response = await apiClient.get<{ available: boolean }>(
        `/skips/${skipId}/availability`,
        {
          params: { date },
        }
      );
      return response.data.available;
    } catch (error) {
      console.error("Error checking skip availability:", error);
      throw new Error(`Failed to check availability for skip ${skipId}`);
    }
  }
}

// Export individual functions for easier import
export const { getSkipsByLocation, getSkipById, checkSkipAvailability } =
  SkipService;
