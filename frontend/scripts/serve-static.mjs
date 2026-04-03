import { createReadStream, existsSync } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const clientDir = path.join(rootDir, "build", "client");
const indexFile = path.join(clientDir, "index.html");
const port = Number(process.env.PORT || 4173);

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function getContentType(filePath) {
  return mimeTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream";
}

function getSafeFilePath(urlPath) {
  const relativePath = decodeURIComponent(urlPath.split("?")[0]).replace(/^\/+/, "");
  const filePath = path.normalize(path.join(clientDir, relativePath));
  return filePath.startsWith(clientDir) ? filePath : null;
}

const server = http.createServer(async (req, res) => {
  if (!existsSync(indexFile)) {
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Missing build/client/index.html. Run `npm run build` first.");
    return;
  }

  const requestPath = req.url || "/";
  const filePath = getSafeFilePath(requestPath);

  if (filePath) {
    try {
      const fileInfo = await stat(filePath);
      if (fileInfo.isFile()) {
        res.writeHead(200, { "Content-Type": getContentType(filePath) });
        createReadStream(filePath).pipe(res);
        return;
      }
    } catch {
      // Fall through to the SPA entry point.
    }
  }

  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(await readFile(indexFile, "utf8"));
});

server.listen(port, () => {
  console.log(`Static storefront ready at http://localhost:${port}`);
});
