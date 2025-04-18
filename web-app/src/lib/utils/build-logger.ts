const BUILD_DEBUG = process.env.NODE_ENV === 'production';

type LogArgs = (string | number | boolean | null | undefined | object)[];
type ErrorType = Error & {
  code?: string;
  cause?: unknown;
  info?: unknown;
};

export const buildLogger = {
  info: (message: string, ...args: LogArgs) => {
    if (BUILD_DEBUG) {
      console.log(`[BUILD-INFO] ${message}`, ...args);
    }
  },
  warn: (message: string, ...args: LogArgs) => {
    if (BUILD_DEBUG) {
      console.warn(`[BUILD-WARN] ${message}`, ...args);
    }
  },
  error: (message: string, error?: ErrorType) => {
    if (BUILD_DEBUG) {
      console.error(`[BUILD-ERROR] ${message}`);
      if (error) {
        const errorDetails: Record<string, unknown> = {
          message: error.message,
          stack: error.stack,
          name: error.name,
          code: error.code,
        };
        if (error.cause) errorDetails.cause = error.cause;
        if (error.info) errorDetails.info = error.info;
        console.error('[BUILD-ERROR-DETAILS]', errorDetails);
      }
    }
  },
  debug: (message: string, context?: Record<string, unknown>) => {
    if (BUILD_DEBUG) {
      console.log(`[BUILD-DEBUG] ${message}`);
      if (context) {
        console.log('[BUILD-CONTEXT]', JSON.stringify(context, null, 2));
      }
    }
  }
}; 