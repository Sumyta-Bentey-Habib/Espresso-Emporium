import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export const useProfile = (user) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    phone: "",
    location: "",
    bio: ""
  });

  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user.displayName || user.name || "",
        email: user.email || "",
        phone: user.phoneNumber || "",
        location: user.location || "",
        bio: user.bio || ""
      });
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const saveProfile = async () => {
    try {
      await Swal.fire({
        title: "Saving Changes",
        text: "Your profile is being updated...",
        timer: 1500,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      // Here you would normally call an API
      // await updateProfileApi(formData);

      setIsEditing(false);
      
      await Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your information is now fresh and ready.",
        timer: 2000,
        showConfirmButton: false
      });
      
      return true;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong while saving your profile.",
      });
      return false;
    }
  };

  const toggleEditing = () => {
    if (isEditing) {
      saveProfile();
    } else {
      setIsEditing(true);
    }
  };

  const cancelEditing = () => {
    setIsEditing(false);
    // Reset form data to original user data
    if (user) {
      setFormData({
        displayName: user.displayName || user.name || "",
        email: user.email || "",
        phone: user.phoneNumber || "",
        location: user.location || "",
        bio: user.bio || ""
      });
    }
  };

  return {
    isEditing,
    setIsEditing,
    formData,
    handleInputChange,
    saveProfile,
    toggleEditing,
    cancelEditing
  };
};
