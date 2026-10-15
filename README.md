# Cơm Tấm Sài Gòn – Nhóm 7

Bộ 32 slide thuyết trình *Vietnamese Cuisine – Cơm tấm Sài Gòn* viết bằng **React 18 + TypeScript + Vite**.

## Chạy

```bash
npm install
npm run dev        # mở http://localhost:5173
npm run build      # xuất bản tĩnh vào dist/
npm run preview    # xem thử bản build
npm run typecheck  # kiểm tra kiểu TypeScript
```

## Trình chiếu

| Phím | Tác dụng |
|---|---|
| → / Space / PageDown | Slide tiếp |
| ← / PageUp | Slide trước |
| Home / End | Slide đầu / cuối |
| N | Bật/tắt lời thoại (EN + VI) |
| F | Toàn màn hình |

Mở thẳng một slide: `http://localhost:5173/#26`. Điện thoại: vuốt trái/phải.

## Cấu trúc

```
src/
  components/
    Deck.tsx          điều hướng, thanh tiến trình theo người, chip người nói, ghi chú
    Slide.tsx         khung 1 slide; thêm class `active` để chạy lại animation CSS
    DeckContext.ts    slide hiện tại + hook useSlideActive()
    SplitText.tsx     chữ hiện từng ký tự
    CountUp.tsx       số đếm lên khi vào slide
    TypeWriter.tsx    hiệu ứng đánh máy
    FlipCard.tsx      thẻ lật
    Poll.tsx          chọn món ở slide 2, nhắc lại ở slide 32 (lưu localStorage)
    Quiz.tsx          quiz 3 câu (slide 31)
    VideoLoader.tsx   chọn video nướng sườn từ máy để phát trên slide 27
    Plate.tsx, VMap.tsx, SvgDefs.tsx   hình minh họa SVG
  slides/Slide01.tsx … Slide32.tsx    nội dung từng slide
  data/people.ts      7 người trình bày + số slide mỗi người
  data/notes.ts       lời thoại EN + VI cho từng slide
  styles/deck.css     toàn bộ giao diện và animation
public/img/           ảnh dùng trong slide
```

### Sửa nhanh
- **Lời thoại:** `src/data/notes.ts` (phần tử thứ *n* là slide *n*).
- **Đổi người / số slide mỗi người:** `src/data/people.ts`. Tổng `slides` phải bằng 32.
- **Thêm slide:** tạo `src/slides/Slide33.tsx` (copy một slide có sẵn, đổi `index={32}`), thêm vào `src/slides/index.ts`, thêm lời thoại vào `notes.ts` và tăng số slide của người trình bày trong `people.ts`.
- **Animation:** gắn `data-a="fadeUp"` (hoặc slideL, zoomIn, flipX, pop, dropIn, swing, wipe, circle…) lên một phần tử, `--d` là độ trễ. Gắn `data-st="pop"` lên phần tử cha để các con hiện lần lượt. Chuyển cảnh slide đặt bằng prop `t` của `<Slide>`.

Font Anton và Literata tải từ Google Fonts nên cần internet; khi offline sẽ dùng font dự phòng.
