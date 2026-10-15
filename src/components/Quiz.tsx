import { useState, type CSSProperties } from 'react';

interface Question {
  q: string;
  options: string[];
  answer: number;
  explain: string;
}

const QUESTIONS: Question[] = [
  { q: 'What does “tấm” mean?', options: ['Broken rice grains', 'Grilled pork', 'Fish sauce'], answer: 0, explain: 'Tấm are rice grains broken during milling.' },
  { q: 'Which ingredient makes the ribs golden and soft?', options: ['Soy sauce', 'Condensed milk', 'Vinegar'], answer: 1, explain: 'Condensed milk softens the meat and gives a golden-brown color.' },
  { q: 'You want more rice. What do you say?', options: ['“Thêm trứng”', '“Nhiều mỡ hành”', '“Cơm thêm”'], answer: 2, explain: '“Cơm thêm” means more rice, please.' },
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
            Score: {score} / {QUESTIONS.length}
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
          'Answer all three to see the class score.'
        )}
      </p>
    </>
  );
}
