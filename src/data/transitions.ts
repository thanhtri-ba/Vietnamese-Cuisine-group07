/**
 * Hiệu ứng chuyển cảnh cho từng slide (index 0 = slide 1).
 * Ghi đè prop `t` trong từng file SlideXX.tsx — đổi ở đây, không cần sửa slide.
 *
 * Có sẵn: fade | slide | up | down | zoom | wipe | circle | blinds
 * Mới:    flip (lật 3D) | cube (xoay khối) | diamond (hình thoi) | curtain (rèm mở)
 *         shutters (lá sách) | swirl (xoáy) | blur (làm mờ) | iris (vòng tròn từ góc)
 *         push (đẩy dọc) | dots (chấm bi lan ra) | slices (3 dải trượt so le)
 *         diag (gạt chéo)
 * Thuần Việt: fan (quạt giấy) | wave (sóng nước) | scroll (cuốn thư) | lotus (cánh sen nở)
 *            lantern (đèn lồng thả) | ripple (gợn nước)
 */
export const transitions: string[] = [
  // Hòa 1–5
  'blur', 'lantern', 'scroll', 'ripple', 'fan',
  // Hải 6–10
  'wave', 'shutters', 'curtain', 'lotus', 'dots',
  // Trung 11–15
  'iris', 'scroll', 'lantern', 'wave', 'diag',
  // Khoa 16–21
  'circle', 'fan', 'slices', 'lotus', 'curtain', 'lantern',
  // Liên 22–25
  'lotus', 'swirl', 'wave', 'diag',
  // Trí 26–28
  'blur', 'scroll', 'shutters',
  // Đức 29–32
  'ripple', 'slices', 'fan', 'zoom',
];
