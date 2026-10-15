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
  { img: 'gao-tam.webp', q: 'What does “tấm” in cơm tấm mean?', options: ['Broken rice grains', 'Grilled pork ribs', 'Fish sauce'], answer: 0, explain: '“Tấm” means rice grains that broke during milling.' },
  { img: 'suon-cay.webp', q: 'Which ingredient makes the grilled ribs tender, sweet and golden?', options: ['Soy sauce', 'Condensed milk', 'Vinegar'], answer: 1, explain: 'Condensed milk tenderizes the meat and gives it a glossy golden-brown color.' },
  { img: 'com-tam-ve.webp', q: 'How do you ask for more rice?', options: ['“Thêm trứng”', '“Nhiều mỡ hành”', '“Cơm thêm”'], answer: 2, explain: '“Cơm thêm” is the usual way to ask for another serving of rice.' },
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
              {answered && <p className="ans">{(ok ? 'Correct! ' : 'Not quite. ') + q.explain}</p>}
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
              Try again
            </button>
          </>
        ) : (
          'Answer all 3 questions to see your score.'
        )}
      </p>
    </>
  );
}
