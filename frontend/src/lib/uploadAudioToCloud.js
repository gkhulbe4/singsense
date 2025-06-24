import axios from "axios";

async function uploadAudioToCloud(blob, preferences) {
  console.log(blob);
  const formData = new FormData();
  formData.append("file", blob);
  formData.append("preferences", JSON.stringify(preferences));
  try {
    const response = await axios.post(
      "http://127.0.0.1:5000/upload-audio",
      formData,
      preferences
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export default uploadAudioToCloud;
