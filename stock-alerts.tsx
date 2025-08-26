import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { StockAlert, Product } from "@shared/schema";

interface EnrichedStockAlert extends StockAlert {
  product?: Product;
}

export default function StockAlerts() {
  const { data: alerts = [], isLoading } = useQuery<EnrichedStockAlert[]>({
    queryKey: ["/api/stock-alerts"],
    select: (data) => data.slice(0, 3), // Show only first 3 alerts
  });

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  // Enrich alerts with product information
  const enrichedAlerts = alerts.map(alert => ({
    ...alert,
    product: products.find(p => p.id === alert.productId)
  }));

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - new Date(date).getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      return `${Math.floor(diffInHours / 24)} day${Math.floor(diffInHours / 24) > 1 ? 's' : ''} ago`;
    }
  };

  return (
    <Card className="shadow-material" data-testid="card-stock-alerts">
      <CardHeader>
        <CardTitle>Stock Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        ) : enrichedAlerts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500" data-testid="text-no-alerts">No active alerts</p>
          </div>
        ) : (
          <div className="space-y-4">
            {enrichedAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start space-x-3" data-testid={`row-alert-${alert.id}`}>
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  alert.alertType === "out_of_stock" ? "bg-error" : "bg-warning"
                }`}></div>
                <div>
                  <p className="text-sm font-medium text-gray-900" data-testid={`text-product-name-${alert.id}`}>
                    {alert.product?.name || "Unknown Product"}
                  </p>
                  <p className="text-xs text-gray-500" data-testid={`text-alert-message-${alert.id}`}>{alert.message}</p>
                  <p className="text-xs text-gray-400" data-testid={`text-alert-time-${alert.id}`}>{formatTimeAgo(alert.createdAt)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
