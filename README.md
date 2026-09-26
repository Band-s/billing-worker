# billing-worker

> **Security demo fixture.** This repository is pinned to a known-affected dependency
> version (`lodash@4.17.20`, CVE-2021-23337) for fix-verification testing in the
> VulnFleet demo. Not for production use. Northwind Commerce is fictional.

Northwind Commerce billing worker. Tier 2, internal only, PCI scope.
Nightly batch job that turns ledger line items into merchant invoices.

```bash
npm install
npm test
npm run build:header   # build-time: renders the static invoice header
```
