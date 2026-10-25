// ====== CẤU HÌNH NỘI DUNG LANDING PAGE (sửa tại đây) ======


// ====== KHAI BÁO CHUNG ======
const $ = i => document.getElementById(i), C = $("c"), g = C.getContext("2d");
const W = 256, H = 240, GY = 176, CX = [40, 112, 184]; // GY = mặt sàn, CX = vị trí 3 rương
// S: trạng thái game (start | play | win | chest | over)
let S = "start", nm = "MARIO", lives = 3, T = 0, K = {}, m, b, fb, fl, seg, col, ct, pr, mt, sel = 1, co = -1, coins = [];

// ====== ÂM THANH (Web Audio, không cần file) ======
const AC = window.AudioContext ? new AudioContext() : null;
function snd(f, d = .1, s = 0, ty = "square") {
  if (!AC) return;
  try {
    let o = AC.createOscillator(), v = AC.createGain(), n = AC.currentTime;
    o.type = ty; o.frequency.setValueAtTime(f, n);
    if (s) o.frequency.linearRampToValueAtTime(s, n + d);
    v.gain.setValueAtTime(.05, n); v.gain.linearRampToValueAtTime(0, n + d);
    o.connect(v); v.connect(AC.destination); o.start(); o.stop(n + d);
  } catch (e) {}
}
function tune(a) { a.forEach((f, i) => setTimeout(() => snd(f, .14), i * 120)); }

// ====== KHỞI TẠO / TRẠNG THÁI ======
function reset() {
  m = {x: 14, y: GY - 16, vx: 0, vy: 0, on: 1, dir: 1};                       // Mario
  b = {x: 164, y: GY - 30, vx: -.35, vy: 0, hp: 5, fl: 0, jt: 120, ft: 80, dead: 0, fall: 0}; // Bowser
  fb = []; fl = [];            // fb: cầu lửa của Mario, fl: lửa của Bowser
  seg = Array(10).fill(1);     // 10 đoạn cầu
  col = 0; ct = 0; pr = 0; mt = 0;
}
function solid(p) { return p < 32 || p >= 192 || !!seg[(p - 32) >> 4]; }
function phys() {              // trọng lực + chạm sàn của Mario
  m.vy += .28; m.y += m.vy; m.on = 0;
  if (m.vy >= 0 && m.y + 16 >= GY && m.y + 16 <= GY + 8 && (solid(m.x + 3) || solid(m.x + 9))) {
    m.y = GY - 16; m.vy = 0; m.on = 1;
  }
}
const ov = (a, b2, c, d, e, f, g2, h) => a < e + g2 && e < a + c && b2 < f + h && f < b2 + d; // va chạm hình chữ nhật
function die() { lives--; snd(200, .5, 60); if (lives <= 0) S = "over"; else reset(); }
function win() { S = "win"; fb = []; fl = []; tune([523, 659, 784, 1047, 784, 1047, 1319]); }
function begin() {
  if (AC && AC.state === "suspended") AC.resume();
  lives = 3; reset(); S = "play";
  $("ui").style.display = "none"; $("pick").style.display = "none";
  $("cardModal").classList.remove("show");
}

