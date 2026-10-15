export interface Presenter {
  name: string;
  part: string;
  /** number of slides this person presents */
  slides: number;
}

export const people: Presenter[] = [
  { name: "Hòa", part: "Introduction", slides: 5 },
  { name: "Hải", part: "Food philosophy", slides: 5 },
  { name: "Trung", part: "Three regions", slides: 5 },
  { name: "Khoa", part: "The story of broken rice", slides: 6 },
  { name: "Liên", part: "Balance & preparation", slides: 4 },
  { name: "Trí", part: "Charcoal-grilled ribs", slides: 3 },
  { name: "Đức", part: "Eating & conclusion", slides: 4 },
];
