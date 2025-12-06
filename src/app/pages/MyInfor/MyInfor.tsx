import React, { useState, useEffect } from "react";
import { 
  User, Mail, Calendar, Key, Tv, 
  Copy, Eye, EyeOff, Check, ArrowLeft,
  Edit3, Save, XCircle
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; 
// Import API
import { streamApi, UpdateProfileRequest } from "../../api/authAPI";

interface UserProfile {
  name: string;
  email: string;
  dob: string;
  gender: string;
  channelName: string;
  streamKey: string;
  [key: string]: any; 
}

const defaultProfile: UserProfile = {
  name: "",
  email: "",
  dob: "",
  gender: "Male", // Changed default to English
  channelName: "",
  streamKey: "",
};

const MyInfor = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // State
  const [formData, setFormData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);

  // Helper: Get email from session
  const getCurrentUserEmail = () => {
    const storageData = sessionStorage.getItem("userData");
    if (!storageData) return null;
    try {
      const parsed = JSON.parse(storageData);
      return parsed.email || parsed.sub || null;
    } catch {
      return null;
    }
  };

  // 1. INTEGRATE API: Fetch data on load (GET /me)
  useEffect(() => {
    const fetchProfile = async () => {
      const email = getCurrentUserEmail();
      
      if (!email) {
        setLoading(false);
        return; // Not logged in
      }

      try {
        const response = await streamApi.getMyProfile(email);
        
        if (response.data.success) {
          const apiData = response.data.data;
          
          // Map API data to React Form
          const mappedData: UserProfile = {
            ...defaultProfile,
            name: apiData.fullName,
            email: apiData.email,
            dob: apiData.dob || "",
            gender: apiData.gender || "Male", // Default to Male if null
            channelName: apiData.streamerName || "",
            streamKey: apiData.streamKey || "",
          };
          setFormData(mappedData);
        } else {
          toast.error("User profile not found");
        }
      } catch (error) {
        console.error("Error loading profile:", error);
        toast.error("Server connection error");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [location.pathname]);

  if (loading) {
    return <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">Loading info...</div>;
  }

  if (!formData && !loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
            <h2 className="text-xl font-bold mb-2">You Are Not Log In Yet</h2>
            <Link to="/login" className="text-purple-400 hover:underline">Back to Login</Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => prev ? { ...prev, [name]: value } : prev);
  };

  // 2. INTEGRATE API: Save data (POST /update)
  const handleSave = async () => {
    if (!formData) return;

    try {
      const payload: UpdateProfileRequest = {
        email: formData.email,
        fullName: formData.name,
        dob: formData.dob,
        gender: formData.gender,
        streamerName: formData.channelName
      };

      const response = await streamApi.updateProfile(payload);

      if (response.data.success) {
        toast.success("Update successful!");
        setIsEditing(false);
        
        // Update session storage
        const storageData = sessionStorage.getItem("userData");
        if (storageData) {
            const parsed = JSON.parse(storageData);
            sessionStorage.setItem("userData", JSON.stringify({ ...parsed, name: formData.name }));
        }
      } else {
        toast.error(response.data.message || "Update failed");
      }

    } catch (error: any) {
      console.error("Update error:", error);
      const msg = error.response?.data?.message || "System error during update";
      toast.error(msg);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    window.location.reload(); 
  };

  const handleCopyStreamKey = () => {
    const key = formData?.streamKey;
    if (key) {
        navigator.clipboard.writeText(key);
        setCopied(true);
        toast.success("Stream Key copied!");
        setTimeout(() => setCopied(false), 2000);
    } else {
        toast.error("No Stream Key available");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 flex items-center justify-center relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-5xl relative z-10">

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/" className="p-3 bg-gray-800/80 hover:bg-gray-700 rounded-full transition-colors border border-gray-700">
                <ArrowLeft className="w-5 h-5"/>
            </Link>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                My Profile
            </h1>
          </div>

          {!isEditing && (
            <button 
              onClick={() => setIsEditing(true)}
              className="md:hidden p-2 bg-gray-800 rounded-lg text-cyan-400 border border-gray-700"
            >
              <Edit3 className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* --- COLUMN 1: PERSONAL INFO --- */}
          <div className="bg-gray-900/60 backdrop-blur-md border border-gray-800 p-6 rounded-3xl shadow-2xl flex flex-col h-full">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-800 pb-4">
              <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400 ring-1 ring-purple-500/20">
                <User className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-semibold text-gray-100">Account Information</h2>
            </div>

            <div className="space-y-5 flex-1">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-400 ml-1">Full Name</label>
                <div className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-200 ${isEditing ? 'bg-gray-800 border-purple-500/50 ring-2 ring-purple-500/10' : 'bg-gray-800/40 border-gray-700/50'}`}>
                  <User className="w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    name="name"
                    value={formData?.name || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Enter your full name"
                    className="bg-transparent w-full text-gray-200 focus:outline-none disabled:cursor-not-allowed placeholder-gray-600"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-400 ml-1">Email <span className="text-xs text-gray-600 font-normal ml-1">(Cannot be changed)</span></label>
                <div className="flex items-center gap-3 bg-gray-800/30 p-3.5 rounded-xl border border-gray-700/30 text-gray-400 cursor-not-allowed">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <input
                    type="email"
                    value={formData?.email || ""}
                    disabled
                    className="bg-transparent w-full focus:outline-none cursor-not-allowed text-gray-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* DOB */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-400 ml-1">Date of Birth</label>
                  <div className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all ${isEditing ? 'bg-gray-800 border-purple-500/50 ring-2 ring-purple-500/10' : 'bg-gray-800/40 border-gray-700/50'}`}>
                    <input
                      type="date"
                      name="dob"
                      value={formData?.dob || ""}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="bg-transparent w-full text-gray-200 focus:outline-none disabled:cursor-not-allowed [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-50"
                    />
                  </div>
                </div>

                {/* Gender */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-400 ml-1">Gender</label>
                  <div className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all ${isEditing ? 'bg-gray-800 border-purple-500/50 ring-2 ring-purple-500/10' : 'bg-gray-800/40 border-gray-700/50'}`}>
                    <select
                      name="gender"
                      value={formData?.gender || "Male"}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="bg-transparent w-full text-gray-200 focus:outline-none disabled:cursor-not-allowed appearance-none"
                    >
                      <option value="Male" className="bg-gray-900">Male</option>
                      <option value="Female" className="bg-gray-900">Female</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- COLUMN 2: CHANNEL INFO --- */}
          <div className="bg-gray-900/60 backdrop-blur-md border border-gray-800 p-6 rounded-3xl shadow-2xl h-fit flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6 border-b border-gray-800 pb-4">
                <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400 ring-1 ring-cyan-500/20">
                  <Tv className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-semibold text-gray-100">Livestream Channel</h2>
              </div>

              <div className="space-y-6">
                {/* Channel Name */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-400 ml-1">Display Channel Name</label>
                  <div className={`w-full p-3.5 rounded-xl border transition-all ${isEditing ? 'bg-gray-800 border-cyan-500/50 ring-2 ring-cyan-500/10' : 'bg-gray-800/40 border-gray-700/50'}`}>
                    <input
                        type="text"
                        name="channelName"
                        value={formData?.channelName || ""}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder={!isEditing ? "Channel name not set" : "Enter channel name..."}
                        className="w-full bg-transparent text-white font-medium text-lg focus:outline-none disabled:cursor-not-allowed placeholder-gray-600"
                    />
                  </div>
                </div>

                {/* Stream Key */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 ml-1 flex items-center gap-2">
                    <Key className="w-3 h-3 text-cyan-500" />
                    Stream Key
                  </label>
                  
                  <div className="relative group">
                    <input
                      type={showKey ? "text" : "password"}
                      value={formData?.streamKey || ""}
                      readOnly
                      placeholder="Key will appear when you have a channel"
                      className="w-full bg-black/40 border border-gray-700/50 text-gray-300 text-sm font-mono rounded-xl px-4 py-3.5 pr-24 focus:outline-none focus:border-cyan-500/50 transition-colors cursor-text"
                    />
                    
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                      <button
                        onClick={() => setShowKey(!showKey)}
                        className="p-2 hover:bg-gray-700 rounded-lg transition text-gray-400 hover:text-white"
                        title={showKey ? "Hide" : "Show"}
                        type="button"
                      >
                        {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      
                      <button
                        onClick={handleCopyStreamKey}
                        className="p-2 hover:bg-cyan-600 hover:text-white rounded-lg transition text-gray-400"
                        title="Copy Key"
                        type="button"
                      >
                        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 ml-1">
                    ⚠️ Stream Key is secret. Do not share with anyone.
                  </p>
                </div>
              </div>
            </div>

            {/* --- ACTION BUTTONS --- */}
            <div className="pt-8 mt-6 border-t border-gray-800">
              {!isEditing ? (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-semibold shadow-lg shadow-purple-900/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <Edit3 className="w-5 h-5" />
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-4">
                  <button 
                    onClick={handleCancel}
                    className="flex-1 py-3.5 rounded-xl bg-gray-800 text-gray-300 font-medium hover:bg-gray-700 border border-gray-700 transition active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <XCircle className="w-5 h-5" />
                    Cancel
                  </button>
                  <button 
                    onClick={handleSave}
                    className="flex-1 py-3.5 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-500 shadow-lg shadow-green-900/20 transition active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyInfor;