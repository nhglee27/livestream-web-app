'use client';

import Hls from 'hls.js';
import { PlayCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface StreamPlayerProps {
  /** HLS .m3u8 URL */
  src: string;
  /** Optional poster while loading */
  poster?: string;
}
export default function StreamPlayer({ src, poster }: StreamPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;

    // HLS.js fallback for browsers that don’t support HLS natively
    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });

      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => setIsLoading(false));
      hls.on(Hls.Events.ERROR, (_, data) => {
        console.error('HLS error', data);
        setError('Failed to load stream');
      });

      return () => hls.destroy();
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Safari native HLS
      video.src = src;
      video.addEventListener('loadedmetadata', () => setIsLoading(false));
    } else {
      setError('Browser does not support HLS');
    }
  }, [src]);

  return (
    <div className="relative bg-black aspect-video flex items-center justify-center overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 z-10">
          <PlayCircle className="w-16 h-16 text-purple-500 animate-pulse" />
          <p className="mt-3 text-gray-300">Loading stream…</p>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      <video
        ref={videoRef}
        poster={poster}
        className="w-full h-full object-contain"
        controls
        playsInline
        autoPlay
        muted={false}
      />
    </div>
  );
}