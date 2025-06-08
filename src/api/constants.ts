// API Configuration Constants
export const API_CONFIG = {
  BASE_URL: "https://app.wewantwaste.co.uk/api",
  TIMEOUT: 10000,
  DEFAULT_POSTCODE: "NR32",
  DEFAULT_AREA: "Lowestoft",
} as const;

// API Endpoints
export const ENDPOINTS = {
  SKIPS_BY_LOCATION: "/skips/by-location",
  SKIP_DETAILS: "/skips",
  CHECK_AVAILABILITY: "/skips",
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your internet connection.",
  SERVER_ERROR: "Server error. Please try again later.",
  TIMEOUT_ERROR: "Request timeout. Please try again.",
  INVALID_RESPONSE: "Invalid response from server.",
  NO_SKIPS_FOUND: "No skips found for this location.",
} as const;
