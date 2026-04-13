import React, { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { User, Mail, Shield, Camera, Edit3, Check, X, Phone, MapPin } from "lucide-react";
import Swal from "sweetalert2";

const Profile = () => {
  const { user, role } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || user?.name || "",
    email: user?.email || "",
    phone: user?.phoneNumber || "",
    location: user?.location || "",
    bio: user?.bio || ""
  });

  const handleSave = () => {
    Swal.fire({
      title: "Saving Changes",
      text: "Your profile is being updated...",
      timer: 1500,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      }
    }).then(() => {
      setIsEditing(false);
      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your information is now fresh and ready.",
        timer: 2000,
        showConfirmButton: false
      });
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-amber-950 tracking-tight">Your Profile</h1>
          <p className="text-amber-900/60 font-bold mt-1 uppercase tracking-widest text-[9px]">Manage your personal artisan identity</p>
        </div>
        
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all active:scale-95 shadow-lg ${
            isEditing 
            ? "bg-emerald-600 text-white shadow-emerald-600/20 hover:bg-emerald-700" 
            : "bg-amber-950 text-white shadow-amber-950/20 hover:bg-black"
          }`}
        >
          {isEditing ? (
            <><Check size={16} /> Save Changes</>
          ) : (
            <><Edit3 size={16} /> Edit Profile</>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Role */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-amber-900/10 shadow-xl shadow-amber-900/5 text-center relative group">
            <div className="relative inline-block">
              {user?.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt={formData.displayName} 
                  className="w-32 h-32 rounded-[2rem] object-cover border-4 border-amber-900/5 shadow-xl mx-auto"
                />
              ) : (
                <div className="w-32 h-32 rounded-[2rem] bg-gradient-to-br from-amber-700 to-amber-950 flex items-center justify-center border-4 border-amber-900/5 shadow-xl mx-auto">
                  <User size={48} className="text-amber-100" />
                </div>
              )}
              {isEditing && (
                <button className="absolute -bottom-1 -right-1 p-2.5 bg-amber-500 text-white rounded-lg shadow-xl hover:scale-110 transition-transform">
                  <Camera size={18} />
                </button>
              )}
            </div>
            
            <div className="mt-6 space-y-1">
              <h2 className="text-xl font-black text-amber-950 tracking-tight truncate px-4">{formData.displayName || "Artisan Name"}</h2>
              <div className="flex items-center justify-center gap-2">
                <span className="px-3 py-1 bg-amber-100 text-amber-900 text-[8px] font-black uppercase tracking-widest rounded-lg border border-amber-900/10 flex items-center gap-1.5">
                  <Shield size={10} />
                  {role}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-amber-950 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-amber-950/20">
             <h3 className="text-base font-black mb-4 flex items-center gap-2">
               <User size={16} className="text-amber-400" /> Bio
             </h3>
             {isEditing ? (
               <textarea 
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  placeholder="Share your coffee story..."
                  className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/30 min-h-[140px] placeholder:text-white/20"
               />
             ) : (
               <p className={formData.bio ? "text-xs text-amber-100/70 leading-relaxed font-medium" : "text-xs text-amber-100/30 italic font-medium"}>
                 {formData.bio || "No bio added yet. Click edit to tell your story."}
               </p>
             )}
          </div>
        </div>

        {/* Right Column: Info Grid */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-10 rounded-[2.5rem] border border-amber-900/10 shadow-xl shadow-amber-900/5">
            <h3 className="text-lg font-black text-amber-950 mb-8 pb-4 border-b border-amber-900/5">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
              <div className="space-y-2">
                <label className="text-[9px] text-amber-900/40 font-black uppercase tracking-[0.2em] flex items-center gap-2">
                  <User size={12} /> Full Name
                </label>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={formData.displayName}
                    onChange={(e) => setFormData({...formData, displayName: e.target.value})}
                    placeholder="Enter your name"
                    className="w-full bg-amber-50/50 border border-amber-100 rounded-xl p-3 text-sm font-bold text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  />
                ) : (
                  <p className="text-base font-bold text-amber-950">{formData.displayName || "Add your name"}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-[9px] text-amber-900/40 font-black uppercase tracking-[0.2em] flex items-center gap-2">
                  <Mail size={12} /> Email Address
                </label>
                <p className="text-base font-bold text-amber-900/50 transition-opacity truncate max-w-full">{formData.email}</p>
                {isEditing && <p className="text-[8px] text-amber-600 font-bold italic tracking-wider mt-1">LOCKED (AUTHENTICATION PRIMARY)</p>}
              </div>

              <div className="space-y-2">
                <label className="text-[9px] text-amber-900/40 font-black uppercase tracking-[0.2em] flex items-center gap-2">
                  <Phone size={12} /> Contact Number
                </label>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="e.g. +1 234 567 890"
                    className="w-full bg-amber-50/50 border border-amber-100 rounded-xl p-3 text-sm font-bold text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  />
                ) : (
                  <p className={formData.phone ? "text-base font-bold text-amber-950" : "text-base font-bold text-amber-900/20 italic"}>
                    {formData.phone || "No phone number added"}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-[9px] text-amber-900/40 font-black uppercase tracking-[0.2em] flex items-center gap-2">
                  <MapPin size={12} /> Primary Location
                </label>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="City, Country"
                    className="w-full bg-amber-50/50 border border-amber-100 rounded-xl p-3 text-sm font-bold text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  />
                ) : (
                  <p className={formData.location ? "text-base font-bold text-amber-950" : "text-base font-bold text-amber-900/20 italic"}>
                    {formData.location || "Location not specified"}
                  </p>
                )}
              </div>
            </div>
            
            {isEditing && (
              <div className="mt-12 flex items-center gap-4">
                <button 
                  onClick={() => setIsEditing(false)}
                  className="px-8 py-3 bg-stone-100 text-stone-500 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-stone-200 transition-all active:scale-95"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="px-8 py-3 bg-amber-950 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-black shadow-xl shadow-amber-950/20 transition-all active:scale-95"
                >
                  Update Profile
                </button>
              </div>
            )}
          </div>
          
          <div className="p-8 bg-amber-50/50 border-2 border-dashed border-amber-900/10 rounded-[2.5rem] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-amber-950 shadow-sm border border-amber-900/5">
                <Shield size={20} />
              </div>
              <div>
                <h4 className="font-black text-amber-950 text-sm">Account Privacy & Security</h4>
                <p className="text-[10px] text-amber-900/30 font-bold uppercase tracking-widest">Protected by Espresso Guardian</p>
              </div>
            </div>
            <button className="px-6 py-2.5 border border-amber-900/20 text-amber-950 rounded-xl font-black uppercase tracking-widest text-[9px] hover:bg-amber-100 transition-all active:scale-95">
              Secure Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
