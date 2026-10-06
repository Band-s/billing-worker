# billing-worker

> Demo code written for the VulnFleet / Cursor exercise. Northwind Commerce is
> fictional. The lodash pin (4.17.20, historical CVE-2021-23337) is deliberate.

## What this is

The Northwind Commerce nightly billing job. It reads the ledger's line-item
export inside the private billing VPC, groups it by merchant and writes the
merchant invoices finance sends out. It takes no network input. Its only
template is a hard-coded invoice header rendered at build time.

## CMDB

| Field | Value |
|---|---|
| Tier | 2 |
| Exposure | internal only |
| Data class | PCI |
| Owner | finance-eng |

## Install, build, test

```bash
npm ci                 # install exactly what package-lock.json records
npm test               # node --import tsx --test "test/**/*.test.ts"
npm run build:header   # build-time: renders dist/invoice-header.txt
npm start -- ledger-export.json   # run the batch on a ledger export
npx tsc --noEmit       # typecheck
```

## Conventions

- Invoice logic is pure (`src/invoices.ts`) and unit tested; `src/worker.ts` is
  only file I/O.
- Amounts are integer cents. Ordering is total desc, then merchantId asc: finance
  diffs runs, so keep it stable.
- Remediation conventions: `.cursor/rules/northwind-remediation.mdc`.
  Fix procedure: the `northwind-safe-fix` skill.

## Cursor Cloud specific instructions

Verify command:

```bash
npm ci && npm test
```

Before editing, run the verify command. If it fails, stop and report the failing command and output.

- The environment's install step (`.cursor/environment.json`) already runs `npm ci`.
- No ledger data or credentials exist in the VM; use the fixtures in the tests.
