import { getSupabaseClient } from './supabase';
import { SolarCalculation } from './calculations';

export interface SolarCalculationRecord extends SolarCalculation {
  email: string;
  address: string;
}

export async function saveSolarCalculation(data: SolarCalculationRecord, results: {
  panelCount: number;
  totalWattage: number;
}) {
  const supabase = getSupabaseClient();
  
  const { error } = await supabase.from("solar_calculations").insert({
    email: data.email,
    address: data.address,
    roof_length: data.roofLength,
    roof_width: data.roofWidth,
    roof_pitch: data.roofPitch,
    roof_orientation: data.roofOrientation,
    panel_count: results.panelCount,
    total_wattage: results.totalWattage,
  });

  if (error) {
    throw new Error('Failed to save calculation results');
  }
}