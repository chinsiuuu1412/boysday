// ====== DANH SÁCH NGƯỜI NHẬN THIỆP ======
const BANS = ["Chuyên môn", "Tài chính", "Sự kiện", "Truyền thông"];

// Dùng khi một người không có ảnh / lời chúc / chữ ký riêng
const DEFAULT_PHOTO = "photos/default.jpg";
const DEFAULT_MSG   = "Chúc bạn một ngày tràn ngập niềm vui, luôn giữ nụ cười tươi trên môi và đạt được mọi điều tuyệt vời nhất trong hành trình sắp tới!";
const DEFAULT_FROM  = "From girls-o365 with love ❤️";

// name: viết đầy đủ, có dấu, đúng chính tả (chữ này sẽ in lên thiệp)
// photo: ảnh tỉ lệ khoảng 4:5, msg nên dưới ~250 ký tự, from: không bắt buộc
const ROSTER = [
  {ban: "Chuyên môn",   name: "Bùi Thị Thu Ngân", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300", msg: "Cảm ơn Ngân vì những đóng góp chuyên môn thật chỉn chu. Chúc bạn luôn tỏa sáng!"},
  {ban: "Chuyên môn",   name: "Lê Minh Ngân",     photo: "photos/le-minh-ngan.jpg", msg: "Chúc Ngân thật nhiều sức khỏe và niềm vui trong hành trình sắp tới!"},
  {ban: "Tài chính",    name: "Nguyễn Khánh Vi",    photo: "photos/khanh-vi.jpg",   msg: "Cảm ơn Vi đã giữ cho mọi con số luôn chính xác. Chúc bạn một năm bình an!"},
  {ban: "Sự kiện",      name: "Trần Hoàng Long",  photo: "photos/hoang-long.jpg",   msg: "Mọi sự kiện thành công đều có dấu ấn của Long. Chúc bạn luôn năng lượng!"},
  {ban: "Truyền thông", name: "Phạm Thùy Linh",   photo: "photos/thuy-linh.jpg",    msg: "Cảm ơn Linh vì những thước hình và con chữ đầy cảm hứng!", from: "Với tất cả yêu thương, eHub ❤️"}
];