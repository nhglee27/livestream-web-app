import Hls from 'hls.js';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

interface StreamPlayerProps {
  src: string;
  poster?: string;
}

export default function StreamPlayer({ src, poster }: StreamPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => setReady(true));
      toast.success('Stream is ready to play');
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      video.addEventListener('loadedmetadata', () => setReady(true));
    }

    return () => hls?.destroy();
  }, [src]);

  const handlePlay = () => videoRef.current?.play();

  return (
    <div>
      <video ref={videoRef} controls poster={poster} style={{ width: '100%' }} />
      {!ready ? null : (
        <button onClick={handlePlay} className="mt-2 px-4 py-2 bg-blue-600 rounded">
          Play Live
        </button>
      )}
    </div>
  );
}
