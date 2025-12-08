import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function MedicineFilter() {
  return (
    <div className="bg-card rounded-xl border p-4 shadow-sm">
      <div className="mb-4 text-sm font-medium text-muted-foreground">Filters</div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Search medicine</label>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Tên thuốc hoặc hoạt chất..."
              className="pl-9"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Status</label>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="in-stock">In stock</SelectItem>
              <SelectItem value="low-stock">Low stock</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Expiry filter</label>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Select date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All dates</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
              <SelectItem value="expiring-soon">Expiring soon</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Supplier</label>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Select supplier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pfizer">Pfizer</SelectItem>
              <SelectItem value="bayer">Bayer</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
