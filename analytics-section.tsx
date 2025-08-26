import { TrendingUp, ArrowUpDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AnalyticsSection() {
  return (
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8" data-testid="analytics-section">
      {/* Demand Forecast Chart */}
      <Card className="shadow-material">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle data-testid="title-demand-forecast">Demand Forecast</CardTitle>
            <select className="text-sm border border-gray-300 rounded-lg px-3 py-1" data-testid="select-forecast-period">
              <option value="30">Next 30 days</option>
              <option value="60">Next 60 days</option>
              <option value="90">Next 90 days</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center" data-testid="chart-demand-forecast">
            <div className="text-center">
              <TrendingUp className="mx-auto text-gray-400 text-3xl mb-2" />
              <p className="text-gray-500">Demand Forecast Chart</p>
              <p className="text-xs text-gray-400">Shows predicted demand based on historical data</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-600">Avg Daily Orders</p>
              <p className="text-lg font-semibold text-gray-900" data-testid="metric-avg-daily-orders">127</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Peak Day</p>
              <p className="text-lg font-semibold text-gray-900" data-testid="metric-peak-day">185</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Trend</p>
              <p className="text-lg font-semibold text-success" data-testid="metric-trend">+8.2%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stock Movement Chart */}
      <Card className="shadow-material">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle data-testid="title-stock-movement">Stock Movement</CardTitle>
            <select className="text-sm border border-gray-300 rounded-lg px-3 py-1" data-testid="select-movement-period">
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center" data-testid="chart-stock-movement">
            <div className="text-center">
              <ArrowUpDown className="mx-auto text-gray-400 text-3xl mb-2" />
              <p className="text-gray-500">Stock Movement Chart</p>
              <p className="text-xs text-gray-400">Shows inventory in/out transactions</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Total In</p>
              <p className="text-lg font-semibold text-success" data-testid="metric-total-in">+2,847</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Total Out</p>
              <p className="text-lg font-semibold text-error" data-testid="metric-total-out">-2,134</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
