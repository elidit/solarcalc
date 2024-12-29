"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2, ArrowLeft } from "lucide-react";
import { useState } from "react";
import Link from 'next/link';
import { calculateSolarPotential } from "@/lib/calculations";
import { saveSolarCalculation } from "@/lib/db";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z.string().email(),
  address: z.string().min(10, "Please enter a complete address"),
  roofLength: z.string().transform(Number).pipe(
    z.number().positive("Length must be greater than 0")
  ),
  roofWidth: z.string().transform(Number).pipe(
    z.number().positive("Width must be greater than 0")
  ),
  roofPitch: z.string().transform(Number).pipe(
    z.number().min(0).max(45, "Pitch must be between 0 and 45 degrees")
  ),
  roofOrientation: z.enum([
    "north",
    "northeast",
    "east",
    "southeast",
    "south",
    "southwest",
    "west",
    "northwest"
  ]),
});

export default function Calculator() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      address: "",
      roofLength: "",
      roofWidth: "",
      roofPitch: "",
      roofOrientation: "south",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const calculation = calculateSolarPotential({
        roofLength: values.roofLength,
        roofWidth: values.roofWidth,
        roofPitch: values.roofPitch,
        roofOrientation: values.roofOrientation,
      });

      await saveSolarCalculation(values, {
        panelCount: calculation.panelCount,
        totalWattage: calculation.totalWattage,
      });

      toast({
        title: "Calculation Complete!",
        description: `Your roof can fit approximately ${calculation.panelCount} panels with a total potential of ${calculation.totalWattage}W. We'll send the detailed results to your email shortly.`,
      });

      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container max-w-2xl mx-auto px-4 py-16">
        <Link href="/" className="inline-flex items-center text-sm mb-8 hover:text-primary">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="space-y-6 text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tighter">
            Solar Panel Calculator
          </h1>
          <p className="text-lg text-muted-foreground">
            Enter your roof details below
          </p>
        </div>

        <div className="bg-card p-6 rounded-lg shadow-lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Solar Street, City, State" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="roofLength"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Roof Length (meters)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="roofWidth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Roof Width (meters)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="roofPitch"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Roof Pitch (degrees)</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" max="45" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="roofOrientation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Roof Orientation</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select orientation" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="north">North</SelectItem>
                          <SelectItem value="northeast">Northeast</SelectItem>
                          <SelectItem value="east">East</SelectItem>
                          <SelectItem value="southeast">Southeast</SelectItem>
                          <SelectItem value="south">South</SelectItem>
                          <SelectItem value="southwest">Southwest</SelectItem>
                          <SelectItem value="west">West</SelectItem>
                          <SelectItem value="northwest">Northwest</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Calculate Solar Potential
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}