import { Circle, Users } from 'lucide-react';

interface Channel {
  id: string;
  title: string;
  streamer: string;
  viewers: number;
  thumbnail?: string;
}

interface RelatedChannelsProps {
  channels: Channel[];
}

export default function RelatedChannels({ channels }: RelatedChannelsProps) {
  return (
    <div className="p-4 border-t border-gray-800">
      <h3 className="font-semibold mb-4">Related Channels</h3>

      <div className="space-y-3">
        {channels.map((ch) => (
          <div
            key={ch.id}
            className="flex items-start space-x-3 cursor-pointer hover:bg-gray-900 p-2 rounded-lg transition"
          >
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 bg-gray-800 rounded-lg"></div>
              <div className="absolute top-1 left-1 flex items-center">
                <Circle className="w-3 h-3 fill-red-500 text-red-500" />
                <span className="ml-1 text-xs font-bold text-white bg-black bg-opacity-70 px-1 rounded">
                  LIVE
                </span>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{ch.title}</p>
              <p className="text-xs text-gray-400">{ch.streamer}</p>
              <p className="text-xs text-gray-500 flex items-center mt-1">
                <Users className="w-3 h-3 mr-1" />
                {ch.viewers.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}