import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Order } from "@shared/schema";

export default function RecentOrders() {
  const { data: orders = [], isLoading } = useQuery<Order[]>({
    queryKey: ["/api/orders"],
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { variant: "secondary" as const, className: "bg-gray-100 text-gray-800" },
      processing: { variant: "secondary" as const, className: "bg-warning text-warning-foreground" },
      shipped: { variant: "default" as const, className: "bg-success text-success-foreground" },
      delivered: { variant: "default" as const, className: "bg-primary text-primary-foreground" },
      cancelled: { variant: "destructive" as const, className: "" }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    
    return (
      <Badge variant={config.variant} className={config.className}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <Card className="shadow-material" data-testid="card-recent-orders">
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {orders.slice(0, 4).map((order) => (
              <div key={order.id} className="flex items-center justify-between" data-testid={`row-recent-order-${order.id}`}>
                <div>
                  <p className="text-sm font-medium text-gray-900" data-testid={`text-order-number-${order.id}`}>{order.orderNumber}</p>
                  <p className="text-xs text-gray-500" data-testid={`text-customer-name-${order.id}`}>{order.customerName}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900" data-testid={`text-order-amount-${order.id}`}>${order.totalAmount}</p>
                  <div data-testid={`status-order-${order.id}`}>
                    {getStatusBadge(order.status)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="pt-4 border-t border-gray-200">
          <Button variant="ghost" className="w-full text-center text-sm font-medium text-primary hover:text-primary/80" data-testid="button-view-all-orders">
            View All Orders
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
