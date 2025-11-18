
import { log } from 'console';
import { ActionButtons, ChatBox, RelatedChannels, StreamInfo } from '../../components/live';
import StreamPlayer from '../../components/live/StreamPlayer';
import { useParams } from 'react-router-dom';
const mockRelated = [
  {
    id: '1',
    title: 'Resident Evil 4 Remake - Professional Difficulty',
    streamer: 'HorrorNightGaming',
    viewers: 2156,
  },
  {
    id: '2',
    title: 'Fortnite Arena - Going for Champion Division',
    streamer: 'BattleRoyalePro',
    viewers: 4521,
  },
  {
    id: '3',
    title: 'Super Mario 64 - 120 Stars Speedrun Attempts',
    streamer: 'SpeedRunner_Sam',
    viewers: 892,
  },
  {
    id: '4',
    title: 'League of Legends - Climbing to Challenger',
    streamer: 'TechWizKid',
    viewers: 3456,
  },
  {
    id: '5',
    title: 'Elden Ring - First Playthrough NO SPOILERS',
    streamer: 'XXDragonSlayerXX',
    viewers: 1523,
  },
];


export default function LiveStreamPage() {
  const { channelName } = useParams();

  console.log("Streaming channel:", channelName); 
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex flex-col lg:flex-row">
        <div className="flex-1 lg:w-3/4">
          <StreamPlayer
            src={`http://localhost:8000/live/${channelName}/index.m3u8`}
            poster="/placeholder-poster.jpg"
          />

          <StreamInfo
            title="Stardew Valley - Cozy Farm Building Stream"
            streamer={channelName || 'Unknown Streamer'}
            viewers={1234}
            tags={['Stardew Valley', 'Indie', 'Chill', 'Relaxing']}
            live
          />

          <div className="p-4 lg:p-6 flex justify-between items-center border-b border-gray-800">
            <ActionButtons />
          </div>
        </div>

        <aside className="lg:w-1/4 border-t lg:border-t-0 lg:border-l border-gray-800 flex flex-col">
          <div className="flex-1">
            <ChatBox channelName={channelName || ''} />
          </div>
          <RelatedChannels channels={mockRelated} />
        </aside>
      </div>
    </div>
  );
}
