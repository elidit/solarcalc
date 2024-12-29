import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sun, Battery, LineChart, Mail } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="container max-w-6xl mx-auto px-4 py-20">
        <div className="text-center space-y-8">
          <div className="inline-block p-4 bg-yellow-100 rounded-full mb-4">
            <Sun className="w-12 h-12 text-yellow-500" />
          </div>
          
          <h1 className="text-5xl font-bold tracking-tight">
            Transform Your Roof into a <br />
            <span className="text-yellow-500">Power Station</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover your home's solar potential in minutes. Get accurate calculations 
            and personalized recommendations based on your roof's unique characteristics.
          </p>

          <div className="flex justify-center gap-4">
            <Link href="/calculator">
              <Button size="lg" className="text-lg px-8">
                Start Your Solar Journey
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container max-w-6xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <Battery className="w-10 h-10 text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Maximize Efficiency</h3>
            <p className="text-muted-foreground">
              Get precise calculations based on your roof's dimensions, angle, and orientation
              to maximize your solar energy potential.
            </p>
          </div>
          
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <LineChart className="w-10 h-10 text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Instant Analysis</h3>
            <p className="text-muted-foreground">
              Receive immediate results showing panel count, potential wattage, and
              estimated energy production.
            </p>
          </div>
          
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <Mail className="w-10 h-10 text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Detailed Report</h3>
            <p className="text-muted-foreground">
              Get a comprehensive email report with your results and personalized
              recommendations for your solar installation.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container max-w-6xl mx-auto px-4 py-20">
        <div className="bg-yellow-500 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Harness Solar Power?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of homeowners who have discovered their solar potential.
            Get your free calculation today.
          </p>
          <Link href="/calculator">
            <Button size="lg" variant="secondary">
              Calculate Your Potential
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}