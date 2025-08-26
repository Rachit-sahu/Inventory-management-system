import { Package, AlertTriangle, ShoppingCart, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface MetricsGridProps {
  metrics?: {
    totalProducts: number;
    lowStockItems: number;
    pendingOrders: number;
    totalOrderValue: number;
  };
  isLoading: boolean;
}

export default function MetricsGrid({ metrics, isLoading }: MetricsGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="shadow-material">
            <CardContent className="p-6">
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const metricCards = [
    {
      title: "Total Products",
      value: metrics?.totalProducts?.toLocaleString() || "0",
      icon: Package,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
      change: "+12.5%",
      changeType: "increase",
      testId: "metric-total-products"
    },
    {
      title: "Low Stock Items",
      value: metrics?.lowStockItems?.toString() || "0",
      icon: AlertTriangle,
      iconBg: "bg-error/10",
      iconColor: "text-error",
      change: "+8 items",
      changeType: "decrease",
      testId: "metric-low-stock"
    },
    {
      title: "Pending Orders",
      value: metrics?.pendingOrders?.toString() || "0",
      icon: ShoppingCart,
      iconBg: "bg-warning/10",
      iconColor: "text-warning",
      change: "+23",
      changeType: "neutral",
      testId: "metric-pending-orders"
    },
    {
      title: "Order Value",
      value: `$${(metrics?.totalOrderValue / 1000)?.toFixed(1) || "0"}K`,
      icon: DollarSign,
      iconBg: "bg-success/10",
      iconColor: "text-success",
      change: "+15.2%",
      changeType: "increase",
      testId: "metric-order-value"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" data-testid="metrics-grid">
      {metricCards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.title} className="shadow-material">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-900" data-testid={card.testId}>{card.value}</p>
                </div>
                <div className={`w-12 h-12 ${card.iconBg} rounded-lg flex items-center justify-center`}>
                  <Icon className={`h-6 w-6 ${card.iconColor}`} />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className={`font-medium ${
                  card.changeType === "increase" ? "text-success" : 
                  card.changeType === "decrease" ? "text-error" : "text-warning"
                }`}>
                  {card.change}
                </span>
                <span className="text-gray-600 ml-2">vs last month</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
