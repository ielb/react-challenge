export type BookingStep =
  | "postcode"
  | "waste-type"
  | "skip-selection"
  | "permit"
  | "date"
  | "payment";

// API Response interface (matches actual API)
export interface SkipApiData {
  id: number;
  size: number;
  hire_period_days: number;
  transport_cost: number | null;
  per_tonne_cost: number | null;
  price_before_vat: number;
  vat: number;
  postcode: string;
  area: string;
  forbidden: boolean;
  created_at: string;
  updated_at: string;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
}

// UI-friendly interface (for components)
export interface Skip {
  id: string;
  size: string;
  capacity: string;
  price: number;
  hirePeriod: number;
  description?: string;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  suitableFor?: string[];
  // Additional fields from API
  allowedOnRoad: boolean;
  allowsHeavyWaste: boolean;
  priceBeforeVat: number;
  vat: number;
}

export interface ProgressStep {
  id: BookingStep;
  label: string;
  completed: boolean;
}
