
import { Heart, Share2, UserPlus } from 'lucide-react';
import { useState } from 'react';

export default function ActionButtons() {
  const [liked, setLiked] = useState(false);
  const [following, setFollowing] = useState(false);

  return (
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

      {/* Share */}
      <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition">
        <Share2 className="w-5 h-5" />
        <span>Share</span>
      </button>

      {/* Follow */}
      <button
        onClick={() => setFollowing((v) => !v)}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
          following ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-800 hover:bg-gray-700'
        }`}
      >
        <UserPlus className="w-5 h-5" />
        <span>{following ? 'Following' : 'Follow'}</span>
      </button>
    </div>
  );
}