// ====== CẬP NHẬT (60 lần/giây) ======
function upd() {
  T++;
  if (S === "play") {
    let L = K.L, R = K.R;
    m.vx = ((R ? 1 : 0) - (L ? 1 : 0)) * 1.4;
    if (R || L) m.dir = R ? 1 : -1;
    if (K.J && m.on) { m.vy = -5.4; m.on = 0; snd(380, .18, 760); }
    m.x = Math.max(0, Math.min(W - 12, m.x + m.vx)); phys();

    // Mario bắn lửa (tối đa 2 quả cùng lúc)
    if (K.fp && fb.length < 2) { fb.push({x: m.x + 6, y: m.y + 6, vx: m.dir * 3, vy: 0}); snd(900, .08, 300); }
    K.fp = 0;
    fb = fb.filter(f => {
      f.vy += .25; f.x += f.vx; f.y += f.vy;
      if (f.y >= GY - 4 && solid(f.x)) { f.y = GY - 4; f.vy = -2.2; }      // nảy trên cầu
      if (!b.dead && ov(f.x, f.y, 4, 4, b.x + 2, b.y, 24, 30)) {           // trúng Bowser
        b.hp--; b.fl = 10; snd(150, .15, 80);
        if (b.hp <= 0) { b.dead = 1; win(); }
        return false;
      }
      return f.x > 0 && f.x < W && f.y < H;
    });
    if (S !== "play") return;

    // Bowser: đi qua lại, thỉnh thoảng nhảy và phun lửa
    b.x += b.vx; if (b.x < 112) b.vx = .35; if (b.x > 164) b.vx = -.35;
    b.vy += .2; b.y += b.vy;
    if (b.y >= GY - 30) { b.y = GY - 30; b.vy = 0; if (--b.jt < 0) { b.vy = -3.6; b.jt = 90 + Math.random() * 90; } }
    if (--b.ft < 0) { fl.push({x: b.x - 14, y: GY - (Math.random() < .5 ? 12 : 30), vx: -1.6}); b.ft = 90 + Math.random() * 60; snd(160, .3, 90, "sawtooth"); }
    if (b.fl > 0) b.fl--;
    fl = fl.filter(f => { f.x += f.vx; return f.x > -16; });

    // Mario bị trúng lửa hoặc chạm Bowser
    if (fl.some(f => ov(f.x, f.y, 14, 6, m.x + 2, m.y, 8, 16)) || ov(b.x + 4, b.y + 2, 20, 28, m.x + 2, m.y, 8, 16)) { die(); return; }
    // Chạm rìu
    if (ov(m.x, m.y, 12, 16, 229, GY - 16, 8, 16)) win();

  } else if (S === "win") {
    m.vx = 0; if (m.x < 206) { m.x += 1.2; m.dir = 1; } phys();
    if (m.x >= 192 && !col) { col = 1; ct = 0; }                    // bắt đầu sập cầu
    if (col) {
      ct++;
      if (ct % 6 === 0) { let i = seg.lastIndexOf(1); if (i >= 0) { seg[i] = 0; snd(120, .1, 60, "triangle"); } }
      if (ct > 30) b.fall = 1;
    }
    if (b.fall) { b.vy += .2; b.y += b.vy; }
    if (col && b.y > H && !pr) { pr = 1; mt = 0; }                  // công chúa xuất hiện
    if (pr && ++mt > 230) { S = "chest"; sel = 1; co = -1; }

  } else if (S === "chest") {
    if (co >= 0) { ct++; if (ct === 70) showReward(); }
    if (K.ep) { K.ep = 0; if (co < 0) open(sel); }
  }
  coins = coins.filter(c => { c.vy += .15; c.x += c.vx; c.y += c.vy; return c.y < H; });
}
function open(i) {
  if (co >= 0) return;
  co = i; sel = i; ct = 0;
  snd(500, .2, 1000); tune([784, 988, 1175, 1568]);
  for (let k = 0; k < 28; k++) coins.push({x: CX[i] + 16, y: GY - 16, vx: (Math.random() - .5) * 3, vy: -Math.random() * 4 - 1});
}


// ====== VẼ (pixel art bằng hình chữ nhật) ======
const R = (c, x, y, w, h) => { g.fillStyle = c; g.fillRect(x | 0, y | 0, w, h); };
const TX = (s, x, y, c, al = "left", sz = 8) => { g.font = sz + 'px "Press Start 2P",monospace'; g.fillStyle = c; g.textAlign = al; g.fillText(s, x, y); };

