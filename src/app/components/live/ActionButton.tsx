import { Heart, Share2, UserCheck, UserPlus, X, Copy } from 'lucide-react'; // Thêm icon X và Copy
import { useEffect, useState } from 'react';
import cookies from 'js-cookies';
import { actionsApi } from '../../api/authAPI';
import { FllowRequest } from '../../dto/action';
import { useParams } from "react-router-dom";
import { UserModel } from '../../model/user';
import toast from 'react-hot-toast';

export default function ActionButtons() {
  const { channelName } = useParams<{ channelName: string }>();
  
  // State quản lý việc hiển thị popup Share
  const [showShareModal, setShowShareModal] = useState(false);

  // Initialize from localStorage
  const [liked, setLiked] = useState(() => {
    const saved = localStorage.getItem(`liked_${channelName}`);
    return saved ? JSON.parse(saved) : false;
  });

  const [following, setFollowing] = useState(() => {
    const saved = localStorage.getItem(`following_${channelName}`);
    return saved ? JSON.parse(saved) : false;
  });

  // Persist liked/following when they change
  useEffect(() => {
    localStorage.setItem(`liked_${channelName}`, JSON.stringify(liked));
  }, [liked, channelName]);

  useEffect(() => {
    localStorage.setItem(`following_${channelName}`, JSON.stringify(following));
  }, [following, channelName]);

  const handleFollow = async () => {
    const dataUserString = cookies.getItem('userData');
    const dataUser: UserModel | null = dataUserString ? JSON.parse(dataUserString) : null;

    if (!dataUser) {
      window.location.href = '/login';
      return;
    }

    const credentials: FllowRequest = {
      subscriberName: channelName,
      subscribedToEmail: dataUser.email
    };

    if (following) {
      await actionsApi.unfollow(credentials)
        .then(() => {
          setFollowing(false);
        })
        .catch(() => toast.error('Failed to unfollow the streamer'));
    } else {
      await actionsApi.follow(credentials)
        .then(() => {
          setFollowing(true);
        })
        .catch(() => toast.error('Failed to follow the streamer'));
    }
  };

  // Logic xử lý Copy Link
  const handleCopyLink = () => {
    // Tạo full URL: domain + /live/ + channelName
    const shareUrl = `${window.location.origin}/live/${channelName || ''}`;
    
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        toast.success('Link copied to clipboard!');
        // Tùy chọn: Đóng modal sau khi copy xong nếu muốn
        // setShowShareModal(false); 
      })
      .catch(() => {
        toast.error('Failed to copy link');
      });
  };

  // URL để hiển thị trong input (chỉ để display)
  const displayUrl = `${window.location.origin}/live/${channelName || ''}`;

  return (
    <>
      <div className="flex items-center space-x-3">
        {/* Like */}
        <button
          onClick={() => setLiked((v) => !v)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
            liked ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-800 hover:bg-gray-700'
          }`}
        >
          <Heart className={`w-5 h-5 ${liked ? 'fill-white' : ''}`} />
          <span>{liked ? 'Liked' : 'Like'}</span>
        </button>

        {/* Share Button - Mở Modal */}
        <button 
          onClick={() => setShowShareModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition"
        >
          <Share2 className="w-5 h-5" />
          <span>Share</span>
        </button>

        {/* Follow */}
        <button
          onClick={handleFollow}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
            following ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-800 hover:bg-gray-700'
          }`}
        >
          {following ? <UserCheck className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
          <span>{following ? 'Following' : 'Follow'}</span>
        </button>
      </div>

      {/* Share Modal Popup */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-gray-800 p-6 rounded-xl shadow-xl w-full max-w-md border border-gray-700 relative animation-fade-in">
            
            {/* Header Modal */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Share Stream</h3>
              <button 
                onClick={() => setShowShareModal(false)}
                className="text-gray-400 hover:text-white transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content Modal */}
            <p className="text-gray-300 mb-2 text-sm">Copy the link below to share this channel:</p>
            
            <div className="flex items-center gap-2 bg-gray-900 p-2 rounded-lg border border-gray-700">
              <input 
                type="text" 
                readOnly 
                value={displayUrl}
                className="bg-transparent text-gray-300 text-sm flex-1 outline-none px-2 truncate"
              />
              <button 
                onClick={handleCopyLink}
                className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-md transition flex items-center gap-2 text-sm font-medium"
              >
                <Copy className="w-4 h-4" />
                Copy
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}