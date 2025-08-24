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
