'use client'

import { useState } from "react";
import { motion } from "framer-motion";
import { streamApi } from "../../api/authAPI";
// @ts-ignore
import cookies from 'js-cookies';
import toast from "react-hot-toast";

const GoLiveModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // State để lưu thông tin streamer mới tạo
  const [createdChannel, setCreatedChannel] = useState<{
    streamerName: string;
    streamKey: string;
  } | null>(null);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setChannelName("");
    setError("");
    setCreatedChannel(null);
  }

  const handleSubmit = async () => {
    if (!channelName.trim()) {
      setError("Channel name is required");
      return;
    }

    const userDataString = cookies.getItem('userData');
    let email: string | null = null;

    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString);
        email = userData.email;
      } catch (err) {
        console.error("Failed to parse userData cookie:", err);
      }
    }

    if (!email) {
      setError("You must be logged in to create a stream");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await streamApi.createStreamer({
        streamerName: channelName,
        email: email
      });

      if (response.data.success && response.data.data) {
        const { streamerName, streamKey } = response.data.data;
        setCreatedChannel({ streamerName: streamerName || channelName, streamKey: streamKey || "" });
      } else {
        setError(response.data.message || "Something went wrong");
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const copyStreamKey = () => {
    if (createdChannel?.streamKey) {
      navigator.clipboard.writeText(createdChannel.streamKey);
      toast("Stream key copied to clipboard!");
    }
  }

  return (
    <>
      {/* Nút Go Live */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
        className="mt-6"
      >
        <button
          onClick={openModal}
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-500 hover:shadow-lg hover:shadow-purple-500/30 transition-all font-semibold flex items-center gap-2 mx-auto text-white"
        >
          Go Live
        </button>
      </motion.div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-gray-900 rounded-2xl p-6 w-80 flex flex-col gap-4 shadow-lg"
          >
            {!createdChannel ? (
              <>
                <h2 className="text-xl font-semibold text-white">Enter Channel Name</h2>
                <input
                  type="text"
                  value={channelName}
                  onChange={(e) => setChannelName(e.target.value)}
                  placeholder="Channel name..."
                  className="px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none"
                />
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Go Live"}
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-white">Streamer Created!</h2>
                <p className="text-gray-300">Channel: {createdChannel.streamerName}</p>
                <p className="text-gray-300 truncate max-w-full" title={createdChannel.streamKey}>  Stream Key: <span className="font-mono">{createdChannel.streamKey}</span></p>

                <button
                  onClick={copyStreamKey}
                  className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
                >
                  Copy Stream Key
                </button>
                <button
                  onClick={() => window.location.href = `/live/${createdChannel.streamerName}`}
                  className="px-4 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition mt-2"
                >
                  Go To Live
                </button>
              </>
            )}
          </motion.div>
        </div>
      )}
    </>
  );
};

export default GoLiveModal;
