import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// 1. Import the actions from your slice
import { getMe, logout, reset, updateUserProfile } from '../../redux/slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlassCard from '../../components/common/GlassCard';
import { 
  User, LogOut, Mail, MapPin, Phone, 
  Camera, Edit2, Save, Tag
} from 'lucide-react';
import { notify } from '../../utils/notify';
import GlassboardLoader from '../../components/common/LoadingScreen';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fileInputRef = useRef(null);
  
  // 2. Get state from Redux
  const { user, isLoading, isError, message } = useSelector((state) => state.auth);

  // Local State for UI
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);


  const [profileData, setProfileData] = useState({
    bio: "",
    location: "",
    phone: "",
    tagline: ""
  });

  useEffect(() => {
    if (isError && message) {
        notify.error(message) 
    }
    
    if (!user) {
        dispatch(getMe());
    } else {
        setProfileData({
            bio: user.bio || "",
            location: user.location || "",
            phone: user.phone || "",
            tagline: user.tagline || ""
        });
    }

    return () => { dispatch(reset()); };
  }, [dispatch, isError, message, user]);

  const onLogout = () => {
    notify.success("Logged Out User")
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file)); 
    }
  };

  // Trigger hidden input click
  const handleAvatarClick = () => {
    if (isEditing) fileInputRef.current.click();
    if(!isEditing) notify.error("First Edit To Upload Image")
  };

  
  const handleSave = async () => {
    
    const formData = new FormData();
    formData.append('bio', profileData.bio);
    formData.append('location', profileData.location);
    formData.append('phone', profileData.phone);
    formData.append('tagline', profileData.tagline);
    
    formData.append('fullName', user.fullName);

    // C. Append File ONLY if user picked one
    if (selectedFile) {
        formData.append('avatar', selectedFile);
    }
    
    // D. Dispatch the Thunk
    const result = await dispatch(updateUserProfile(formData));


    if (updateUserProfile.fulfilled.match(result)) {
        setIsEditing(false);
        setSelectedFile(null); // Reset file selection
        notify.success("Profile Updated Successfully!");
    } else {
        notify.error("Update failed: " + result.payload);
    }
  };

  if (isLoading) {
   return <GlassboardLoader/>
  }

  return (
    <div className="relative min-h-screen text-white p-6 md:p-12 overflow-hidden">
      <div className="bg-gradient-animate fixed inset-0 z-0" />
      

      {user ? (
        
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 max-w-5xl mx-auto"
        >
            <h1 className='text-center text-2xl font-bold font-sans relative top-10'>Profile Setting</h1>
            <div className="flex justify-between items-center mb-8">
                <div className='cursor-pointer'>
                    <Link to="/" className="inline-block mb-4 group">
                                <h1 className="text-3xl font-bold tracking-tighter flex items-center justify-center gap-2 group-hover:scale-105 transition-transform">
                                  <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse" />
                                  GlassBoard.
                                </h1>
                              </Link>
                    <p className="text-blue-200/60 text-sm">Manage your personal details.</p>
                </div>
                <button onClick={onLogout} className="flex items-center gap-2 bg-red-500/10 text-red-200 px-4 py-2 rounded-xl border border-red-500/20 hover:bg-red-500/20 transition-all">
                    <LogOut size={18} /> Logout
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                
                <div className="lg:col-span-1">
                    <GlassCard className="p-0 overflow-hidden relative text-center h-full flex flex-col">
                        <div className="h-28 bg-gradient-to-r from-blue-500 to-blue-700 relative opacity-90" />

                        <div className="px-6 pb-8 relative -mt-14 flex-1 flex flex-col items-center">
                            
                            <div 
                                onClick={handleAvatarClick}
                                className={`relative inline-block w-28 h-28 rounded-full border-[5px] border-[#0f172a] bg-blue-600 shadow-xl overflow-hidden ${isEditing ? 'cursor-pointer hover:opacity-90' : ''} transition-all`}
                            >
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                ) : user.avatar ? (
                                    <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-5xl font-bold text-white">
                                        {user.fullName.charAt(0).toUpperCase()}
                                    </div>
                                )}
                                
                                {isEditing && (
                                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white/90">
                                        <Camera className="w-8 h-8 mb-1" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">Upload</span>
                                    </div>
                                )}
                            </div>
                            
                            <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />

                            <h2 className="text-2xl font-bold mt-4">{user.fullName}</h2>
                            <p className="text-blue-300/70 text-sm mb-6">{user.email}</p>

                            <div className="w-full mt-auto">
                                <div className="bg-white/5 rounded-xl p-4 border border-white/10 w-full shadow-inner">
                                    <label className="text-[10px] text-blue-200/50 uppercase tracking-widest font-bold flex items-center justify-center gap-1 mb-2">
                                        <Tag size={10} /> Status
                                    </label>
                                    {isEditing ? (
                                        <input 
                                            type="text" 
                                            value={profileData.tagline}
                                            onChange={(e) => setProfileData({...profileData, tagline: e.target.value})}
                                            className="w-full bg-black/20 text-center text-sm border-b border-blue-500/50 focus:outline-none py-1 text-white italic"
                                            placeholder="Add a tagline..."
                                        />
                                    ) : (
                                        <p className="text-white font-medium italic">
                                            "{profileData.tagline || "Building Digital Dreams"}"
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                </div>

                {/* --- RIGHT COLUMN: DETAILS FORM --- */}
                <div className="lg:col-span-2">
                    <GlassCard className="p-8 h-full flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <User className="text-blue-400" size={20} /> Personal Information
                            </h3>
                            <button 
                                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                    isEditing ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-white/10 hover:bg-white/20'
                                }`}
                            >
                                {isEditing ? <><Save size={16} /> Save Changes</> : <><Edit2 size={16} /> Edit Profile</>}
                            </button>
                        </div>

                        <div className="space-y-6 flex-1">
                            {/* Full Name & Email */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-blue-200/60 ml-1">Full Name</label>
                                    <input type="text" disabled={true} defaultValue={user.fullName} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white/70 cursor-not-allowed"/>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-blue-200/60 ml-1">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-3.5 text-blue-200/30 w-5 h-5" />
                                        <input type="email" disabled defaultValue={user.email} className="w-full bg-black/20 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white/70 cursor-not-allowed"/>
                                    </div>
                                </div>
                            </div>

                            {/* Bio */}
                            <div className="space-y-2">
                                <label className="text-sm text-blue-200/60 ml-1">Bio</label>
                                <textarea 
                                    disabled={!isEditing} 
                                    value={profileData.bio} 
                                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})} 
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 focus:outline-none resize-none disabled:opacity-50" 
                                    rows="3"
                                    placeholder="Tell us about yourself..."
                                />
                            </div>

                            {/* Location & Phone */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-blue-200/60 ml-1">Location</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-3.5 text-blue-200/30 w-5 h-5" />
                                        <input 
                                            disabled={!isEditing} 
                                            value={profileData.location} 
                                            onChange={(e) => setProfileData({...profileData, location: e.target.value})} 
                                            className="w-full bg-black/20 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:border-blue-500 focus:outline-none disabled:opacity-50"
                                            placeholder="City, Country"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-blue-200/60 ml-1">Phone</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-3.5 text-blue-200/30 w-5 h-5" />
                                        <input 
                                            disabled={!isEditing} 
                                            value={profileData.phone} 
                                            onChange={(e) => setProfileData({...profileData, phone: e.target.value})} 
                                            className="w-full bg-black/20 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:border-blue-500 focus:outline-none disabled:opacity-50"
                                            placeholder="+1 234 567 890"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </motion.div>
      ) : (
        <div className="text-center mt-20">Please login to view profile.</div>
      )}
    </div>
  );
};

export default Profile;