function brick(x, y, w, h, c1 = "#6c6c6c") {
  R(c1, x, y, w, h); g.fillStyle = "#000";
  for (let yy = y; yy < y + h; yy += 8) {
    g.fillRect(x, yy, w, 1);
    for (let xx = x + (((yy - y) / 8) % 2 ? 8 : 0); xx < x + w; xx += 16) g.fillRect(xx, yy, 1, 8);
  }
}
function mario(x, y, d, mv, on) {
  g.save(); g.translate(x + (d < 0 ? 12 : 0), y); g.scale(d, 1);
  R("#d82800", 2, 0, 8, 2); R("#d82800", 1, 2, 11, 2); R("#6b3000", 1, 4, 3, 4); R("#fcb878", 3, 4, 8, 5);
  R("#000", 8, 5, 1, 2); R("#6b3000", 7, 8, 5, 1);
  R("#d82800", 2, 9, 8, 4); R("#fcb878", 0, 10, 2, 3); R("#fcb878", 10, 10, 2, 3); R("#6b3000", 3, 11, 6, 2);
  let lf = on && mv ? (T >> 3) & 1 : 0;
  if (!on) { R("#6b3000", 0, 13, 4, 3); R("#6b3000", 8, 13, 4, 3); }
  else { R("#6b3000", lf ? 1 : 2, 13, 4, 3); R("#6b3000", lf ? 7 : 6, 13, 4, 3); }
  g.restore();
}
function bowser() {
  let c = b.fl > 0 && (T & 2) ? "#fff" : "#00a800";
  g.save(); g.translate(b.x | 0, b.y | 0);
  R(c, 8, 8, 20, 18); R("#fc9838", 8, 24, 10, 4); R("#fc9838", 0, 2, 14, 14); R("#d82800", 0, 10, 8, 3);
  R("#fff", 5, 5, 3, 3); R("#000", 5, 6, 2, 2); R("#fff", 9, 0, 3, 3); R("#d82800", 12, 0, 6, 4);
  R("#fff", 12, 6, 3, 3); R("#fff", 18, 5, 3, 3); R("#fff", 24, 7, 3, 3);
  R("#fc9838", 6, 26, 7, 4); R("#fc9838", 20, 26, 7, 4);
  g.restore();
}
function princess(x, y) {
  R("#fcb800", x + 3, y, 10, 10); R("#fcd800", x + 4, y - 2, 8, 3); R("#fcb878", x + 5, y + 3, 6, 5);
  R("#ff6fa8", x + 2, y + 10, 12, 8); R("#ff6fa8", x, y + 18, 16, 6);
  R("#fcb878", x + 1, y + 11, 2, 4); R("#fcb878", x + 13, y + 11, 2, 4);
}
function chest(i) {
  let x = CX[i], o = co === i;
  R("#000", x - 1, GY - 25, 34, 26); R("#a84800", x, GY - 12, 32, 12); R("#fcc800", x, GY - 8, 32, 3); R("#fcc800", x + 13, GY - 12, 6, 7);
  if (o) { R("#fff6a0", x + 4, GY - 34 - Math.min(ct, 20) / 2, 24, 16); R("#a84800", x, GY - 26, 32, 4); R("#fcc800", x, GY - 24, 32, 2); }
  else { R("#a84800", x, GY - 24, 32, 12); R("#fcc800", x, GY - 21, 32, 3); R("#fcc800", x + 13, GY - 14, 6, 4); }
}

