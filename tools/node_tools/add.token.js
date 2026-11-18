
// Thêm "token" cho mỗi người CHƯA có token. Người đã có token được giữ nguyên.
const fs = require("fs"), crypto = require("crypto");
const FILE = "people.js";
const ALPHA = "abcdefghjkmnpqrstuvwxyz23456789";   // bỏ các ký tự dễ nhầm: i, l, o, 0, 1

let src = fs.readFileSync(FILE, "utf8");
const used = new Set([...src.matchAll(/token:\s*"([^"]+)"/g)].map(m => m[1]));

function make() {
  let t;
  do { t = Array.from(crypto.randomBytes(8), b => ALPHA[b % ALPHA.length]).join(""); }
  while (used.has(t));
  used.add(t);
  return t;
}

let n = 0;
src = src.replace(/\{ban:\s*"[^"]*",\s*name:\s*"[^"]*",(?!\s*token:)/g, m => { n++; return m + ' token: "' + make() + '",'; });
fs.writeFileSync(FILE, src);
console.log("Đã thêm token cho " + n + " người. Tổng số token: " + used.size);