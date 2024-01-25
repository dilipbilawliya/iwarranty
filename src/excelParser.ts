import * as ExcelJS from 'exceljs';

export interface Retailer {
  directory_category: string;
  content_children_count: string;
  directory_contact__email: string;
  directory_contact__fax: string;
  directory_contact__mobile: string;
  directory_contact__phone: string;
  directory_contact__website: string;
  content_post_id: string;
  content_post_slug: string;
  content_body: string;
  directory_location__street: string;
  directory_location__city: string;
  directory_location__country: string;
  directory_location__address: string;
  directory_location__lat: string;
  directory_location__lng: string;
  directory_location__zip: string;
  directory_location__state: string;
  directory_social__facebook: string;
  directory_social__googleplus: string;
  directory_social__twitter: string;
  content_post_status: string;
  content_post_title: string;
}

async function parseSpreadsheet(filePath: string): Promise<Retailer[]> {
  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    const sheet: ExcelJS.Worksheet | undefined = workbook.worksheets[0];
    if (!sheet) {
      throw new Error('No sheets found in the workbook.');
    }

    const retailers: Retailer[] = [];
    const columnHeadings = sheet.getRow(1).values as string[];

    for (let rowNumber = 2; rowNumber <= sheet.rowCount; rowNumber++) {
      const row = sheet.getRow(rowNumber);
      const retailer: Partial<Retailer> = {};

      columnHeadings.forEach((heading, index) => {
        const key = heading as keyof Retailer;
        retailer[key] = String(row.getCell(index).value);
      });

      retailers.push(retailer as Retailer);
    }

    return retailers;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error parsing spreadsheet: ${error.message}`);
    } else {
      console.error(`An unknown error occurred while parsing the spreadsheet.`);
    }
    return [];
  }
}

export { parseSpreadsheet };
