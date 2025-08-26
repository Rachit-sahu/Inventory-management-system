import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/layout/sidebar";
import TopBar from "@/components/layout/topbar";
import MetricsGrid from "@/components/dashboard/metrics-grid";
import InventoryTable from "@/components/dashboard/inventory-table";
import RecentOrders from "@/components/dashboard/recent-orders";
import StockAlerts from "@/components/dashboard/stock-alerts";
import QuickActions from "@/components/dashboard/quick-actions";
import AnalyticsSection from "@/components/dashboard/analytics-section";
import ReplenishmentPanel from "@/components/dashboard/replenishment-panel";

export default function Dashboard() {
  const { data: metrics, isLoading: metricsLoading } = useQuery({
    queryKey: ["/api/dashboard/metrics"],
  });

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar title="Dashboard" />
        
        <main className="flex-1 p-6 overflow-auto">
          <MetricsGrid metrics={metrics} isLoading={metricsLoading} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2">
              <InventoryTable />
            </div>
            
            <div className="space-y-6">
              <RecentOrders />
              <StockAlerts />
              <QuickActions />
            </div>
          </div>
          
          <AnalyticsSection />
          <ReplenishmentPanel />
        </main>
      </div>
    </div>
  );
}
