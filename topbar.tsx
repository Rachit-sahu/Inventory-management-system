import { Menu, Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TopBarProps {
  title: string;
}

export default function TopBar({ title }: TopBarProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200" data-testid="topbar">
      <div className="px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="lg:hidden" data-testid="button-mobile-menu">
            <Menu className="h-5 w-5 text-gray-600" />
          </Button>
          <h1 className="text-2xl font-semibold text-gray-900" data-testid="text-page-title">{title}</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative hidden md:block">
            <Input 
              type="text" 
              placeholder="Search inventory..." 
              className="w-64 pl-10"
              data-testid="input-search"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative" data-testid="button-notifications">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-white text-xs rounded-full flex items-center justify-center" data-testid="badge-notification-count">
              3
            </span>
          </Button>
          
          {/* User Menu */}
          <div className="flex items-center space-x-3" data-testid="user-menu">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium" data-testid="text-user-initials">JD</span>
            </div>
            <span className="hidden md:block text-sm font-medium text-gray-700" data-testid="text-user-name">John Doe</span>
          </div>
        </div>
      </div>
    </header>
  );
}
