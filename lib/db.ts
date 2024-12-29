import { prisma } from './prisma';
import { sendCalculationEmail } from './mail';
import { SolarCalculation } from './calculations';

export interface SolarCalculationRecord extends SolarCalculation {
  email: string;
  address: string;
}

export async function saveSolarCalculation(data: SolarCalculationRecord, results: {
  panelCount: number;
  totalWattage: number;
}) {
  // Save to database
  await prisma.solarCalculation.create({
    data: {
      email: data.email,
      address: data.address,
      roofLength: data.roofLength,
      roofWidth: data.roofWidth,
      roofPitch: data.roofPitch,
      roofOrientation: data.roofOrientation,
      panelCount: results.panelCount,
      totalWattage: results.totalWattage,
    },
  });

  // Send email
  await sendCalculationEmail(data.email, {
    panelCount: results.panelCount,
    totalWattage: results.totalWattage,
    address: data.address,
  });
}