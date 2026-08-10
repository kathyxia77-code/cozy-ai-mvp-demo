import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const source = resolve(root, "src/styles/momcozy-theme.css");
const target = resolve(root, "public/demos/01-user-guide/momcozy-theme.css");

const themeCss = readFileSync(source, "utf8").replaceAll('url("/fonts/', 'url("../../fonts/');

writeFileSync(target, themeCss);

console.log("Synced Momcozy theme to public/demos/01-user-guide/momcozy-theme.css");
