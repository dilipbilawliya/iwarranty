import { Retailer } from './excelParser';

export function groupRetailersByLocation(data: Retailer[]): { [location: string]: Retailer[] } {
  const groupedRetailers: { [directory_category: string]: Retailer[] } = {};

  data.forEach((retailer) => {
    const directory_category = retailer.directory_location__state || 'Unknown';
    groupedRetailers[directory_category] = groupedRetailers[directory_category] || [];
    groupedRetailers[directory_category].push(retailer);
  });

  return groupedRetailers;
}
