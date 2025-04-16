import { Icons } from "@/components/ui/icons";

export default function AuthLoading() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <Icons.spinner className="h-8 w-8 animate-spin text-[#1F9FC0]" />
    </div>
  );
} 