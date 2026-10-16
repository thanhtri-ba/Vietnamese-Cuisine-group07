import { useEffect, useRef, useState, type ChangeEvent, type CSSProperties } from 'react';
import { useSlideActive } from './DeckContext';

type Props = {
  note: string;
  src?: string;
  style?: CSSProperties;
  'data-a'?: string;
};

function parseMediaUrl(url: string): { type: 'youtube' | 'video' | 'image'; embedUrl: string } {
  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|watch\?.+&v=))([\w-]{11})/);
  if (ytMatch) {
    return {
      type: 'youtube',
      embedUrl: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=1&rel=0`,
    };
  }
  if (/\.(jpeg|jpg|gif|png|webp|svg)($|\?)/i.test(url)) {
    return { type: 'image', embedUrl: url };
  }
  return { type: 'video', embedUrl: url };
}

/** Lets the presenter paste a video/media link (YouTube, MP4, etc.), pass src via prop, or pick a local file. */
export default function VideoLoader({ note, src: initialSrc = '', ...rest }: Props) {
  const [currentUrl, setCurrentUrl] = useState<string>(initialSrc);
  const [inputUrl, setInputUrl] = useState<string>('');
  const [showInput, setShowInput] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(Boolean(initialSrc));
  const video = useRef<HTMLVideoElement>(null);
  const active = useSlideActive();

  useEffect(() => {
    if (initialSrc) {
      setCurrentUrl(initialSrc);
      setIsOpen(true);
    }
  }, [initialSrc]);

  useEffect(() => {
    return () => {
      if (currentUrl.startsWith('blob:')) URL.revokeObjectURL(currentUrl);
    };
  }, [currentUrl]);

  useEffect(() => {
    if (!active) video.current?.pause();
  }, [active]);

  const handleApplyLink = () => {
    if (inputUrl.trim()) {
      setCurrentUrl(inputUrl.trim());
      setIsOpen(true);
      setShowInput(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setCurrentUrl(URL.createObjectURL(f));
      setIsOpen(true);
      setShowInput(false);
    }
  };

  const media = currentUrl ? parseMediaUrl(currentUrl) : null;

  return (
    <div className="video-box" {...rest}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
        {currentUrl ? (
          <button
            type="button"
            className="file-btn"
            onClick={() => setIsOpen((o) => !o)}
          >
            {isOpen ? '⏹ Ẩn video minh họa' : '▶ Mở video minh họa'}
          </button>
        ) : (
          <button
            type="button"
            className="file-btn"
            onClick={() => setShowInput((s) => !s)}
          >
            ▶ Mở video minh họa
          </button>
        )}

        <button
          type="button"
          className="file-btn"
          style={{ background: 'transparent', border: '1.5px solid var(--leaf)', color: 'inherit' }}
          onClick={() => setShowInput((s) => !s)}
          title="Ghép link video trực tiếp"
        >
          🔗 {showInput ? 'Đóng nhập link' : 'Ghép link video'}
        </button>

        <label
          className="file-btn"
          style={{ background: 'transparent', border: '1.5px dashed var(--muted)', color: 'inherit', fontSize: '.85rem', padding: '8px 12px' }}
          title="Hoặc chọn tệp từ máy tính"
        >
          📁 Tải tệp lên
          <input
            type="file"
            accept="video/*,image/*"
            style={{ position: 'absolute', opacity: 0, width: '1px', height: '1px' }}
            onChange={handleFileChange}
          />
        </label>
      </div>

      {showInput && (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', width: '100%', maxWidth: '520px', marginTop: '6px' }}>
          <input
            type="text"
            placeholder="Dán link video (YouTube / MP4 / WebM)..."
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleApplyLink()}
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1.5px solid var(--leaf)',
              background: 'rgba(255,250,238,0.9)',
              color: 'var(--forest)',
              fontFamily: 'inherit',
              fontSize: '.9rem',
            }}
          />
          <button
            type="button"
            className="file-btn"
            style={{ padding: '8px 16px', background: 'var(--carrot)', color: 'var(--cream)', border: 0 }}
            onClick={handleApplyLink}
          >
            Xem
          </button>
        </div>
      )}

      {note && <span style={{ fontSize: '.9rem', color: 'var(--sage)', display: 'block', width: '100%' }}>{note}</span>}

      {isOpen && media && (
        <div style={{ marginTop: '10px', width: '100%' }}>
          {media.type === 'youtube' ? (
            <iframe
              src={media.embedUrl}
              title="Video minh họa"
              style={{
                width: 'min(100%, 560px)',
                height: 'clamp(200px, 34vh, 320px)',
                border: '2px solid var(--leaf)',
                borderRadius: '8px',
                display: 'block',
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : media.type === 'image' ? (
            <img
              src={media.embedUrl}
              alt="Hình ảnh minh họa"
              style={{ maxHeight: '34vh', maxWidth: '100%', borderRadius: '8px', border: '2px solid var(--leaf)', objectFit: 'contain' }}
            />
          ) : (
            <video
              ref={video}
              src={media.embedUrl}
              controls
              playsInline
              style={{ maxHeight: '34vh', maxWidth: '100%', background: '#000', borderRadius: '8px', border: '2px solid var(--leaf)' }}
            />
          )}
        </div>
      )}
    </div>
  );
}
