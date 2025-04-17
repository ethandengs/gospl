import { cn } from "@/components/ui/utils";

export function LoadingSpinner({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-spin", className)}
      {...props}
    >
      <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
    </div>
  );
} 