import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY;
if (!apiKey) {
  throw new Error("RESEND_API_KEY is missing. Check your .env.local file.");
}

const resend = new Resend(apiKey);

export async function sendCalculationEmail(to: string, data: {
  panelCount: number;
  totalWattage: number;
  address: string;
}) {
  await resend.emails.send({
    from: 'SolarCalc <solar@resend.dev>',
    to: [to],
    subject: 'Your Solar Panel Calculation Results',
    html: `
      <h1>Your Solar Calculation Results</h1>
      <p>Here are the results for your property at ${data.address}:</p>
      <ul>
        <li>Number of Panels: ${data.panelCount}</li>
        <li>Total Potential Wattage: ${data.totalWattage}W</li>
        <li>Estimated Yearly Production: ${Math.round(data.totalWattage * 4.5 * 365)}kWh</li>
      </ul>
      <p>Want to take the next step? Reply to this email to connect with a solar installation expert.</p>
    `,
  });
}