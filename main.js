const fs = require("node:fs");
const http = require("node:http");

const hostname = "127.0.0.1";
const port = 8080;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  const html = fs
    .readFileSync("index.html", "utf8")
    .replace(":n:", process.env.N ?? 0);
  res.end(html);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
