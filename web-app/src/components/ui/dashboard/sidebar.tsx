'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/components/ui/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { logoutAction } from '@/app/actions';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import {
  LayoutDashboard,
  Activity,
  Settings,
  History,
  LogOut,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import type { SidebarConfig } from '@/types/auth';
import { isAuthError } from '@/components/ui/utils/error-handler';

type SidebarProps = React.HTMLAttributes<HTMLDivElement> & SidebarConfig;

// TODO: Implement these features:
// - showLogo: Add company logo at the top of sidebar
// - variant: Support different sidebar styles (default/minimal)
// - collapsible: Add collapse/expand functionality
export function Sidebar({ 
  className,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  showLogo, // TODO: Implement logo display
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  variant, // TODO: Implement sidebar variants
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  collapsible, // TODO: Implement collapse functionality
  ...props 
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const routes = [
    {
      href: '/dashboard',
      label: 'Overview',
      icon: LayoutDashboard,
    },
    {
      href: '/dashboard/activity',
      label: 'Activity',
      icon: Activity,
    },
    {
      href: '/dashboard/history',
      label: 'History',
      icon: History,
    },
    {
      href: '/dashboard/settings',
      label: 'Settings',
      icon: Settings,
    },
  ];

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      setError(null);
      const result = await logoutAction();
      
      if (result.success) {
        toast.success('Successfully logged out');
        router.push(result.redirectTo || '/login');
      } else if (result.error) {
        setError(result.error.message);
        toast.error(result.error.message, {
          icon: <AlertCircle className="h-4 w-4" />,
          description: `Error code: ${result.error.code}`,
        });
      }
    } catch (error) {
      const errorMessage = isAuthError(error) 
        ? error.message 
        : 'An unexpected error occurred during logout';
      
      setError(errorMessage);
      toast.error(errorMessage, {
        icon: <AlertCircle className="h-4 w-4" />,
        description: 'Please try again or contact support if the issue persists',
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className={cn(
      "pb-12 min-h-screen",
      // TODO: Apply different styles based on variant
      // variant === 'minimal' && 'w-20',
      // variant === 'default' && 'w-64',
      className
    )} {...props}>
      <div className="space-y-4 py-4">
        {/* TODO: Implement logo section */}
        {/* {showLogo && (
          <div className="px-3 py-2">
            <Logo />
          </div>
        )} */}
        
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">
            Dashboard
          </h2>
          <div className="space-y-1">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={pathname === route.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-2",
                  pathname === route.href && "bg-muted"
                )}
                asChild
              >
                <Link href={route.href}>
                  <route.icon className="h-4 w-4" />
                  {route.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
        <Separator />
        <div className="px-3 py-2">
          <div className="space-y-1">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-2",
                error ? "text-red-600 bg-red-100" : "text-red-500 hover:text-red-600 hover:bg-red-100"
              )}
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? (
                <LoadingSpinner className="h-4 w-4" />
              ) : error ? (
                <AlertCircle className="h-4 w-4" />
              ) : (
                <LogOut className="h-4 w-4" />
              )}
              {isLoggingOut ? 'Logging out...' : error ? 'Retry Logout' : 'Logout'}
            </Button>
            {error && (
              <p className="text-xs text-red-600 px-2">
                {error}
              </p>
            )}
          </div>
        </div>

        {/* TODO: Implement collapse button */}
        {/* {collapsible && (
          <div className="px-3 py-2">
            <Button
              variant="ghost"
              className="w-full justify-center"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <ChevronRight /> : <ChevronLeft />}
            </Button>
          </div>
        )} */}
      </div>
    </div>
  );
} 