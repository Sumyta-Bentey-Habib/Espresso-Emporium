const DEPLOY_URL = import.meta.env.VITE_API_URL || "https://coffestore.onrender.com";
const LOCAL_URL = "http://localhost:3000";

const checkLocalServer = async () => {
    if (window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
        return DEPLOY_URL;
    }
    
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1000); // 1s timeout
        
        const response = await fetch(`${LOCAL_URL}/chat/participants`, { 
            method: 'HEAD',
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        return response.ok ? LOCAL_URL : DEPLOY_URL;
    } catch (e) {
        return DEPLOY_URL;
    }
};

export const API_URL = await checkLocalServer();

export const CATEGORIES = ["Coffee", "Beans", "Equipment", "Accessories"];

export async function uploadImageToImgBB(imageFile) {
  const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  if (data.success) {
    return data.data.url;
  } else {
    throw new Error(data.error?.message || "Image upload failed");
  }
}