function drawStart() {
  R("#9290ff", 0, 0, W, H);
  TX(strip($("nm").value).toUpperCase().slice(0, 8) || "MARIO", 70, 18, "#fff");
  TX("8-4", 142, 28, "#fff"); TX("TIME", 176, 18, "#fff"); TX("000000", 70, 28, "#fff");
  R("#000", 78, 42, 104, 52); R("#984e00", 76, 40, 104, 52);
  TX("SUPER", 82, 64, "#000", "left", 16); TX("SUPER", 80, 62, "#ffccc5", "left", 16);
  TX("MARIO BROS.", 82, 84, "#000"); TX("MARIO BROS.", 80, 82, "#ffccc5");
  TX("FINAL CASTLE 8-4", 128, 106, "#ffccc5", "center");
  // đồi + bụi cây
  g.fillStyle = "#00a800"; g.beginPath(); g.moveTo(0, 208); g.lineTo(40, 164); g.lineTo(48, 164); g.lineTo(88, 208); g.fill();
  R("#000", 30, 186, 2, 6); R("#000", 56, 190, 2, 6);
  g.fillStyle = "#88d800"; for (let i = 0; i < 3; i++) { g.beginPath(); g.arc(196 + i * 16, 208, 12, Math.PI, 0); g.fill(); }
  // nền gạch
  for (let x = 0; x < W; x += 16) for (let y = 208; y < H; y += 16) {
    R("#c84c0c", x, y, 16, 16); R("#000", x, y, 16, 1); R("#000", x + (y % 32 ? 0 : 8), y, 1, 16); R("#fcbcb0", x, y + 1, 16, 1);
  }
  mario(36, 192, 1, 0, 1);
}
function draw() {
  g.clearRect(0, 0, W, H);
  if (S === "start") { drawStart(); return; }
  R("#000", 0, 0, W, H); brick(0, 0, W, 16);
  let chs = S === "chest";
  if (chs) {
    brick(0, GY, W, H - GY);
    TX("CHOOSE A CHEST", W / 2, 60, "#fff", "center");
    CX.forEach((x, i) => {
      chest(i);
      if (co < 0 && i === sel) {                                  // mũi tên chọn rương
        let a = Math.sin(T / 6) * 3; g.fillStyle = "#fff"; g.beginPath();
        g.moveTo(x + 10, GY - 40 + a); g.lineTo(x + 22, GY - 40 + a); g.lineTo(x + 16, GY - 32 + a); g.fill();
      }
    });
    mario(14, GY - 16, 1, 0, 1); princess(226, GY - 24);
  } else {
    for (let x = 0; x < W; x += 4) {                              // dung nham
      let h = 6 + Math.sin(T / 10 + x / 12) * 2;
      R("#f83800", x, 204 - h + 6, 4, H); R("#fc9838", x, 204 - h + 6, 4, 2);
    }
    seg.forEach((s, i) => { if (s) { R("#c84c0c", 32 + i * 16, GY, 16, 6); R("#fcbcb0", 32 + i * 16, GY, 16, 1); R("#000", 32 + i * 16, GY + 6, 16, 2); R("#000", 32 + i * 16, GY, 1, 6); } });
    brick(0, GY, 32, H - GY); brick(192, GY, 64, H - GY);
    if (!col) { R("#c84c0c", 234, GY - 12, 2, 12); R("#e0e0e0", 229, GY - 16, 7, 7); R("#888", 231, GY - 14, 4, 3); } // cái rìu
    if (b.y < H) bowser();
    fl.forEach(f => { let j = T & 4 ? 1 : 0; R("#f83800", f.x, f.y, 14, 6); R("#fcd800", f.x + 3, f.y + 2 + j, 8, 2); });
    fb.forEach(f => { R("#000", f.x - 1, f.y - 1, 6, 6); R("#fc9838", f.x, f.y, 4, 4); });
    mario(m.x, m.y, m.dir, m.vx, m.on);
    if (pr) {                                                     // lời thoại công chúa (gõ từng chữ)
      princess(230, GY - 24);
      let s = ("THANK YOU " + nm + "!   YOUR QUEST IS OVER.").slice(0, mt / 3 | 0);
      TX(s.slice(0, 13 + nm.length), W / 2, 60, "#fff", "center");
      TX(s.slice(13 + nm.length + 3), W / 2, 76, "#fff", "center");
    }
  }
  coins.forEach(c => { R("#fcd800", c.x, c.y, 4, 4); R("#fff", c.x, c.y, 1, 1); });
  // HUD
  TX(nm, 8, 30, "#fff"); TX("x" + lives, 8, 40, "#fff"); TX("WORLD 8-4", W - 8, 30, "#fff", "right");
  if (!chs) { TX("BOWSER", 120, 30, "#fff"); for (let i = 0; i < 5; i++) R(i < b.hp ? "#f83800" : "#444", 120 + i * 10, 34, 8, 5); }
  if (S === "over") {
    R("rgba(0,0,0,.7)", 0, 0, W, H);
    TX("GAME OVER", W / 2, 110, "#f83800", "center", 16);
    TX("TAP / ENTER = RETRY", W / 2, 140, "#fff", "center");
  }
}

// ====== ĐIỀU KHIỂN ======
const map = {ArrowLeft: "L", a: "L", A: "L", ArrowRight: "R", d: "R", D: "R", ArrowUp: "J", w: "J", W: "J", " ": "J", x: "F", X: "F", j: "F", J: "F", k: "F"};
addEventListener("keydown", e => {
  if (["INPUT", "SELECT"].includes(e.target.tagName)) { if (e.key === "Enter") submit(); return; }
  let k = map[e.key];
  if (k) { e.preventDefault(); K[k] = 1; if (k === "F" && !e.repeat) K.fp = 1; }
  if (e.key === "Enter") { if (S === "over") begin(); else if (S === "chest") K.ep = 1; }
  if (S === "chest") {
    if (e.key === "ArrowLeft") sel = Math.max(0, sel - 1);
    if (e.key === "ArrowRight") sel = Math.min(2, sel + 1);
    if ("123".includes(e.key)) open(+e.key - 1);
  }
});
addEventListener("keyup", e => { let k = map[e.key]; if (k) K[k] = 0; });

