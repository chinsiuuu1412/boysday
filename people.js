// ====== DANH SÁCH NGƯỜI NHẬN THIỆP ======
const BANS = ["Điều hành", "Chuyên môn", "Tài chính", "Sự kiện", "Truyền thông"];

// Dùng khi một người không có ảnh / lời chúc / chữ ký riêng
const DEFAULT_PHOTO = "photos/default.jpg";
const DEFAULT_MSG   = "Chúc bạn một ngày tràn ngập niềm vui, luôn giữ nụ cười tươi trên môi và đạt được mọi điều tuyệt vời nhất trong hành trình sắp tới!";
const DEFAULT_FROM  = "From girls-o365 HUST with love ❤️";

// name: viết đầy đủ, có dấu, đúng chính tả (chữ này sẽ in lên thiệp)
// photo: ảnh tỉ lệ khoảng 4:5, msg nên dưới ~250 ký tự, from: không bắt buộc
const ROSTER = [
  {ban: "Điều hành", name: "Dương Đức Tùng", token: "abc123", photo: "photo/ductung.jpg", // đã check
  msg: "Nhân ngày Quốc tế Nam giới 19/11, gửi tới cậu lời chúc bình an, sức khỏe và thật nhiều may mắn. Sự điềm đạm và chân thành của cậu luôn khiến mọi người xung quanh cảm thấy rất dễ chịu. Chúc cậu công việc hanh thông, cuộc sống nhẹ nhàng êm ả và mỗi ngày trôi qua đều thật ý nghĩa!"},
  {ban: "Điều hành", name: "Hoàng Nguyễn Công Mạnh", token: "def456", photo: "photo/congmanh.jpg", //đã check
  msg: "Chúc mừng ngày 19/11! Chúc bạn có một ngày lễ thật nhẹ nhàng, bình yên và ngập tràn năng lượng tích cực. Mong bạn luôn giữ được sự chân thành, tử tế và nhiệt huyết trong mọi hành trình sắp tới. Chúc công việc của bạn ngày càng thuận lợi, cuộc sống êm đềm và mọi ước mơ sớm thành hiện thực!"},
  {ban: "Điều hành", name: "Khúc Thanh Bình", token: "ghi789", photo: "photo/thanhbinh.jpg", // đã check
  msg: "print(\"こんにちわ，Khúc Bình 先輩\") Chúc sốp Khúc Bình mãi khỏe, mãi trẻ, mãi đẹp. Đùa chứ chúc sốp vạn sự như ý, học tập mãi đỉnh, dẫn dắt đàn con thơ Kỹ thuật lên tầm cao mới của code nhé!"},
  {ban: "Điều hành", name: "Lê Hải Bình", token: "jkl012", photo: "photo/haibinh.jpg", //đã check
  msg: "Happy Men's Day 19/11! Chúc bạn mỗi ngày thức dậy đều tràn ngập hứng khởi, làm việc hiệu quả và tận hưởng trọn vẹn từng khoảnh khắc của cuộc sống. Mong mọi điều tốt đẹp, bình an và may mắn nhất sẽ luôn đồng hành cùng bạn. Chúc bạn một ngày lễ thật rộn ràng và nhiều niềm vui!"},
  {ban: "Điều hành", name: "Nguyễn Hoàng Hiệp", token: "mno345", photo: "photo/hoanghiep.jpg", //đã check
  msg: "Ngày 19/11 chúc bạn thật nhiều sức khỏe, niềm vui và sự cân bằng trong cuộc sống. Mong công việc của bạn luôn trôi chảy, xung quanh toàn người dễ mến và mọi áp lực đều hóa nhẹ nhàng. Chúc bạn có một ngày lễ thật đáng nhớ bên bạn bè, người thân và luôn giữ vững nụ cười tươi tắn trên môi!"},
  {ban: "Điều hành", name: "Phạm Duy Minh", token: "pqr678", photo: "photo/duyminh.jpg", // đã check
  msg: "Chúc mừng ngày 19/11 của phái mạnh! Cảm ơn cậu vì sự hỗ trợ nhiệt tình và tinh thần trách nhiệm cao trong suốt thời gian qua. Chúc cậu luôn giữ được ngọn lửa đam mê, sức khỏe dồi dào, cuộc sống cân bằng và luôn có thật nhiều khoảnh khắc vui vẻ, đáng nhớ bên bạn bè, gia đình!"},
  {ban: "Điều hành", name: "Vũ Lê Dũng", token: "stu901", photo: "photo/ledung.jpg", //đã check
  msg: "Chúc mừng ngày Quốc tế Nam giới 19/11 của bạn! Chúc bạn sức khỏe bền bỉ, tinh thần minh mẫn để giải quyết gọn gàng mọi mục tiêu đã đặt ra. Mong rằng thần may mắn sẽ luôn mỉm cười với bạn trên mọi chặng đường, làm việc gì cũng thuận lợi và gặt hái thật nhiều thành quả xứng đáng!"},

  {ban: "Chuyên môn", name: "Nguyễn Phúc Anh", token: "vwx234", photo: "photo/phucanh.jpg", //đã check
  msg: "Nhân dịp Quốc tế Nam giới 19/11, chúc cậu có một ngày thật vui vẻ và đáng nhớ. Mong rằng tuổi trẻ của tụi mình sẽ luôn rực rỡ, cậu làm gì cũng thuận buồm xuôi gió, gặp nhiều quý nhân phù trợ. Chúc cậu sức khỏe dồi dào, tâm trí thảnh thơi và sớm đạt được những cột mốc mới!"},
  {ban: "Chuyên môn", name: "Bùi Hữu Tùng", token: "yza567", photo: "photo/Bùi Hữu Tùng.jpg", //done
  msg: "Chúc bạn iu học hành tấn tới, sớm tìm được hướng đi phù hợp, đạt được nhiều thành công trong học tập"},
  {ban: "Chuyên môn", name: "Lã Huy Gia Huy", token: "bcd890", photo: "photo/Lã Huy Gia Huy.jpg", //done
  msg: "Chúc Gia Huy lúc nào cũng rạng rỡ, học hành bách phát bách trúng và gặp nhiều may mắn. Rất cảm ơn cậu vì đã luôn đồng hành và đóng góp cho CLB!"},
  {ban: "Chuyên môn", name: "Lê Nguyễn Thái Sơn", token: "efg123", photo: "photo/Lê Nguyễn Thái Sơn.jpg", //done
  msg: "Chúc bạn Sơn yêu HUST, có nhiều dự án bùng lổ và hạnh phúc với người yêu nhé. Mong bạn sẽ truyền khả năng có người yêu sau khóa KNM tới các bạn khác để ai cũng được ấm áp ngày đông."},
  {ban: "Chuyên môn", name: "Lê Trần Hoàng Lân", token: "hij456", photo: "photo/Lê Trần Hoàng Lân.jpg", //done
  msg: "Chào bạn Lân - một chàng trai có rất nhiều dự án đặc biệt cho ban Chuyên môn. Cảm ơn bạn vì những đóng góp đặc sắc cho CLB, giúp cho anh em cảm thấy dễ dàng hơn trong việc quản lý và XDKHHT. Chúc bạn luôn mạnh khỏe và không phải lo lắng nhiều về code nữa nha."},
  {ban: "Chuyên môn", name: "Lưu Gia Bình", token: "klm789", photo: "photo/Lưu Gia Bình.jpg", //done
  msg: "Chúc bạn iu vui vẻ hạnh phúc bình an, giữ sức khỏe thể chất và tinh thần lành mạnh, sớm ngày lên làm chủ nhiệm CLB"},
  {ban: "Chuyên môn", name: "Lương Anh Khoa", token: "nop012", photo: "photo/Lương Anh Khoa.jpg", //done
  msg: "Chúc Anh Khoa luôn phong độ ngời ngời, tự tin tỏa sáng và học thật giỏi nhé! Cảm ơn cậu vì những đóng góp tuyệt vời của cậu cho CLB o365 trong thời gian qua."},
  {ban: "Chuyên môn", name: "Nguyễn Thành Long", token: "tuv678", photo: "photo/Nguyễn Thành Long.jpg", //done
  msg: "Chúc Hachimi bá khí của anh Khúc Bình không khá bí khi code, kiếm được nhiều tiền mua tai nghe với máy tính bảng. Cảm ơn Hachimi đã cùng anh em kỹ thuật hỗ trợ code các dự án cho CLB nha."},
  {ban: "Chuyên môn", name: "Nguyễn Vũ Khôi Nguyên", token: "wxy901", photo: "photo/Nguyễn Vũ Khôi Nguyên.jpg", //done
  msg: "Chúc bạn iu thật nhiều sức khỏe, luôn lạc quan và tràn đầy tự tin. Những món quà của chúng mình tuy nhiều nhưng cũng chan chứa nhiều tấm lòng không kém, mong bạn sẽ thíchhhhh"},
  {ban: "Chuyên môn", name: "Ngô Sỹ Thống", token: "zab234", photo: "photo/Ngô Sỹ Thống.jpg", //đổi ảnh
  msg: "Bạn Thống đẹp zai 19-11 thật vui vẻ, múa Flo không hụt hoa, đánh cầu đã hay thì hay hơn nữa nhá."},
  {ban: "Chuyên môn", name: "Trần Tuấn Minh", token: "cde567", photo: "photo/Trần Tuấn Minh.jpg", //done
  msg: "Chúc Tuấn Minh 19/11 vui vẻ! Chúc bạn luôn vững bước trên hành trình của mình. Cảm ơn Minh đã đóng góp cho CLB suốt năm vừa qua."},
  {ban: "Chuyên môn", name: "Trần Văn Đạt", token: "fgh890", photo: "photo/Trần Văn Đạt.jpg", //done
  msg: "Chúc Đạt luôn tràn đầy năng lượng tích cực, tự tin trong mọi việc và đạt thật nhiều điểm cao tại HUST. Cảm ơn những đóng góp hết mình của cậu cho đại gia đình o365 trong thời gian vừa qua!"},
  {ban: "Chuyên môn", name: "Vũ Đặng Minh", token: "ijk123", photo: "photo/Vũ Đặng Minh.jpg", //done
  msg: "Chúc bạn iu thật nhiều sức khỏe, đạt được nhiều mục tiêu trong cuộc sống. Nhân ngày Quốc tế Nam giới, phái nữ CLB o365 - HUST xin được gửi lời cảm ơn sâu sắc cho những cống hiến của bạn dành cho CLB"},
  {ban: "Chuyên môn", name: "Đặng Trọng Phúc", token: "lmn456", photo: "photo/Đặng Trọng Phúc.jpg", //done
  msg: "Chúc Trọng Phúc luôn vui vẻ, tự tin, thành công trên con đường mình chọn và lúc nào cũng tràn đầy năng lượng tích cực nhé!"},
  {ban: "Chuyên môn", name: "Đỗ An Khang", token: "opq789", photo: "photo/Đỗ An Khang.jpg", //done
  msg: "Chúc bạn iu thật nhiều sức khỏe và niềm vui, mong rằng những món quà của nhiều lòng nhiều đến từ phái nữ CLB o365 - HUST sẽ là một phần kỷ niệm đẹp trong những năm trên giảng đường Đại học của bạn"},
  {ban: "Chuyên môn", name: "Lê Đình Phúc", token: "rst012", photo: "photo/Lê Đình Phúc.jpg", //done
  msg: "Nhân ngày 19/11, chúng tớ chúc Đình Phúc luôn lạc quan, mạnh mẽ và tràn đầy nhiệt huyết ❤️ Cảm ơn những đóng góp của cậu dành cho CLB. Chúc cậu gặt hái thật nhiều thành công trong học tập và luôn đồng hành cùng o365 nhé !!"},
  {ban: "Chuyên môn", name: "Nguyễn Anh Tuấn", token: "uvw345", photo: "photo/Nguyễn Anh Tuấn.jpg", //done
  msg: "Nhân ngày 19/11, chúng tớ chúc Anh Tuấn luôn vui vẻ, tự tin và tràn đầy nhiệt huyết ❤️ Cảm ơn sự hỗ trợ nhiệt tình của cậu dành cho CLB. Chúc cậu học đâu thắng đó và luôn là mảnh ghép rạng rỡ của o365 nhé !!"},
  {ban: "Chuyên môn", name: "Nguyễn Hữu Trường An", token: "xyz678", photo: "photo/Nguyễn Hữu Trường An.jpg", //done
  msg: "Nhân ngày 19/11, chúng tớ chúc Trường An luôn vững vàng, bình an và tràn đầy nhiệt huyết ❤️ Cảm ơn những đóng góp của cậu dành cho CLB. Chúc cậu vượt qua mọi kỳ thi xuất sắc và luôn tỏa sáng cùng o365 nhé !!"},
  {ban: "Chuyên môn", name: "Nguyễn Minh Đức", token: "abc901", photo: "photo/Nguyễn Minh Đức.jpg", //done
  msg: "Nhân ngày 19/11, tớ chúc Đức luôn tự tin, bản lĩnh và đạt thật nhiều thành công trên hành trình phía trước. Cảm ơn những đóng góp của cậu cho CLB trong thời gian vừa qua nhé!"},
  {ban: "Chuyên môn", name: "Nguyễn Văn Hùng", token: "def234", photo: "photo/Nguyễn Văn Hùng.jpg", //done
  msg: "Nhân ngày 19/11, chúng tớ chúc Văn Hùng luôn mạnh khỏe, kiên định và giữ mãi nhiệt huyết ❤️ Cảm ơn sự nỗ lực hết mình của cậu dành cho CLB. Chúc cậu chinh phục thật nhiều học bổng và luôn là niềm tự hào của o365 nhé !!"},
  {ban: "Chuyên môn", name: "Phạm Quang Minh", token: "ghi567", photo: "photo/Phạm Quang Minh.jpg", //done
  msg: "Nhân ngày 19/11, chúng tớ chúc Quang Minh luôn vui vẻ, phong độ và tràn đầy nhiệt huyết ❤️ Cảm ơn sự đồng hành nhiệt tình của cậu dành cho CLB. Chúc cậu bứt phá mọi giới hạn học tập và luôn tỏa sáng cùng o365!!"},
  {ban: "Chuyên môn", name: "Trần Hữu Đăng Trường", token: "jkl890", photo:"photo/Trần Hữu Đăng Trường.jpg", //done
  msg: "Nhân ngày 19/11, chúng tớ chúc Đăng Trường luôn mạnh mẽ, quyết đoán và tràn đầy nhiệt huyết ❤️ Cảm ơn tinh thần trách nhiệm của cậu dành cho CLB. Chúc cậu gặt hái thật nhiều điểm cao và luôn là mảnh ghép vững vàng của o365!!"},
  {ban: "Chuyên môn", name: "Nguyễn Ánh Ngọc", token: "5m8yfyg8", photo: "photo/anhngoc.jpg",
  msg: "Ánh Ngọc quá xinh zai và đẳng cấp, quá bá khí, ít khi nào thấy khá bí, vẫn luôn là một ngôi sao, chỉ là ngôi sao này hơi đơn côi ;(("},
  {ban: "Chuyên môn", name: "Mông Duy Khánh", token: "xqcpzpzv" , photo: "photo/Mông Duy Khánh.jpg", //done
  msg: "Phái nữ CLB o365 - HUST chúc Khánh ngày Quốc tế Nam giới thật nhiều niềm vui và kỷ niệm đáng nhớ. Cảm ơn Khánh vì đã cống hiến hết mình cho CLB xuyên suốt 2 nhiệm kỳ vừa qua"},
  {ban: "Chuyên môn", name: "Đỗ Minh Quang", token: "9r0s1t2u", photo: "photo/Đỗ Minh Quang.jpg", //done
  msg: "Nhân ngày 19/11, chúng tớ chúc Minh Quang luôn bản lĩnh, tỏa sáng và giữ vững nhiệt huyết ❤️ Cảm ơn sự cống hiến của cậu dành cho CLB. Chúc cậu đạt mọi mục tiêu trên giảng đường và luôn là mảnh ghép tuyệt vời của o365 !!"},
  {ban: "Chuyên môn", name: "Trần Văn Giáp", token: "0v1w2x3y", photo: "photo/Trần Văn Giáp.jpg", //done
  msg: "Nhân ngày 19/11, chúng tớ chúc Văn Giáp luôn mạnh mẽ, bản lĩnh và tràn đầy nhiệt huyết ❤️ Cảm ơn sự đóng góp tích cực của cậu dành cho CLB. Chúc cậu gặt hái thật nhiều điểm A+ trên giảng đường và luôn là mảnh ghép tuyệt vời của o365 nhé !"},
  {ban: "Chuyên môn", name: "Ngô Ánh Dương", token: "", photo: "photo/Ngô Ánh Dương.jpg", msg: "Hello"},

  {ban: "Tài chính", name: "Lê Nguyễn Đức Long", token: "v4ppkzwu", photo: "photo/duclong.jpg", //done
  msg: "Chúc mừng ngày Quốc tế Nam giới 19/11! Chúc cậu luôn giữ được tinh thần tự do, phóng khoáng và trái tim nhiệt huyết trên mọi hành trình sắp tới. Mong cậu đi đến đâu cũng gặp điều lành, làm việc gì cũng đạt kết quả mỹ mãn, túi tiền luôn rủng rỉnh để thoải mái khám phá những điều mới mẻ!"},  
  {ban: "Tài chính", name: "Kiều Minh Hiếu", token: "t5khw878", photo: "photo/Kiều Minh Hiếu.jpg", //done
  msg: "Chúc bạn Hiếu luôn giữ được sự nhiệt huyết, bản lĩnh và tinh thần lạc quan, mọi dự định đều thuận lợi, mọi cố gắng đều được đền đáp và mỗi ngày đều có thật nhiều niềm vui nhé!"}, 
  {ban: "Tài chính", name: "Nguyễn Hoàng Minh", token: "vtuzsn37", photo: "photo/Nguyễn Hoàng Minh.jpg", //done
  msg: "Chúc bạn nhiều tiền như cầm Luyện kim, bền bỉ như cầm Mộc giáp, hay được đi đây đó như Rouie, lúc nào cũng bá khí như Evita nhé. Mong bạn sẽ duy trì (và phát triển) khả năng đóng góp cho CLB."},   
  {ban: "Tài chính", name: "Trịnh Gia Bảo", token: "swhmgrtj", photo: "photo/Trịnh Gia Bảo.jpg", //done
  msg: "Chúc mừng ngày 19/11 của phái mạnh! Chúc bạn ngày càng đẹp trai, phong độ, công việc suôn sẻ và sớm chốt đơn được những dự án lớn. Dù bận rộn đến đâu cũng nhớ dành thời gian nghỉ ngơi, ăn ngon ngủ kỹ để luôn giữ vững phong độ đỉnh cao trên mọi mặt trận mỗi ngày nhé!"},
  {ban: "Tài chính", name: "Tưởng Hoàng Minh", token: "p6wvy5u5", photo: "photo/Tưởng Hoàng Minh.jpg", //done
  msg: "Chúc bạn iu iu cột sống khỏe, tiếp tục là cá thể pi xi ti ơ bá khí nhất Phồn Lan, chúc doituyentoiyeu của bạn iu giữ vững phong độ, đẳng cấp là mãi mãi 🤞"},  
  {ban: "Tài chính", name: "Lương Thành Danh", token: "jdjgt9m9", photo: "photo/Lương Thành Danh.jpg", //done
  msg: "Chúc chàng trai o365 luôn khỏe khoắn, ngoại hình lúc nào cũng tươi tắn, thi cử điểm cao chắc chắn và gặp thật nhiều điều may mắn mỗi ngày nhé!"},  
  {ban: "Tài chính", name: "Nguyễn Văn Hưng", token: "9xt29agp", photo: "photo/Nguyễn Văn Hưng.jpg", //done
  msg: "Mừng ngày phái mạnh lên ngôi, chúc cậu bảnh bao gấp bội, học tập thăng hoa vượt trội và niềm vui lúc nào cũng sôi nổi quanh năm!"}, 
  {ban: "Tài chính", name: "Phạm Thịnh Phát", token: "aykapjd8", photo: "photo/Phạm Thịnh Phát.jpg", //done
  msg: "Nhân ngày 19/11, chúng tớ chúc Thịnh Phát luôn phong độ, tự tin và tràn đầy năng lượng ❤️ Cảm ơn sự tận tâm và những đóng góp của cậu dành cho CLB. Chúc cậu gặt hái thật nhiều điểm cao trên giảng đường và luôn là điểm tựa vững chắc của o365 nhé !"},   
  {ban: "Tài chính", name: "Trần Khôi Nguyên", token: "u5n248ma", photo: "photo/Trần Khôi Nguyên.jpg", //done
  msg: "Nhân dịp 19/11, chúc cậu luôn giữ chất riêng cực ngầu, công việc hanh thông từ đầu, mọi nỗi lo đều tan biến mau và hạnh phúc luôn theo bước sau!"},   
  {ban: "Tài chính", name: "Đỗ Hoàng Nam", token: "bbsh2f6y", photo: "photo/Đỗ Hoàng Nam.jpg", //done
  msg: "Nhân ngày 19/11, chúng tớ chúc Hoàng Nam luôn vui vẻ, tự tin và và luôn giữ vững nhiệt huyết ❤️ Cảm ơn sự đồng hành tích cực của cậu dành cho CLB. Chúc cậu bứt phá mọi mục tiêu học tập và luôn là mảnh ghép đáng quý của o365 nhé !"},    
  {ban: "Tài chính", name: "Đỗ Minh Nhật", token: "jce4e4zc", photo: "photo/Đỗ Minh Nhật.jpg", //done
  msg: "Nhân ngày 19/11, chúc cậu tinh thần luôn phơi phới, sức khỏe dẻo dai chẳng vơi, mọi dự định đều thành công tới nơi và hạnh phúc ngập tràn mọi nơi nhé!"},   
  {ban: "Tài chính", name: "Đỗ Quang Minh", token: "vnm65bqr", photo:"photo/Đỗ Quang Minh.jpg", //done
  msg: "Gửi lời chúc 19/11 tới cậu: Chúc phong độ luôn dẫn đầu, nhiệt huyết chẳng bao giờ phai màu, làm đâu thắng đó cực ngầu và nụ cười luôn nở trên môi mau!"},
  {ban: "Tài chính", name: "Nguyễn Minh Hiếu", token: "3g7j4k5l", photo: "photo/Nguyễn Minh Hiếu.jpg", //done
  msg: "Chào Phó ban Tài chính tương lai (gần, chắc sau kiện toàn). Chúc bạn luôn mạnh khỏe, code của bạn toàn bá khí chứ không bị khá bí, luôn tìm được các deal giá hời cho clb (phải chất lượng nhé)."},

  {ban: "Sự kiện", name: "Phạm Trần Thành Công", token: "xyz012", photo: "photo/thanhcong.jpg", //done
  msg: "Ngày Quốc tế Nam giới 19/11, chúc bạn luôn tìm thấy niềm vui trong những điều giản dị nhất mỗi ngày. Mong bạn đủ bản lĩnh để vượt qua mọi thử thách, đủ lạc quan để đón nhận những cơ hội mới và luôn có những người bạn tốt ở bên cạnh chia sẻ. Chúc bạn một ngày thật trọn vẹn!"},
  {ban: "Sự kiện", name: "Lê Ngọc Minh", token: "abc345", photo: "photo/Lê Ngọc Minh.jpg", //done
  msg: "Chúc Minh một ngày Quốc tế Nam giới thật nhiều niềm vui! Mong cậu sẽ luôn giữ được sự nhiệt huyết, lạc quan và tinh thần hết mình trong mọi việc. Chúc cậu ngày càng thành công và có thật nhiều kỷ niệm đẹp cùng O365 nhé!"},
  {ban: "Sự kiện", name: "Nguyễn Hoàng Quân", token: "def678", photo: "photo/Nguyễn Hoàng Quân.jpg", //done
  msg: "Chúc Hoàng Quân - một mảnh ghép không thể thiếu của ban Sự Kiện o365 dịp lễ này thật vui vẻ, tích cực, đạt A+ tất cả mônnn!!"},
  {ban: "Sự kiện", name: "Nguyễn Hoàng Tùng", token: "ghi901", photo: "photo/Nguyễn Hoàng Tùng.jpg", //done
  msg: "Mừng ngày 19/11, chúc cậu phong độ luôn vượt trội, học hành tấn tới, tiền bạc phơi phới và lúc nào cũng rạng rỡ nụ cười tươi nhé!"},
  {ban: "Sự kiện", name: "Nguyễn Quốc Đạt", token: "mno567", photo: "photo/Nguyễn Quốc Đạt.jpg", //done
  msg: "Nhân ngày đặc biệt này, chúc Quốc Đạt luôn vui vẻ, may mắn và thành công trên con đường mình đã chọn. Mong cậu sẽ luôn giữ được nhiệt huyết, không ngừng tiến bộ và có thật nhiều khoảnh khắc đáng nhớ cùng các thành viên O365 nhé!"},
  {ban: "Sự kiện", name: "Nguyễn Trí Hùng", token: "pqr890", photo: "photo/Nguyễn Trí Hùng.jpg", //done
  msg: "Gửi Hùng một lời chúc thật nhiều niềm vui nhân ngày 19/11! Chúc cậu luôn mạnh khỏe, tự tin, gặp nhiều thuận lợi trong học tập cũng như cuộc sống. Hy vọng mỗi ngày trôi qua đều mang đến cho cậu thêm nhiều trải nghiệm thú vị!"},
  {ban: "Sự kiện", name: "Nguyễn Việt Dũng", token: "stu123", photo: "photo/Nguyễn Việt Dũng.jpg", //done
  msg: "Chúc Dũng một ngày 19/11 thật vui và trọn vẹn! Chúc cậu luôn khỏe mạnh, lạc quan, học tập thật tốt và gặp được nhiều cơ hội tuyệt vời. Mong rằng những nỗ lực của cậu sẽ luôn được đền đáp bằng những kết quả xứng đáng!"},
  {ban: "Sự kiện", name: "Nguyễn Đình Toàn", token: "vwx456", photo: "photo/Nguyễn Đình Toàn.jpg", //done
  msg: "Happy Men's Day! Chúc Toàn luôn mạnh mẽ, bản lĩnh, học giỏi và gặp nhiều may mắn trên hành trình phía trước. Mong mọi dự định của cậu đều diễn ra thật suôn sẻ và lúc nào cũng có những người bạn tuyệt vời đồng hành!"},
  {ban: "Sự kiện", name: "Phạm Tuấn Anh", token: "v9n9fdw8", photo: "photo/Phạm Tuấn Anh.jpg", //done
  msg: "Happy Men's Day! Chúc Tuấn Anh luôn giữ vững sự tự tin, bản lĩnh và tinh thần lạc quan nhé. Chúc cậu học tập thuận lợi, công việc trong CLB suôn sẻ và có thật nhiều niềm vui trong hành trình thanh xuân của mình!"},
  {ban: "Sự kiện", name: "Nguyễn Đức Thịnh", token: "yza789", photo: "photo/Nguyễn Đức Thịnh.jpg", //done
  msg: "Nhân dịp 19/11, chúc Thịnh luôn vui vẻ, khỏe mạnh và tràn đầy năng lượng nhé! Chúc cậu không chỉ học tập tốt mà còn có thật nhiều cơ hội để phát triển bản thân, thử sức với những điều mới mẻ và đạt được những thành công đáng tự hào."},
  {ban: "Sự kiện", name: "Phan Lê Tiến Thành", token: "bcd012", photo: "photo/Phan Lê Tiến Thành.jpg", //done
  msg: "Chúc Thành luôn vui vẻ, hạnh phúc, tự tin, lạc quan, may mắn. Cảm ơn Thành vì những cống hiến của bạn cho CLB trong thời gian vừa qua."},
  {ban: "Sự kiện", name: "Phạm Hữu Anh", token: "efg345", photo: "photo/Phạm Hữu Anh.jpg", //done
  msg: "Nhân ngày 19/11, chúc Hữu Anh luôn mạnh khỏe, vui vẻ và giữ được thật nhiều năng lượng tích cực nhé! Chúc cậu học tập thuận lợi, sớm đạt được những mục tiêu mình đặt ra và luôn gặp những điều tốt đẹp."},
  {ban: "Sự kiện", name: "Phạm Tiến Đạt", token: "hij678", photo:"photo/Phạm Tiến Đạt.jpg", //done
  msg: "Chúc Đạt có một ngày 19/11 thật ý nghĩa! Mong cậu luôn giữ được sự nhiệt tình, tinh thần tích cực và phong độ của mình. Chúc cậu sớm chinh phục được những mục tiêu phía trước và có một năm học thật rực rỡ nhé!"},
  {ban: "Sự kiện", name: "Trần Hải Lâm", token: "psyyetvf", photo: "photo/Trần Hải Lâm.jpg", //done
    msg: "Chúc Lâm thật nhiều sức khỏe và niềm vui. Mong rằng Lâm sẽ có nhiều kỷ niệm đẹp cùng CLB o365 - HUST và tận hưởng những năm ngồi trên giảng đường Đại học của mình!"},
  {ban: "Sự kiện", name: "Vũ Tiến Đại", token: "klm012", photo: "photo/Vũ Tiến Đại.jpg", //done
  msg: "Chúc Tiến Đại luôn giữ vững phong độ, sự tự tin và có một năm học thật bùng nổ. Cảm ơn cậu đã vất vả và đóng góp rất nhiều cho CLB thời gian qua nhé!"},
  {ban: "Sự kiện", name: "Đoàn Đại Phong", token: "nop345", photo: "photo/Đoàn Đại Phong.jpg", //done
  msg: "Chúc Đại Phong mãi đẹp trai, luôn học giỏi và luôn vui vẻ mỗi ngày. Cảm ơn cậu vì đã dành nhiều tâm huyết và sự đóng góp cho o365!"},
  {ban: "Sự kiện", name: "Chu Gia Long", token: "qrs678", photo: "photo/Chu Gia Long.jpg", //done
  msg: "Nhân ngày 19/11, tớ chúc Long luôn vui vẻ, tự tin, bản lĩnh và đạt được nhiều thành tích trên hành trình phía trước. Cảm ơn những đóng góp của cậu cho CLB trong thời gian vừa qua nhé!"},
  {ban: "Sự kiện", name: "Nguyễn Hoàng Hải", token: "tuv901", photo: "photo/Nguyễn Hoàng Hải.jpg", //done
  msg: "Tớ chúc Hải ngày 19/11 vui vẻ nha. Mong Hải luôn bản lĩnh, tự tin và vững bước trên con đường mình chọn. Cảm ơn những đóng góp không ngừng nghỉ của cậu cho CLB trong thời gian vừa qua!"},
  {ban: "Sự kiện", name: "Nguyễn Ngọc Bảo", token: "wxy234", photo: "photo/Nguyễn Ngọc Bảo.jpg", //done
  msg: "Hilo Ngọc Bảo - người bạn cùng ban tớ rất iu quý, mong rằng ngày lễ toilet à ko quốc tế nam giới đầu tiên tại dhbk với cậu sẽ thật vui và ý nghĩaaa nhâ. Với tớ cậu luôn là một tấm gương sáng không ngừng cống hiến hết mình cho clb, là người bản lĩnh, kiên trì, tốt bụng và cũng là người con trai nhảy đẹp, nhảy giỏi nhất tớ từng gặpp=))))) Mong rằng trên hành trình sắp tới cậu vẫn giữ được tinh thần nhiệt huyết như hiện tại, chắc chắn những điều tốt nhất cậu đều xứng đáng được nhậnnn. Tớ muốn gửi thật nhiều lời cảm ơn đếnn Bảo, best wishes!!!!"},
  {ban: "Sự kiện", name: "Nguyễn Tuấn Minh", token: "zab567", photo: "photo/Nguyễn Tuấn Minh.jpg", //done
  msg: "Tớ chúc Minh ngày 19/11 vui vẻ nha. Mong Minh luôn bản lĩnh, tự tin trên con đường mình chọn. Cảm ơn những đóng góp không ngừng của cậu cho CLB trong thời gian vừa qua!"},
  {ban: "Sự kiện", name: "Nguyễn Việt Hoàng", token: "cde890", photo: "photo/Nguyễn Việt Hoàng.jpg", //done
  msg: "Tớ chúc Hoàng ngày 19/11 vui vẻ nha. Chúc Thiện luôn tự tin tiến bước trên hành trình của riêng mình. Cảm ơn những đóng góp không ngừng của cậu cho CLB trong thời gian vừa qua!"},
  {ban: "Sự kiện", name: "Phạm Hồng Huy", token: "fgh123", photo: "photo/Phạm Hồng Huy.jpg", //done
  msg: "Nhân ngày 19/11, tớ chúc Huy luôn tự tin, bản lĩnh và đạt thật nhiều thành tích trên hành trình phía trước. Cảm ơn những đóng góp của cậu cho CLB trong thời gian vừa qua nhé!"},
  {ban: "Sự kiện", name: "Trần Quý Thiện", token: "ijk456", photo: "photo/Trần Quý Thiện.jpg", //done
  msg: "Tớ chúc Thiện ngày 19/11 vui vẻ nha. Chúc Thiện luôn tự tin vững bước trên con đường mình chọn. Cảm ơn những đóng góp không ngừng của cậu cho CLB trong thời gian vừa qua!"},
  {ban: "Sự kiện", name: "Văn Tiến Tuyển", token: "lmn789", photo: "photo/Văn Tiến Tuyển.jpg", //done
  msg: "Nhân ngày 19/11, tớ chúc Tuyển luôn bản lĩnh, tự tin và đạt thật nhiều điểm A+ trên hành trình phía trước. Cảm ơn những đóng góp của cậu cho CLB trong thời gian vừa qua nhé!"},
  {ban: "Sự kiện", name: "Đặng Hào Phát", token: "opq012", photo: "photo/Đặng Hào Phát.jpg", //done
  msg: "Nhân ngày 19/11, tớ chúc Phát luôn vui vẻ, tự tin, bản lĩnh và đạt được nhiều thành tích trên hành trình phía trước. Cảm ơn những đóng góp của cậu cho CLB trong thời gian vừa qua nhé!"},
  {ban: "Sự kiện", name: "Bùi Thị Thu Ngân", token: "", photo: "photo/Bùi Thị Thu Ngân.jpg", msg: "Hello"},

  {ban: "Truyền thông", name: "Dương Minh Nhật", token: "uvw678", photo: "photo/Dương Minh Nhật.jpg", //done
  msg: "19/11, chúc Minh Nhật luôn mạnh mẽ, bản lĩnh và đạt được những điều mình mong muốn."},
  {ban: "Truyền thông", name: "Hàn Nguyễn Khôi Nguyên", token: "xyz901", photo: "photo/Hàn Nguyễn Khôi Nguyên.jpg", //done
  msg: "Chúc Khôi Nguyên luôn ngập tràn năng lượng, tự tin khoe cá tính và học hành thật suôn sẻ. Cảm ơn cậu đã luôn sát cánh và cống hiến cho CLB!"},
  {ban: "Truyền thông", name: "Nguyễn Doãn Hoàng An", token: "q68dkse5", photo: "photo/Nguyễn Doãn Hoàng An.jpg", //done
  msg: "Chúc Hoàng An luôn nhiều sức khỏe, phong độ ngút ngàn và giật toàn điểm A+ nhé. Cảm ơn những đóng góp nhiệt tình không ngừng nghỉ của cậu cho o365!"},
  {ban: "Truyền thông", name: "Nguyễn Nhật Huy", token: "fze29fbb", photo: "photo/Nguyễn Nhật Huy.jpg", //done
  msg: "Chúc Nhật Huy lúc nào cũng vui vẻ, học giỏi và thuận lợi trong mọi việc. Cảm ơn cậu rất nhiều vì những đóng góp đáng quý cho sự phát triển của o365!"},
  {ban: "Truyền thông", name: "Nguyễn Đức Hùng", token: "zg8rvr9b", photo: "photo/Nguyễn Đức Hùng.jpg", //done
  msg: "Nhân dịp 19/11, chúc bạn sức khỏe sung mãn, trí tuệ minh mẫn và gặt hái được nhiều cột mốc rực rỡ trong sự nghiệp. Mong rằng mọi nỗ lực của bạn thời gian qua đều được đền đáp xứng đáng, công việc thuận buồm xuôi gió, tài chính vững vàng và cuộc sống ngày càng viên mãn hơn nữa!"},
  {ban: "Truyền thông", name: "Ngô Đình Đức", token: "2pjufqsb", photo: "photo/Ngô Đình Đức.jpg", //done
  msg: "Nhân ngày 19/11, o365 chúc Đình Đức luôn vững vàng, gặp nhiều may mắn và thành công trên hành trình của mình."},
  {ban: "Truyền thông", name: "Tạ Thanh Phúc", token: "4fq4g4e7", photo: "photo/Tạ Thanh Phúc.jpg", //done
  msg: "Chúc Thanh Phúc sẽ luôn học siêu suôn sẻ, luôn giữ được sự tự tin và năng động. Cảm ơn cậu vì đã là một mảnh ghép tuyệt vời, đóng góp không nhỏ cho CLB."},
  {ban: "Truyền thông", name: "Lê Hoàng Xuân Việt", token: "qweh28jr", photo: "photo/Lê Hoàng Xuân Việt.jpg", //done
  msg: "Nhân ngày Quốc tế Nam giới, chúc cậu bảnh bao ngời ngời, sức khỏe dồi dào khắp nơi, deadline nhẹ tênh như cuộc chơi và niềm vui lúc nào cũng phơi phới!"},
  {ban: "Truyền thông", name: "Nguyễn Minh Trí", token: "afehgs8x", photo: "photo/Nguyễn Minh Trí.jpg", //done
  msg: "Mười chín tháng mười một đã sang, chúc cậu phong độ vững vàng, GPA cao vút thênh thang, ví tiền lúc nào cũng rộn ràng niềm vui nhé!"},
  {ban: "Truyền thông", name: "Nguyễn Phú Trọng", token: "3e4tjwak", photo: "photo/Nguyễn Phú Trọng.jpg", //done
  msg: "Chúc cậu 19/11 thật đỉnh cao, sức khỏe dồi dào xiết bao, học chơi đều mượt ngọt ngào và may mắn tự tìm đến chẳng cần mời chào!"},
  {ban: "Truyền thông", name: "Trần Việt Hoàng", token: "53zv73pn", photo: "photo/Trần Việt Hoàng.jpg", //done
  msg: "Chúc chàng trai o365 một ngày lễ thật tuyệt vời, lúc nào cũng điển trai rạng ngời, làm gì cũng thuận lợi đến nơi và may mắn theo chân suốt đời nha!"},
  {ban: "Truyền thông", name: "Lê Thanh Bình", token: "4g7j3f8k", photo: "photo/Lê Thanh Bình.jpg", //done
  msg: "Chúc mừng ngày Quốc tế Nam giới 19/11 của bạn! Giữa những guồng quay bận rộn của công việc và cuộc sống, mong bạn luôn dành cho mình những khoảng lặng bình yên để nghỉ ngơi và tận hưởng. Chúc bạn sức khỏe dồi dào, tinh thần lạc quan, mọi việc suôn sẻ và luôn gặp nhiều may mắn!"},

];