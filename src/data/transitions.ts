/**
 * Hiệu ứng chuyển cảnh cho từng slide (index 0 = slide 1).
 * Ghi đè prop `t` trong từng file SlideXX.tsx — đổi ở đây, không cần sửa slide.
 *
 * Có sẵn: fade | slide | up | down | zoom | wipe | circle | blinds
 * Mới:    flip (lật 3D) | cube (xoay khối) | diamond (hình thoi) | curtain (rèm mở)
 *         shutters (lá sách) | swirl (xoáy) | blur (làm mờ) | iris (vòng tròn từ góc)
 *         push (đẩy dọc) | dots (chấm bi lan ra) | slices (3 dải trượt so le)
 *         diag (gạt chéo)
 */
export const transitions: string[] = [
  // Hòa 1–5
  'blur', 'zoom', 'flip', 'slices', 'diamond',
  // Hải 6–10
  'cube', 'shutters', 'curtain', 'swirl', 'dots',
  // Trung 11–15
  'iris', 'push', 'flip', 'cube', 'diag',
  // Khoa 16–21
  'circle', 'shutters', 'slices', 'diamond', 'curtain', 'dots',
  // Liên 22–25
  'cube', 'swirl', 'push', 'diag',
  // Trí 26–28
  'blur', 'flip', 'shutters',
  // Đức 29–32
  'circle', 'slices', 'push', 'zoom',
];
