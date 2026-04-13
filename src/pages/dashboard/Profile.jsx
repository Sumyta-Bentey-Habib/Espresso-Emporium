import React from "react";
import { useAuth } from "../../context/AuthProvider";
import { useProfile } from "../../hooks/useProfile";
import { User, Mail, Shield, Camera, Edit3, Check, Phone, MapPin } from "lucide-react";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";

const Profile = () => {
  const { user, role } = useAuth();
  const { 
    isEditing, 
    formData, 
    handleInputChange, 
    toggleEditing, 
    cancelEditing,
    saveProfile 
  } = useProfile(user);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700 pb-20">
      {/* Header section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-amber-950 tracking-tight">Your Profile</h1>
          <p className="text-amber-900/60 font-bold mt-1 uppercase tracking-widest text-[9px]">
            Manage your personal artisan identity
          </p>
        </div>
        
        <Button
          onClick={toggleEditing}
          variant={isEditing ? "success" : "primary"}
          icon={isEditing ? Check : Edit3}
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Role */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="text-center relative group">
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
              <h2 className="text-xl font-black text-amber-950 tracking-tight truncate px-4">
                {formData.displayName || "Artisan Name"}
              </h2>
              <div className="flex items-center justify-center gap-2">
                <span className="px-3 py-1 bg-amber-100 text-amber-900 text-[8px] font-black uppercase tracking-widest rounded-lg border border-amber-900/10 flex items-center gap-1.5">
                  <Shield size={10} />
                  {role}
                </span>
              </div>
            </div>
          </Card>

          <Card variant="dark">
             <h3 className="text-base font-black mb-4 flex items-center gap-2">
               <User size={16} className="text-amber-400" /> Bio
             </h3>
             {isEditing ? (
               <textarea 
                  value={formData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  placeholder="Share your coffee story..."
                  className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/30 min-h-[140px] placeholder:text-white/20"
               />
             ) : (
               <p className={formData.bio ? "text-xs text-amber-100/70 leading-relaxed font-medium" : "text-xs text-amber-100/30 italic font-medium"}>
                 {formData.bio || "No bio added yet. Click edit to tell your story."}
               </p>
             )}
          </Card>
        </div>

        {/* Right Column: Info Grid */}
        <div className="lg:col-span-2 space-y-6">
          <Card padding="p-10">
            <h3 className="text-lg font-black text-amber-950 mb-8 pb-4 border-b border-amber-900/5">
                Basic Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
              <div className="space-y-2">
                {isEditing ? (
                  <Input 
                    label="Full Name"
                    icon={User}
                    value={formData.displayName}
                    onChange={(e) => handleInputChange("displayName", e.target.value)}
                    placeholder="Enter your name"
                  />
                ) : (
                  <>
                    <label className="text-[9px] text-amber-900/40 font-black uppercase tracking-[0.2em] flex items-center gap-2">
                      <User size={12} /> Full Name
                    </label>
                    <p className="text-base font-bold text-amber-950">{formData.displayName || "Add your name"}</p>
                  </>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-[9px] text-amber-900/40 font-black uppercase tracking-[0.2em] flex items-center gap-2">
                  <Mail size={12} /> Email Address
                </label>
                <p className="text-base font-bold text-amber-900/50 transition-opacity truncate max-w-full">
                    {formData.email}
                </p>
                {isEditing && (
                    <p className="text-[8px] text-amber-600 font-bold italic tracking-wider mt-1">
                        LOCKED (AUTHENTICATION PRIMARY)
                    </p>
                )}
              </div>

              <div className="space-y-2">
                {isEditing ? (
                  <Input 
                    label="Contact Number"
                    icon={Phone}
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="e.g. +1 234 567 890"
                  />
                ) : (
                  <>
                    <label className="text-[9px] text-amber-900/40 font-black uppercase tracking-[0.2em] flex items-center gap-2">
                      <Phone size={12} /> Contact Number
                    </label>
                    <p className={formData.phone ? "text-base font-bold text-amber-950" : "text-base font-bold text-amber-900/20 italic"}>
                      {formData.phone || "No phone number added"}
                    </p>
                  </>
                )}
              </div>

              <div className="space-y-2">
                {isEditing ? (
                  <Input 
                    label="Primary Location"
                    icon={MapPin}
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="City, Country"
                  />
                ) : (
                  <>
                    <label className="text-[9px] text-amber-900/40 font-black uppercase tracking-[0.2em] flex items-center gap-2">
                      <MapPin size={12} /> Primary Location
                    </label>
                    <p className={formData.location ? "text-base font-bold text-amber-950" : "text-base font-bold text-amber-900/20 italic"}>
                      {formData.location || "Location not specified"}
                    </p>
                  </>
                )}
              </div>
            </div>
            
            {isEditing && (
              <div className="mt-12 flex items-center gap-4">
                <Button variant="ghost" onClick={cancelEditing}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={saveProfile}>
                  Update Profile
                </Button>
              </div>
            )}
          </Card>
          
          <Card variant="glass" padding="p-8" className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-amber-950 shadow-sm border border-amber-900/5">
                <Shield size={20} />
              </div>
              <div>
                <h4 className="font-black text-amber-950 text-sm">Account Privacy & Security</h4>
                <p className="text-[10px] text-amber-900/30 font-bold uppercase tracking-widest">
                    Protected by Espresso Guardian
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Secure Account
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
