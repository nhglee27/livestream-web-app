import { Circle, Users } from 'lucide-react';

interface StreamInfoProps {
  title: string;
  streamer: string;
  avatarLetter?: string; // first letter of streamer name
  viewers: number;
  tags: string[];
  live: boolean;
}

export default function StreamInfo({
  title,
  streamer,
  avatarLetter = streamer[0].toUpperCase(),
  viewers,
  tags,
  live,
}: StreamInfoProps) {
  return (
    <div className="p-4 lg:p-6 border-b border-gray-800">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>

      <div className="flex items-center space-x-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center font-bold text-lg">
            {avatarLetter}
          </div>

          <div>
            <p className="font-semibold">{streamer}</p>
            <p className="text-gray-400 flex items-center">
              {live && <Circle className="w-3 h-3 fill-red-500 text-red-500 mr-1" />}
              LIVE
              <span className="ml-2 flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {viewers.toLocaleString()} viewers
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}