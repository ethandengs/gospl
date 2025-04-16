import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { Sidebar } from "@/components/ui/dashboard/sidebar";

// TODO: Import data fetching utilities and types
// import { fetchUserStats, fetchRecentActivity } from '@/lib/api';
// import type { DashboardData, UserStats, Activity } from '@/types';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  // TODO: Implement dashboard data fetching:
  // - Fetch user's gait health statistics
  // - Load recent activity history
  // - Get user preferences and settings
  // - Setup real-time data monitoring
  // const dashboardData = await fetchDashboardData(session.user.id);

  return (
    <div className="flex min-h-screen">
      <Sidebar className="w-64 border-r" />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto py-6 px-4">
          {children}
        </div>
      </main>
    </div>
  );
} 