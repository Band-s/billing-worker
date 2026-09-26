import { test } from "node:test";
import assert from "node:assert/strict";
import { buildInvoices } from "../src/invoices.js";

test("groups, totals and orders invoices by merchant", () => {
  const invoices = buildInvoices([
    { merchantId: "m_b", sku: "x", amountCents: 500, billedAt: "2026-09-01" },
    { merchantId: "m_a", sku: "y", amountCents: 1200, billedAt: "2026-09-01" },
    { merchantId: "m_b", sku: "z", amountCents: 900, billedAt: "2026-09-02" },
  ]);
  assert.deepEqual(invoices, [
    { merchantId: "m_b", totalCents: 1400, lineCount: 2 },
    { merchantId: "m_a", totalCents: 1200, lineCount: 1 },
  ]);
});

test("returns no invoices for no line items", () => {
  assert.deepEqual(buildInvoices([]), []);
});
