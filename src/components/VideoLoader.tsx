import { useEffect, useRef, useState, type ChangeEvent, type CSSProperties } from 'react';
import { useSlideActive } from './DeckContext';

type Props = { note: string; style?: CSSProperties; 'data-a'?: string };

/** Lets the presenter pick a local video file and play it on the slide (nothing is uploaded). */
export default function VideoLoader({ note, ...rest }: Props) {
  const [url, setUrl] = useState<string | null>(null);
  const video = useRef<HTMLVideoElement>(null);
  const active = useSlideActive();

  useEffect(() => () => { if (url) URL.revokeObjectURL(url); }, [url]);
  useEffect(() => { if (!active) video.current?.pause(); }, [active]);

  return (
    <div className="video-box" {...rest}>
      <label className="file-btn">
        ▶ Mở video nướng sườn (60 giây)
        <input
          type="file"
          accept="video/*"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const f = e.target.files?.[0];
            if (f) setUrl(URL.createObjectURL(f));
          }}
        />
      </label>
      <span style={{ fontSize: '.9rem', color: 'var(--sage)' }}>{note}</span>
      {url && <video ref={video} src={url} controls playsInline />}
    </div>
  );
}
