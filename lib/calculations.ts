export interface SolarCalculation {
  roofLength: number;
  roofWidth: number;
  roofPitch: number;
  roofOrientation: string;
}

const PANEL_LENGTH = 1.65; // meters
const PANEL_WIDTH = 1.0; // meters
const PANEL_WATTAGE = 375; // watts
const SPACING = 0.1; // meters between panels

export function calculateSolarPotential(data: SolarCalculation) {
  // Calculate actual roof area considering pitch
  const pitchFactor = Math.cos((data.roofPitch * Math.PI) / 180);
  const actualArea = (data.roofLength * data.roofWidth) * pitchFactor;

  // Calculate usable area (80% of actual area for setbacks and obstacles)
  const usableArea = actualArea * 0.8;

  // Calculate number of panels that can fit
  const panelsPerRow = Math.floor(data.roofWidth / (PANEL_WIDTH + SPACING));
  const rows = Math.floor(data.roofLength / (PANEL_LENGTH + SPACING));
  const totalPanels = panelsPerRow * rows;

  // Calculate total potential wattage
  const totalWattage = totalPanels * PANEL_WATTAGE;

  // Apply orientation efficiency factors
  const orientationEfficiency = getOrientationEfficiency(data.roofOrientation);
  const adjustedWattage = totalWattage * orientationEfficiency;

  return {
    panelCount: totalPanels,
    totalWattage: Math.round(adjustedWattage),
    usableArea: Math.round(usableArea * 100) / 100,
  };
}

function getOrientationEfficiency(orientation: string): number {
  const efficiencies: Record<string, number> = {
    'south': 1.0,
    'southeast': 0.95,
    'southwest': 0.95,
    'east': 0.85,
    'west': 0.85,
    'north': 0.7,
    'northeast': 0.75,
    'northwest': 0.75,
  };
  return efficiencies[orientation.toLowerCase()] || 0.8;
}