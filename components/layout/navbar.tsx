import Link from 'next/link';
import { Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <nav className="border-b bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Sun className="h-6 w-6 text-yellow-500" />
            <span className="text-xl font-semibold">SolarCalc</span>
          </Link>
          
          <Link href="/calculator">
            <Button>Calculate Now</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}