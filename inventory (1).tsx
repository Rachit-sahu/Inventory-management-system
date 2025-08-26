import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import Sidebar from "@/components/layout/sidebar";
import TopBar from "@/components/layout/topbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import InventoryForm from "@/components/forms/inventory-form";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Product } from "@shared/schema";

export default function Inventory() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const deleteProduct = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
    },
  });

  const getStatusBadge = (product: Product) => {
    if (product.currentStock === 0) {
      return <Badge variant="destructive" data-testid={`badge-status-${product.id}`}>Out of Stock</Badge>;
    } else if (product.currentStock <= product.minStockLevel) {
      return <Badge variant="secondary" className="bg-warning text-warning-foreground" data-testid={`badge-status-${product.id}`}>Low Stock</Badge>;
    } else {
      return <Badge variant="default" className="bg-success text-success-foreground" data-testid={`badge-status-${product.id}`}>In Stock</Badge>;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar title="Inventory Management" />
        
        <main className="flex-1 p-6 overflow-auto">
          <Card className="shadow-material">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle data-testid="card-title-inventory">Inventory Overview</CardTitle>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button data-testid="button-add-product">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Product
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add New Product</DialogTitle>
                    </DialogHeader>
                    <InventoryForm onSuccess={() => setIsDialogOpen(false)} />
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-16 bg-gray-200 rounded animate-pulse" />
                  ))}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {products.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50" data-testid={`row-product-${product.id}`}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gray-200 rounded-lg flex-shrink-0"></div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900" data-testid={`text-name-${product.id}`}>{product.name}</div>
                                <div className="text-sm text-gray-500" data-testid={`text-category-${product.id}`}>{product.category}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900" data-testid={`text-sku-${product.id}`}>{product.sku}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900" data-testid={`text-stock-${product.id}`}>{product.currentStock}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(product)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900" data-testid={`text-price-${product.id}`}>${product.unitPrice}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              data-testid={`button-edit-${product.id}`}
                            >
                              Edit
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => deleteProduct.mutate(product.id)}
                              disabled={deleteProduct.isPending}
                              data-testid={`button-delete-${product.id}`}
                            >
                              Delete
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
        </main>
      </div>
    </div>
  );
}
