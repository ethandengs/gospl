'use client';

import { buildLogger } from "@/lib/utils/build-logger";

buildLogger.info('Initializing error page');

export default function ErrorPage() {
  buildLogger.info('Rendering error page');
  return null;
} 