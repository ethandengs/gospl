import { cn } from "@/lib/utils";
import { designTokens } from "@/lib/design-tokens";
import { Logo } from "@/components/ui/logo";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
  backLink?: {
    href: string;
    label: string;
  };
}

export function AuthCard({ children, title, subtitle, className, backLink }: AuthCardProps) {
  return (
    <div className={cn("py-8", className)}>
      <div className="mb-4 flex flex-col items-center gap-2">
        <Logo className="h-12 w-auto" darkMode={false} />
        <h2 className="mt-6 text-center text-2xl font-semibold tracking-tight text-gray-900">
          {title}
        </h2>
        {subtitle && (
          <p className="text-center text-sm text-gray-600">
            {subtitle}
          </p>
        )}
      </div>
      {backLink && (
          <Link
            href={backLink.href}
            className="pl-2 pb-2 flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            {backLink.label}
          </Link>
        )}
      <div className={cn(
        "bg-white relative",
        designTokens.radius.card,
        designTokens.shadows.card,
        "border border-gray-200",
        designTokens.spacing.card
      )}>
        {children}
      </div>
    </div>
  );
} 