// Nút ảo trên điện thoại
document.querySelectorAll("#pad button").forEach(bt => {
  let k = bt.dataset.k;
  bt.addEventListener("pointerdown", e => { e.preventDefault(); K[k] = 1; if (k === "F") K.fp = 1; });
  ["pointerup", "pointerleave", "pointercancel"].forEach(ev => bt.addEventListener(ev, () => K[k] = 0));
});

// Chạm vào canvas: chơi lại (game over) hoặc chọn rương
C.addEventListener("pointerdown", e => {
  if (S === "over") { begin(); return; }
  if (S === "chest" && co < 0) {
    let r = C.getBoundingClientRect(), x = (e.clientX - r.left) / r.width * W, y = (e.clientY - r.top) / r.height * H;
    CX.forEach((cx, i) => { if (x > cx - 10 && x < cx + 42 && y > GY - 50 && y < GY + 10) open(i); });
  }
});


// ====== NHẬN DIỆN NGƯỜI CHƠI ======
let P = null; // người chơi hiện tại (một phần tử của ROSTER)
const TIP = "Gõ không dấu, không viết hoa, chỉ tên riêng hoặc đệm + tên đều được.";

const strip = s => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
const norm = s => strip(s).toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
function lev(a, b) { // khoảng cách chỉnh sửa (đếm số ký tự gõ sai)
  const d = Array.from({length: a.length + 1}, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
    d[i][j] = Math.min(d[i-1][j] + 1, d[i][j-1] + 1, d[i-1][j-1] + (a[i-1] === b[j-1] ? 0 : 1));
  return d[a.length][b.length];
}
// Điểm khớp: càng cao càng chắc chắn
function score(pt, qt) {
  const p = pt.join(" "), q = qt.join(" ");
  if (p === q) return 100;                                  // đúng họ tên đầy đủ
  if (p.endsWith(" " + q)) return 80;                       // tên riêng hoặc đệm + tên
  if ((" " + p + " ").includes(" " + q + " ")) return 60;   // cụm từ liên tiếp bất kỳ
  if (qt.every(t => pt.includes(t))) return 40;             // đủ các từ, khác thứ tự (vd: họ + tên)
  const suf = pt.slice(-qt.length).join(" ");               // gõ sai 1-2 ký tự
  if (q.length >= 3 && lev(q, suf) <= (q.length >= 8 ? 2 : 1)) return 20;
  return 0;
}
function find(list, raw) {
  const qt = norm(raw).split(" ").filter(Boolean);
  if (!qt.length) return {best: 0, list: []};
  const sc = list.map(p => ({p, s: score(p._t, qt)})).filter(x => x.s > 0);
  const best = Math.max(0, ...sc.map(x => x.s));
  return {best, list: sc.filter(x => x.s === best).map(x => x.p)};
}

ROSTER.forEach(p => p._t = norm(p.name).split(" "));
BANS.forEach(b => $("ban").add(new Option(b, b)));
$("err").textContent = TIP;
$("nm").oninput = $("ban").onchange = () => { $("err").className = ""; $("err").textContent = TIP; };

function err(t) { const e = $("err"); e.textContent = t; e.className = "bad"; }

function submit() {
  const ban = $("ban").value, raw = $("nm").value;
  if (!ban) return err("Vui lòng chọn ban trước.");
  if (!norm(raw)) return err("Vui lòng nhập tên của bạn.");
  const r = find(ROSTER.filter(p => p.ban === ban), raw);
  if (r.list.length === 1 && r.best === 100) return enter(r.list[0]);       // khớp chính xác họ tên: vào luôn
  if (r.list.length) return askPick(r.list, "Có phải bạn là…?");           // trùng tên / gõ thiếu / gần đúng
  const o = find(ROSTER, raw);                                              // không có trong ban này: thử các ban khác
  if (o.list.length) return askPick(o.list, "Không thấy trong Ban " + ban + ". Có phải bạn chọn nhầm ban?");
  err("Không tìm thấy “" + raw.trim() + "” trong Ban " + ban + ". Hãy kiểm tra lại ban và chính tả.");
}
function askPick(list, title) {
  $("pickT").textContent = title;
  const box = $("pickL"); box.innerHTML = "";
  list.slice(0, 6).forEach(p => {
    const b = document.createElement("button"), n = document.createElement("span"), s = document.createElement("small");
    n.textContent = p.name; s.textContent = "Ban " + p.ban; b.append(n, s);
    b.onclick = () => enter(p); box.append(b);
  });
  $("pick").style.display = "flex";
}
function enter(p) {
  P = p;
  nm = strip(p.name.trim().split(/\s+/).pop()).toUpperCase().slice(0, 8); // tên riêng không dấu cho HUD và lời thoại
  begin();
}
$("go").onclick = submit;
$("pickBack").onclick = () => { $("pick").style.display = "none"; $("nm").focus(); };
$("again").onclick = () => {
  $("cardModal").classList.remove("show");
  S = "start"; coins = []; P = null; $("nm").value = "";
  $("ui").style.display = "flex"; $("nm").focus();
};

// ====== THIỆP PHẦN THƯỞNG (cá nhân hóa) ======
const cardBox = document.querySelector(".card-container");
const cardCover = $("cardCover"), halfText = $("halfText"), closeBtn = $("closeBtn"), sizer = $("cardSizer");
let touchStartY = 0;

function fitCard() {
  const s = Math.min(1, (innerWidth - 24) / 380, (innerHeight - 130) / 550);
  sizer.style.width = 380 * s + "px"; sizer.style.height = 550 * s + "px";
  cardBox.style.transform = "scale(" + s + ")";
}
addEventListener("resize", fitCard);

function showReward() {                       // gọi khi rương mở xong
  $("toHalf").textContent = "Dear " + P.name + ",...";
  $("toFull").textContent = "Dear " + P.name + ",";
  $("cardMsg").textContent = P.msg || DEFAULT_MSG;
  $("cardSig").textContent = P.from || DEFAULT_FROM;
  $("cardPhoto").src = P.photo || DEFAULT_PHOTO;
  cardBox.classList.remove("state-half", "state-full");
  $("cardModal").classList.add("show");
  fitCard();
}
cardCover.addEventListener("click", () => cardBox.classList.add("state-half"));
halfText.addEventListener("click", () => cardBox.classList.add("state-full"));
cardBox.addEventListener("touchstart", e => { touchStartY = e.touches[0].clientY; });
cardBox.addEventListener("touchend", e => {
  if (cardBox.classList.contains("state-half") && !cardBox.classList.contains("state-full")
      && touchStartY - e.changedTouches[0].clientY > 40) cardBox.classList.add("state-full");
});
closeBtn.addEventListener("click", e => { e.stopPropagation(); cardBox.classList.remove("state-half", "state-full"); });

// ====== TẢI THIỆP DẠNG PNG (vẽ lại bằng canvas, 760x1100) ======
function rr(q, x, y, w, h, r) {
  q.beginPath(); q.moveTo(x + r, y); q.arcTo(x + w, y, x + w, y + h, r); q.arcTo(x + w, y + h, x, y + h, r);
  q.arcTo(x, y + h, x, y, r); q.arcTo(x, y, x + w, y, r); q.closePath();
}
function wrapText(q, t, w) {
  const out = [];
  t.split("\n").forEach(par => {
    let line = "";
    par.split(/\s+/).forEach(word => {
      const test = line ? line + " " + word : word;
      if (q.measureText(test).width > w && line) { out.push(line); line = word; } else line = test;
    });
    out.push(line);
  });
  return out;
}
function loadImg(src) { // thử có CORS trước, lỗi thì thử lại không CORS
  return new Promise(res => {
    const t = cors => {
      const i = new Image(); if (cors) i.crossOrigin = "anonymous";
      i.onload = () => res(i); i.onerror = () => cors ? t(false) : res(null); i.src = src;
    };
    t(true);
  });
}
async function downloadCard() {
  const btn = $("dlBtn"); btn.disabled = true; btn.textContent = "Đang tạo ảnh…";
  try {
    await Promise.all([document.fonts.load("700 24px Caveat"), document.fonts.load("500 18px Caveat")]);
    const img = await loadImg(P.photo || DEFAULT_PHOTO);
    const c = document.createElement("canvas"); c.width = 760; c.height = 1100;
    const q = c.getContext("2d"); q.scale(2, 2);

    rr(q, .5, .5, 379, 549, 12); q.fillStyle = "#fbf9f4"; q.fill(); q.strokeStyle = "#e3decb"; q.stroke();

    // tem ảnh góc trên bên phải, xoay 4°
    q.save(); q.translate(322.5, 67.5); q.rotate(4 * Math.PI / 180);
    q.shadowColor = "rgba(0,0,0,.12)"; q.shadowBlur = 10; q.shadowOffsetY = 4;
    q.fillStyle = "#fff"; q.fillRect(-37.5, -47.5, 75, 95);
    q.shadowColor = "transparent"; q.strokeStyle = "#e0d8c3"; q.strokeRect(-37.5, -47.5, 75, 95);
    const fx = -32.5, fy = -42.5, fw = 65, fh = 75;
    if (img) {
      const k = Math.max(fw / img.width, fh / img.height), sw = fw / k, sh = fh / k;
      q.drawImage(img, (img.width - sw) / 2, (img.height - sh) / 2, sw, sh, fx, fy, fw, fh);
    } else { q.fillStyle = "#e9e2d0"; q.fillRect(fx, fy, fw, fh); }
    q.restore();

    // chữ
    q.textBaseline = "top"; q.textAlign = "left";
    q.fillStyle = "#2c2a29"; q.font = "700 24px Caveat, cursive";
    q.fillText("Dear " + P.name + ",", 30, 130);

    const msg = P.msg || DEFAULT_MSG; let fs = 18, lines;
    for (; fs >= 12; fs--) {                 // lời chúc dài thì tự thu nhỏ chữ cho vừa thiệp
      q.font = "500 " + fs + "px Caveat, cursive"; lines = wrapText(q, msg, 320);
      if (175 + lines.length * fs * 1.6 <= 450) break;
    }
    q.fillStyle = "#4a453f";
    lines.forEach((l, i) => q.fillText(l, 30, 175 + i * fs * 1.6));

    q.fillStyle = "#b8324b"; q.font = "500 20px Caveat, cursive"; q.textAlign = "right";
    q.fillText(P.from || DEFAULT_FROM, 350, 175 + lines.length * fs * 1.6 + 25);

    const slug = strip(P.name).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    c.toBlob(b => {
      const a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = "thiep-" + slug + ".png"; a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    }, "image/png");
  } catch (e) {
    alert("Không tạo được ảnh. Hãy chạy trang qua máy chủ web/hosting (không mở trực tiếp file://) và để ảnh cùng tên miền hoặc nơi cho phép tải ảnh chéo (CORS).");
  } finally { btn.disabled = false; btn.textContent = "⬇ Tải thiệp (PNG)"; }
}
$("dlBtn").addEventListener("click", e => { e.stopPropagation(); downloadCard(); });

// ====== VÒNG LẶP GAME ======
const hints = {
  start: "Nhập tên và chọn ban của bạn rồi bấm START để nhận được phần quà bí ẩn.",
  play:  "← → di chuyển · Space/↑ nhảy · X bắn lửa (5 phát hạ Bowser) · hoặc chạy qua dưới Bowser để chạm rìu!",
  win:   "Bowser sụp đổ xuống dung nham…",
  chest: "Chọn một rương: bấm vào rương, hoặc ← → rồi Enter (phím 1/2/3).",
  over:  "Bạn đã hết mạng. Bấm Enter hoặc chạm màn hình để thử lại."
};
let ls = "";
reset(); $("ui").style.display = "flex";
let last = performance.now(), acc = 0;
(function loop(ts) {
  acc += Math.min(ts - last, 100); last = ts;
  while (acc >= 16.67) { upd(); acc -= 16.67; }      // bước cố định 60 FPS
  draw();
  if (ls !== S) { ls = S; $("hint").textContent = hints[S] || ""; }
  requestAnimationFrame(loop);
})(last);