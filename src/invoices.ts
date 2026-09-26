import _ from "lodash";

export interface LineItem {
  merchantId: string;
  sku: string;
  amountCents: number;
  billedAt: string; // ISO date
}

export interface MerchantInvoice {
  merchantId: string;
  totalCents: number;
  lineCount: number;
}

/** Groups line items by merchant and totals them, largest invoice first. */
export function buildInvoices(items: LineItem[]): MerchantInvoice[] {
  const byMerchant = _.groupBy(items, "merchantId");
  const invoices = Object.entries(byMerchant).map(([merchantId, lines]) => ({
    merchantId,
    totalCents: _.sumBy(lines, "amountCents"),
    lineCount: lines.length,
  }));
  return _.orderBy(invoices, ["totalCents", "merchantId"], ["desc", "asc"]);
}
