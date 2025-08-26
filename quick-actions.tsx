import { Plus, Package, BarChart3, Truck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function QuickActions() {
  return (
    <Card className="shadow-material" data-testid="card-quick-actions">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Link href="/orders">
            <Button className="w-full justify-center" data-testid="button-create-order">
              <Plus className="h-4 w-4 mr-2" />
              Create Order
            </Button>
          </Link>
          <Link href="/inventory">
            <Button variant="outline" className="w-full justify-center" data-testid="button-add-inventory">
              <Package className="h-4 w-4 mr-2" />
              Add Inventory
            </Button>
          </Link>
          <Link href="/analytics">
            <Button variant="outline" className="w-full justify-center" data-testid="button-generate-report">
              <BarChart3 className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </Link>
          <Button variant="outline" className="w-full justify-center" data-testid="button-manage-suppliers">
            <Truck className="h-4 w-4 mr-2" />
            Manage Suppliers
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
