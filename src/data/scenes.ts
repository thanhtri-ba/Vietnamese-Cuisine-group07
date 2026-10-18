/** Hình nền cảnh quan / văn hóa Việt Nam cho từng slide (thuần trang trí, không chứa nội dung). */
export interface SceneDef {
  /** dải phong cảnh: bám đáy ('b'), bám đỉnh ('t') hoặc hai bên ('tall') */
  s?: string;
  pos?: 'b' | 't' | 'tall';
  /** biểu tượng góc: trống đồng, nón lá, hoa sen, mặt trời */
  e?: 'drum' | 'non' | 'lotusE' | 'sun';
  ep?: 'tl' | 'tr' | 'bl' | 'br';
  /** biểu tượng thứ hai (dải đỉnh: đèn lồng, pháo hoa) */
  top?: 'lantern' | 'fireworks';
  /** hạt chuyển động (canvas) */
  fx?: 'petal' | 'leaf' | 'firefly' | 'steam' | 'ember' | 'bubble' | 'rice';
}

export const scenes: Record<number, SceneDef> = {
  0: { fx: 'petal', s: 'skyline' },
  1: { fx: 'firefly', s: 'paddy', top: 'lantern', e: 'non', ep: 'br' },
  2: { fx: 'leaf', s: 'bamboo', pos: 'tall' },
  3: { fx: 'firefly', s: 'sea', e: 'drum', ep: 'tr', top: 'lantern' },
  4: { fx: 'leaf', s: 'market' },
  5: { fx: 'rice', s: 'paddy' },
  6: { fx: 'petal', s: 'lotus', e: 'lotusE', ep: 'tr' },
  7: { fx: 'leaf', e: 'drum', ep: 'bl', s: 'dinh' },
  8: { fx: 'bubble', s: 'sea' },
  9: { fx: 'leaf', s: 'bamboo', pos: 'tall' },
  10: { fx: 'petal', s: 'tri' },
  11: { fx: 'steam', s: 'halong' },
  12: { fx: 'ember', s: 'hue', top: 'lantern' },
  13: { fx: 'firefly', s: 'mekong' },
  14: { fx: 'bubble', s: 'sea', e: 'sun', ep: 'tr' },
  15: { fx: 'steam', s: 'skyline', e: 'non', ep: 'tr' },
  16: { fx: 'rice', s: 'paddy', e: 'non', ep: 'tr' },
  17: { fx: 'petal', s: 'skyline' },
  18: { fx: 'steam', s: 'market' },
  19: { fx: 'rice', s: 'mekong' },
  20: { fx: 'ember', s: 'dinh', top: 'lantern' },
  21: { fx: 'petal', s: 'lotus' },
  22: { fx: 'leaf', s: 'bamboo', pos: 'tall' },
  23: { fx: 'ember', s: 'fire' },
  24: { fx: 'bubble', s: 'sea' },
  25: { fx: 'ember', e: 'sun', ep: 'tr' },
  26: { fx: 'steam', s: 'dinh' },
  27: { fx: 'steam', s: 'hue', e: 'non', ep: 'br' },
  28: { fx: 'leaf', s: 'skyline', e: 'non', ep: 'tr' },
  29: { fx: 'rice', s: 'paddy', e: 'sun', ep: 'tr' },
  30: { fx: 'firefly', top: 'lantern', e: 'drum', ep: 'tr' },
  31: { s: 'tri' },
};
