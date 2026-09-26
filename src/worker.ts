import fs from "node:fs";
import { buildInvoices, type LineItem } from "./invoices.js";

// Internal batch job: reads the nightly line-item export from the ledger
// and writes merchant invoices. Runs inside the private billing VPC.
const input = process.argv[2] ?? "ledger-export.json";
const items = JSON.parse(fs.readFileSync(input, "utf8")) as LineItem[];
console.log(JSON.stringify(buildInvoices(items), null, 2));
