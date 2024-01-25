import { parseSpreadsheet } from './excelParser';
import { groupRetailersByLocation } from './dataGrouping';
import { generateJsonLines } from './jsonOutput';

const spreadsheetPath = 'iw-tech-test-retailer-data.xlsx';

async function index() {
  const data = await parseSpreadsheet(spreadsheetPath);
  const groupedRetailers = groupRetailersByLocation(data);
  const allRetailers = data;

  Object.values(groupedRetailers).forEach((group) => {
    generateJsonLines(group);
  });

  generateJsonLines(allRetailers);
}

index();
