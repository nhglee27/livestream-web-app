import Hls from 'hls.js';
import { useEffect, useRef, useState } from 'react';

export default function LivePlayer() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const hls = new Hls();
    hls.loadSource('http://localhost:8000/live/test/index.m3u8');
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, () => setReady(true));

    return () => hls.destroy();
  }, []);

  const handlePlay = () => {
    videoRef.current?.play();
  };

  return (
    <div>
      <video ref={videoRef} controls style={{ width: '100%' }} />
      {!ready ? null : (
        <button onClick={handlePlay} style={{ marginTop: 10 }}>
          Play Live
        </button>
      )}
    </div>
  );
}
