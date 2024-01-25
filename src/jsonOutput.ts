import { Retailer } from './excelParser';

export function generateJsonLines(retailers: Retailer[]): void {
  retailers.forEach((retailer) => {
    console.log(JSON.stringify(retailer));
  });
}
