import { buildLogger } from "@/lib/utils/build-logger";

buildLogger.info('Initializing not-found page');

export default function NotFound() {
  try {
    buildLogger.info('Starting not-found page render');
    
    const content = (
      <div className="flex min-h-screen flex-col items-center justify-center p-24">
        <h2 className="mb-4 text-2xl font-bold">404 - Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400">The page you&apos;re looking for doesn&apos;t exist.</p>
      </div>
    );
    
    buildLogger.info('Created not-found page content structure');
    buildLogger.debug('Not-found page content structure created');
    
    return content;
  } catch (error) {
    buildLogger.error('Error in not-found page render', error instanceof Error ? error : new Error('Unknown error'));
    throw error;
  }
} 