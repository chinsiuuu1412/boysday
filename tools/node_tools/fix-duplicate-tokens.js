// Chạy từ THƯ MỤC GỐC của dự án (nơi có people.js):
//   node tools/node_tools/fix_duplicate_tokens.js --check    (chỉ liệt kê, không sửa)
//   node tools/node_tools/fix_duplicate_tokens.js            (sửa và ghi đè people.js)
// Người xuất hiện đầu tiên giữ token cũ; các token trùng hoặc rỗng phía sau được đổi sang mã mới.
const fs = require("fs"), crypto = require("crypto");
const FILE = "people.js", DRY = process.argv.includes("--check");
const ALPHA = "abcdefghjkmnpqrstuvwxyz23456789";      // bỏ i, l, o, 0, 1

let src = fs.readFileSync(FILE, "utf8");
const used = new Set([...src.matchAll(/token:\s*"([^"]*)"/g)].map(m => m[1]));
const seen = new Set();
let fixed = 0;

function make() {
  let t;
  do { t = Array.from(crypto.randomBytes(8), b => ALPHA[b % ALPHA.length]).join(""); }
  while (used.has(t));
  used.add(t);
  return t;
}

src = src.replace(/(token:\s*")([^"]*)(")/g, (m, pre, tok, post, offset, whole) => {
  if (tok !== "" && !seen.has(tok)) { seen.add(tok); return m; }
  const i = whole.lastIndexOf("name:", offset);
  const nm = (whole.slice(i, offset).match(/name:\s*"([^"]*)"/) || [])[1] || "?";
  const t = make(); seen.add(t); fixed++;
  console.log((tok === "" ? "Token rỗng" : "Token trùng " + tok) + "  →  " + t + "   (" + nm + ")");
  return pre + t + post;
});

// Cảnh báo nếu cùng một người (cùng ban + cùng họ tên) bị khai báo nhiều lần
const cnt = {};
for (const m of src.matchAll(/\{ban:\s*"([^"]*)",\s*name:\s*"([^"]*)"/g)) { const k = m[1] + " | " + m[2]; cnt[k] = (cnt[k] || 0) + 1; }
Object.entries(cnt).filter(([, c]) => c > 1).forEach(([k, c]) => console.log("⚠ Dòng bị lặp " + c + " lần: " + k + "  (nên xóa bớt, đừng chỉ đổi token)"));

if (!fixed) console.log("Không có token trùng hoặc rỗng.");
else if (DRY) console.log("(--check) Cần đổi " + fixed + " token. Chưa ghi file.");
else { fs.writeFileSync(FILE, src); console.log("Đã đổi " + fixed + " token và ghi " + FILE + "."); }