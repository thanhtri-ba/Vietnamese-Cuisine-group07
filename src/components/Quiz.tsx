import { useState, type CSSProperties } from 'react';

interface Question {
  q: string;
  /** picture in public/img/photos */
  img: string;
  options: string[];
  answer: number;
  explain: string;
}

const QUESTIONS: Question[] = [
  { img: 'gao-tam.webp', q: '“Tấm” trong cơm tấm có nghĩa là gì?', options: ['Hạt gạo bị vỡ', 'Thịt sườn nướng', 'Nước mắm'], answer: 0, explain: 'Tấm là những hạt gạo bị vỡ trong quá trình xay xát lúa.' },
  { img: 'suon-cay.webp', q: 'Nguyên liệu nào giúp sườn nướng mềm ngọt và vàng ươm?', options: ['Nước tương', 'Sữa đặc', 'Giấm ăn'], answer: 1, explain: 'Sữa đặc giúp làm mềm thớ thịt và tạo màu nâu cánh gián óng ả.' },
  { img: 'com-tam-ve.webp', q: 'Khi muốn ăn thêm cơm, bạn sẽ gọi thế nào?', options: ['“Thêm trứng”', '“Nhiều mỡ hành”', '“Cơm thêm”'], answer: 2, explain: '“Cơm thêm” là cách gọi quen thuộc để xin thêm một phần cơm nữa.' },
];

type Props = { style?: CSSProperties; 'data-st'?: string };

/** Three-question class quiz with right/wrong feedback and a score. */
export default function Quiz(props: Props) {
  const [chosen, setChosen] = useState<(number | null)[]>(() => QUESTIONS.map(() => null));
  const [round, setRound] = useState(0);
  const done = chosen.every((c) => c !== null);
  const score = chosen.filter((c, i) => c === QUESTIONS[i].answer).length;

  const choose = (qi: number, oi: number) =>
    setChosen((prev) => prev.map((c, i) => (i === qi && c === null ? oi : c)));

  return (
    <>
      <div className="quiz" {...props} key={round}>
        {QUESTIONS.map((q, qi) => {
          const pick = chosen[qi];
          const answered = pick !== null;
          const ok = pick === q.answer;
          return (
            <div key={qi} className={'qz' + (answered ? (ok ? ' right' : ' wrong') : '')} style={{ '--i': qi } as CSSProperties}>
              <img className="qz-img" src={`img/photos/${q.img}`} alt="" />
              <p className="st">
                {qi + 1}. {q.q}
              </p>
              <div className="opts">
                {q.options.map((o, oi) => (
                  <button
                    key={oi}
                    type="button"
                    disabled={answered}
                    className={answered && oi === q.answer ? 'correct' : answered && oi === pick ? 'chosen-wrong' : undefined}
                    onClick={() => choose(qi, oi)}
                  >
                    {o}
                  </button>
                ))}
              </div>
              {answered && <p className="ans">{(ok ? 'Chính xác! ' : 'Chưa đúng rồi. ') + q.explain}</p>}
            </div>
          );
        })}
      </div>
      <p className="score" aria-live="polite">
        {done ? (
          <>
            Điểm số: {score} / {QUESTIONS.length}
            <button
              type="button"
              onClick={() => {
                setChosen(QUESTIONS.map(() => null));
                setRound((r) => r + 1);
              }}
            >
              Làm lại
            </button>
          </>
        ) : (
          'Trả lời cả 3 câu hỏi để xem điểm số.'
        )}
      </p>
    </>
  );
}
