const DEVELOPMENT = "development";

/**
 * Returns true if the NODE_ENV of the application is development
 */
export function isProcessDevelopment(): boolean {
  const env = (process.env["NODE_ENV"] || DEVELOPMENT).toLowerCase();
  return env === DEVELOPMENT;
}
