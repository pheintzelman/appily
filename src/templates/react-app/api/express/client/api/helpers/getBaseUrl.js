import { Environment, LocalBaseUrl, ProductionBaseUrl } from "./constants";

export function getBaseUrl() {
  if (process.env.NODE_ENV === Environment.Development) {
    return LocalBaseUrl;
  }

  return ProductionBaseUrl;
}
