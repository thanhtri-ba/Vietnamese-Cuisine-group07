export interface Presenter {
  name: string;
  part: string;
  /** number of slides this person presents */
  slides: number;
}

export const people: Presenter[] = [
  { name: "Hòa", part: "Giới thiệu", slides: 5 },
  { name: "Hải", part: "Triết lý ẩm thực", slides: 5 },
  { name: "Trung", part: "Ẩm thực ba miền", slides: 5 },
  { name: "Khoa", part: "Câu chuyện cơm tấm", slides: 6 },
  { name: "Liên", part: "Cân bằng & Chế biến", slides: 4 },
  { name: "Trí", part: "Sườn nướng than hoa", slides: 3 },
  { name: "Đức", part: "Thưởng thức & Tổng kết", slides: 4 },
];
