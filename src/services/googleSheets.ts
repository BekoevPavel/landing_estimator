interface SheetData {
  email: string;
  timestamp: string;
  amount: number;
  planType: string;
  variant: string;
}

class GoogleSheetsService {
  private webhookUrl: string;

  constructor() {
    this.webhookUrl = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL || '';
  }

  async appendRow(data: SheetData): Promise<void> {
    try {
      if (!this.webhookUrl) {
        throw new Error('Google Sheets webhook URL is not configured');
      }

      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        mode: 'no-cors', // Required for Google Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log('✅ Data successfully sent to Google Sheets');
    } catch (error) {
      console.error('❌ Error sending data to Google Sheets:', error);
      throw error;
    }
  }
}

export const googleSheetsService = new GoogleSheetsService();
export type { SheetData };
