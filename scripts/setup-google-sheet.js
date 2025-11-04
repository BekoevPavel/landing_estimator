/**
 * Script to setup Google Sheet with header row
 * Run with: node scripts/setup-google-sheet.js
 */

import { google } from 'googleapis';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '..', '.env') });

async function setupGoogleSheet() {
  try {
    console.log('🔧 Setting up Google Sheet...');

    const privateKey = process.env.VITE_GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!privateKey || !process.env.VITE_GOOGLE_SERVICE_ACCOUNT_EMAIL) {
      throw new Error('Missing Google credentials in .env file');
    }

    const auth = new google.auth.JWT(
      process.env.VITE_GOOGLE_SERVICE_ACCOUNT_EMAIL,
      undefined,
      privateKey,
      ['https://www.googleapis.com/auth/spreadsheets']
    );

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.VITE_GOOGLE_SHEET_ID;

    // Add header row
    const headerValues = [['Email', 'Timestamp', 'Amount', 'Plan Type']];

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'Sheet1!A1:D1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: headerValues,
      },
    });

    console.log('✅ Google Sheet setup complete!');
    console.log('📊 Header row added: Email | Timestamp | Amount | Plan Type');
    console.log(`🔗 Sheet URL: https://docs.google.com/spreadsheets/d/${spreadsheetId}`);

  } catch (error) {
    console.error('❌ Error setting up Google Sheet:', error.message);
    process.exit(1);
  }
}

setupGoogleSheet();
