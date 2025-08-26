import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { ReplenishmentRecommendation, Product } from "@shared/schema";

interface EnrichedReplenishmentRecommendation extends ReplenishmentRecommendation {
  product?: Product;
}

export default function ReplenishmentPanel() {
  const { data: recommendations = [], isLoading } = useQuery<EnrichedReplenishmentRecommendation[]>({
    queryKey: ["/api/replenishment-recommendations"],
  });

  const createReplenishmentOrder = useMutation({
    mutationFn: (recommendationId: string) => 
      apiRequest("DELETE", `/api/replenishment-recommendations/${recommendationId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/replenishment-recommendations"] });
    },
  });

  const getUrgencyBadge = (urgencyLevel: string) => {
    const urgencyConfig = {
      low: { variant: "secondary" as const, className: "bg-gray-100 text-gray-800" },
      medium: { variant: "secondary" as const, className: "bg-warning text-warning-foreground" },
      high: { variant: "destructive" as const, className: "" },
      critical: { variant: "destructive" as const, className: "bg-error text-error-foreground" }
    };

    const config = urgencyConfig[urgencyLevel as keyof typeof urgencyConfig] || urgencyConfig.low;
    
    return (
      <Badge variant={config.variant} className={config.className}>
        {urgencyLevel.charAt(0).toUpperCase() + urgencyLevel.slice(1)}
      </Badge>
    );
  };

  return (
    <Card className="mt-8 shadow-material" data-testid="card-replenishment-panel">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Replenishment Recommendations</CardTitle>
          <Button data-testid="button-create-all-orders">
            Create All Orders
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        ) : recommendations.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500" data-testid="text-no-recommendations">No replenishment recommendations at this time</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recommended Order</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Urgency</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recommendations.map((recommendation) => (
                  <tr key={recommendation.id} className="hover:bg-gray-50" data-testid={`row-recommendation-${recommendation.id}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-lg flex-shrink-0"></div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900" data-testid={`text-product-name-${recommendation.id}`}>
                            {recommendation.product?.name || "Unknown Product"}
                          </div>
                          <div className="text-sm text-gray-500" data-testid={`text-product-sku-${recommendation.id}`}>
                            {recommendation.product?.sku || "N/A"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900" data-testid={`text-current-stock-${recommendation.id}`}>
                      {recommendation.product?.currentStock || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900" data-testid={`text-recommended-quantity-${recommendation.id}`}>
                      {recommendation.recommendedQuantity} units
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900" data-testid={`text-supplier-${recommendation.id}`}>
                      {recommendation.product?.supplier || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap" data-testid={`urgency-${recommendation.id}`}>
                      {getUrgencyBadge(recommendation.urgencyLevel)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => createReplenishmentOrder.mutate(recommendation.id)}
                        disabled={createReplenishmentOrder.isPending}
                        data-testid={`button-create-order-${recommendation.id}`}
                      >
                        Create Order
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
