# Update Your Google Apps Script

## Go to your Apps Script and replace the code with this:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
    const data = JSON.parse(e.postData.contents);

    // Add header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Email', 'Timestamp', 'Amount', 'Plan Type', 'A/B Variant']);
    }

    // Add data row with A/B test variant
    sheet.appendRow([
      data.email,
      data.timestamp,
      data.amount,
      data.planType,
      data.variant || 'A'  // Default to 'A' if not provided
    ]);

    return ContentService.createTextOutput(JSON.stringify({
      success: true
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Steps:

1. Open your Apps Script: https://script.google.com
2. Replace the entire `doPost` function with the code above
3. Click **Deploy** → **Manage deployments**
4. Click the ✏️ edit icon
5. Under "Version" select **New version**
6. Click **Deploy**

The new column "A/B Variant" will show which pricing variant (A or B) the customer saw!
