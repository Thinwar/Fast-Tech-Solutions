import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const source = path.join(rootDir, "public", "_redirects");
const destinationDir = path.join(rootDir, "build", "client");
const destination = path.join(destinationDir, "_redirects");

await mkdir(destinationDir, { recursive: true });
await copyFile(source, destination);
