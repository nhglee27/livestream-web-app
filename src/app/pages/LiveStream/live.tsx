// StreamPlayer.tsx

import Hls, { HlsConfig } from 'hls.js'; // Vẫn import HlsConfig
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
    // Thêm tham số chống cache (giữ nguyên)
    const sourceUrl = src + '?t=' + Date.now(); 

    if (Hls.isSupported()) {
      
      // --- ĐÂY LÀ PHẦN SỬA LỖI QUAN TRỌNG ---
      // 1. Định nghĩa cấu hình retry với ĐÚNG TÊN KEY
      const hlsConfig: Partial<HlsConfig> = {
        
        // Cấu hình retry cho manifest (file .m3u8)
        manifestLoadingMaxRetry: 10,  // Tên đúng: manifestLoadingMaxRetry (Thử 10 lần)
        manifestLoadingRetryDelay: 1000, // Tên đúng: manifestLoadingRetryDelay (Chờ 1 giây)

        // Cấu hình retry cho các phân đoạn (file .ts)
        fragLoadingMaxRetry: 10, // Tên đúng: fragLoadingMaxRetry
        fragLoadingRetryDelay: 1000, // Tên đúng: fragLoadingRetryDelay
      };

      // 2. Khởi tạo Hls với cấu hình mới
      hls = new Hls(hlsConfig);
      // --- KẾT THÚC SỬA LỖI ---

      hls.loadSource(sourceUrl);
      hls.attachMedia(video);
      
      // 3. Xử lý sự kiện
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
      	setReady(true);
        // Chỉ thông báo khi stream đã sẵn sàng
        toast.success('Stream is ready to play'); 
      });
      
      // 4. Thêm log chi tiết khi có lỗi
      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error('HLS error:', data); 
        
        // Thông báo cho người dùng nếu là lỗi 404 (stream đang khởi động)
        if (data.type === 'networkError' && data.details === 'manifestLoadError' && data.response?.code === 404) {
          // Không dùng toast.loading vì nó sẽ hiện 10 cái
          console.log('Stream is starting, retrying...');
        } 
        // Nếu lỗi nghiêm trọng và không phải 404, báo lỗi
        else if (data.fatal) {
          toast.error(`Lỗi stream: ${data.details}`);
          hls?.destroy(); 
        }
      });
      
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    	video.src = sourceUrl;
    	video.addEventListener('loadedmetadata', () => setReady(true));
    }

    return () => {
      hls?.destroy();
    };
  }, [src]);
  
  const handlePlay = () => videoRef.current?.play();

  return (
    <div>
      <video 
        ref={videoRef} 
        controls 
        poster={poster} 
        style={{ width: '100%' }} 
        autoPlay // Tự động phát
        muted // Bắt buộc phải tắt tiếng để autoPlay hoạt động
      />
      {!ready ? null : (
        <button onClick={handlePlay} className="mt-2 px-4 py-2 bg-blue-600 rounded">
          Play Live
        </button>
      )}
    </div>
  );
}