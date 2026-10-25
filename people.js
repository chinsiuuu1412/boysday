// ====== DANH SÁCH NGƯỜI NHẬN THIỆP ======
const BANS = ["Chuyên môn", "Tài chính", "Sự kiện", "Truyền thông, Điều hành"];

// Dùng khi một người không có ảnh / lời chúc / chữ ký riêng
const DEFAULT_PHOTO = "photos/default.jpg";
const DEFAULT_MSG   = "Chúc bạn một ngày tràn ngập niềm vui, luôn giữ nụ cười tươi trên môi và đạt được mọi điều tuyệt vời nhất trong hành trình sắp tới!";
const DEFAULT_FROM  = "From girls-o365 with love ❤️";

// name: viết đầy đủ, có dấu, đúng chính tả (chữ này sẽ in lên thiệp)
// photo: ảnh tỉ lệ khoảng 4:5, msg nên dưới ~250 ký tự, from: không bắt buộc
const ROSTER = [
  {ban: "Điều hành", name: "Dương Đức Tùng", photo: "photos/duc-tung.jpg", msg: "Cảm ơn Tùng vì những đóng góp tuyệt vời cho o365. Chúc bạn luôn hạnh phúc và thành công!"},
  {ban: "Điều hành", name: "Hoàng Nguyễn Công Mạnh", photo: "photos/cong-manh.jpg", msg: "Cảm ơn Mạnh vì những đóng góp tuyệt vời cho o365. Chúc bạn luôn hạnh phúc và thành công!"},
  {ban: "Điều hành", name: "Khúc Thanh Bình", photo: "photos/thanh-binh.jpg", msg: "Cảm ơn Bình vì những đóng góp tuyệt vời cho o365. Chúc bạn luôn hạnh phúc và thành công!"},
  {ban: "Điều hành", name: "Lê Hải Bình", photo: "photos/hai-binh.jpg", msg: "Cảm ơn Bình vì những đóng góp tuyệt vời cho o365. Chúc bạn luôn hạnh phúc và thành công!"},
  {ban: "Điều hành", name: "Nguyễn Hoàng Hiệp", photo: "photos/hoang-hiep.jpg", msg: "Cảm ơn Hiệp vì những đóng góp tuyệt vời cho o365. Chúc bạn luôn hạnh phúc và thành công!"},
  {ban: "Điều hành", name: "Phạm Duy Minh", photo: "photos/duy-minh.jpg", msg: "Cảm ơn Minh vì những đóng góp tuyệt vời cho o365. Chúc bạn luôn hạnh phúc và thành công!"},
  {ban: "Điều hành", name: "Vũ Lê Dũng", photo: "photos/le-dung.jpg", msg: "Cảm ơn Dũng vì những đóng góp tuyệt vời cho o365. Chúc bạn luôn hạnh phúc và thành công!"},

  {ban: "Chuyên môn", name: "Nguyễn Phúc Anh", photo: "photos/phuc-anh.jpg", msg: "Cảm ơn Anh vì những đóng góp tuyệt vời cho o365. Chúc bạn luôn hạnh phúc và thành công!"},
  {ban: "Chuyên môn", name: "Bùi Huy Hoàng", photo: "photos/huy-hoang.jpg", msg: "Cảm ơn Hoàng vì những đóng góp tuyệt vời cho o365. Chúc bạn luôn hạnh phúc và thành công!"},
  {ban: "Chuyên môn", name: "Bùi Hữu Tùng", photo: "photos/huu-tung.jpg", msg: "Cảm ơn Tùng vì những đóng góp tuyệt vời cho o365. Chúc bạn luôn hạnh phúc và thành công!"},
  
  
  {ban: "Tài chính",    name: "Nguyễn Khánh Vi",    photo: "photos/khanh-vi.jpg",   msg: "Cảm ơn Vi đã giữ cho mọi con số luôn chính xác. Chúc bạn một năm bình an!"},
  {ban: "Tài chính",   name: "Lê Nguyễn Đức Long", photo: "photos/duc-long.jpg",   msg: "Cảm ơn Long vì những con số luôn chính xác và kịp thời. Chúc bạn luôn hạnh phúc và thành công!"},  
  {ban: "Tài chính",   name: "Kiều Minh Hiếu", photo: "photos/kieu-hieu.jpg",   msg: "Cảm ơn Hiếu vì những con số luôn chính xác và kịp thời. Chúc bạn luôn hạnh phúc và thành công!"}, 
  {ban: "Tài chính", name: "Nguyễn Hoàn Minh", photo: "photos/hoan-minh.jpg", msg: "Cảm ơn Minh vì những con số luôn chính xác và kịp thời. Chúc bạn luôn hạnh phúc và thành công!"},   
  {ban: "Tài chính", name: "Trịnh Gia Bảo", photo: "photos/gia-bao.jpg", msg: "Cảm ơn Bảo vì những con số luôn chính xác và kịp thời. Chúc bạn luôn hạnh phúc và thành công!"},
  {ban: "Tài chính", name: "Tưởng Hoàng Minh", photo: "photos/hoang-minh.jpg", msg: "Cảm ơn Minh vì những con số luôn chính xác và kịp thời. Chúc bạn luôn hạnh phúc và thành công!"},  
  {ban: "Tài chính", name: "Lương Thành Danh", photo: "photos/thanh-danh.jpg", msg: "Cảm ơn Danh vì những con số luôn chính xác và kịp thời. Chúc bạn luôn hạnh phúc và thành công!"},  
  {ban: "Tài chính", name: "Nguyễn Văn Hưng", photo: "photos/van-hung.jpg", msg: "Cảm ơn Hưng vì những con số luôn chính xác và kịp thời. Chúc bạn luôn hạnh phúc và thành công!"}, 
  {ban: "Tài chính", name: "Phạm Thịnh Phát", photo: "photos/thinh-phat.jpg", msg: "Cảm ơn Phát vì những con số luôn chính xác và kịp thời. Chúc bạn luôn hạnh phúc và thành công!"},   
  {ban: "Tài chính", name: "Trần Khôi Nguyên", photo: "photos/khoi-nguyen.jpg", msg: "Cảm ơn Nguyên vì những con số luôn chính xác và kịp thời. Chúc bạn luôn hạnh phúc và thành công!"},   
  {ban: "Tài chính", name: "Đỗ Hoàng Nam", photo: "photos/hoang-nam.jpg", msg: "Cảm ơn Nam vì những con số luôn chính xác và kịp thời. Chúc bạn luôn hạnh phúc và thành công!"},    
  {ban: "Tài chính", name: "Đỗ Minh Nhật", photo: "photos/minh-nhat.jpg", msg: "Cảm ơn Nhật vì những con số luôn chính xác và kịp thời. Chúc bạn luôn hạnh phúc và thành công!"},   
  {ban: "Tài chính", name: "Đỗ Quang Minh", photo: "photos/quang-minh.jpg", msg: "Cảm ơn Minh vì những con số luôn chính xác và kịp thời. Chúc bạn luôn hạnh phúc và thành công!"},

  {ban: "Sự kiện",      name: "Trần Hoàng Long",  photo: "photos/hoang-long.jpg",   msg: "Mọi sự kiện thành công đều có dấu ấn của Long. Chúc bạn luôn năng lượng!"},
  
  {ban: "Truyền thông", name: "Phạm Thùy Linh",   photo: "photos/thuy-linh.jpg",    msg: "Cảm ơn Linh vì những thước hình và con chữ đầy cảm hứng!", from: "Với tất cả yêu thương, eHub ❤️"}
];