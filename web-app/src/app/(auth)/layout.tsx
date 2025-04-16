'use client';

import { designTokens } from '@/lib/design-tokens';
import { cn } from '@/lib/utils';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className={cn(
        "flex-1",
        "bg-gradient-to-b from-gray-50 to-gray-100",
        designTokens.spacing.container
      )}>
        {/* <Link
            href="/"
            className="pl-2 pb-4 flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Back to home
        </Link> */}
        <div className="w-full py-12 max-w-md mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
} 