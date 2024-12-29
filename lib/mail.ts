import formData from 'form-data';
import Mailgun from 'mailgun.js';
import { getRequiredEnvVar } from './env';

const mailgun = new Mailgun(formData);

const mg = mailgun.client({
  username: 'api',
  key: getRequiredEnvVar('MAILGUN_API_KEY'),
});

export async function sendCalculationEmail(to: string, data: {
  panelCount: number;
  totalWattage: number;
  address: string;
}) {
  const domain = getRequiredEnvVar('MAILGUN_DOMAIN');
  
  await mg.messages.create(domain, {
    from: `SolarCalc <noreply@${domain}>`,
    to: [to],
    subject: 'Your Solar Panel Calculation Results',
    template: 'solar-calculation',
    'h:X-Mailgun-Variables': JSON.stringify({
      address: data.address,
      panelCount: data.panelCount,
      totalWattage: data.totalWattage,
      yearlyProduction: Math.round(data.totalWattage * 4.5 * 365), // Rough estimate
    }),
  });
}