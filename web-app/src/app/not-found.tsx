import { buildLogger } from "@/lib/utils/build-logger";

buildLogger.info('Initializing not-found page');

export default function NotFound() {
  buildLogger.info('Rendering not-found page');
  return null;
} 