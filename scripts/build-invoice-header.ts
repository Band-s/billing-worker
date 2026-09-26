import _ from "lodash";
import fs from "node:fs";

// Build-time script: renders the static invoice header once, at build time.
// The template is a hard-coded constant; nothing here comes from a request,
// a file, or the environment.
const HEADER_TEMPLATE = "Northwind Commerce · Invoice run <%= runDate %>";

const header = _.template(HEADER_TEMPLATE)({ runDate: new Date().toISOString().slice(0, 10) });

fs.mkdirSync("dist", { recursive: true });
fs.writeFileSync("dist/invoice-header.txt", header + "\n");
console.log(header);
