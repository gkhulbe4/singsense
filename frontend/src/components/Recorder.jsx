import { useRef, useState, useEffect } from "react";
import { FaMicrophone, FaRegStopCircle } from "react-icons/fa";
import { SiMusicbrainz } from "react-icons/si";
import { Loader } from "lucide-react";
import uploadAudioToCloud from "../lib/uploadAudioToCloud";
import { useNavigate } from "react-router-dom";
import { allPreferencesOptions } from "../lib/options";
import SelectOptions from "./SelectOptions";
import { toast } from "sonner";

export default function Recorder({
  setAnalysis,
  analysisLoading,
  setAnalysisLoading,
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedURL, setRecordedURL] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [preferences, setPreferences] = useState(() => {
    const initialSelections = {};
    allPreferencesOptions.forEach((category) => {
      initialSelections[category.key] = category.options[0].value;
    });
    return initialSelections;
  });

  const mediaStream = useRef(null);
  const mediaRecorder = useRef(null);
  const chunks = useRef([]);
  const timerRef = useRef(null);

  const navigate = useNavigate();

  const requestMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStream.current = stream;
      setPermissionGranted(true);
      stream.getTracks().forEach((track) => track.stop());
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert(
        "Microphone access denied. Please enable it in your browser settings to record."
      );
      setPermissionGranted(false);
    }
  };

  useEffect(() => {
    requestMicrophonePermission();
  }, []);

  const startRecording = async () => {
    if (!permissionGranted) {
      alert(
        "Microphone permission not granted. Please allow access to record."
      );
      await requestMicrophonePermission();
      if (!permissionGranted) return;
    }

    setIsRecording(true);
    setRecordedURL("");
    setAudioBlob(null);
    setSeconds(0);
    chunks.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStream.current = stream;
      mediaRecorder.current = new MediaRecorder(stream, { type: "audio/webm" });

      mediaRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.current.push(e.data);
        }
      };

      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);

      mediaRecorder.current.onstop = async () => {
        const recordedBlob = new Blob(chunks.current, { type: "audio/webm" });
        setAudioBlob(recordedBlob);
        const url = URL.createObjectURL(recordedBlob);
        setRecordedURL(url);

        chunks.current = [];
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };

      mediaRecorder.current.start();
    } catch (error) {
      console.error("Error starting recording:", error);
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      alert("Could not start recording. Please check your microphone.");
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (mediaRecorder.current && mediaRecorder.current.state !== "inactive") {
      mediaRecorder.current.stop();
    }
    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach((track) => track.stop());
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-purple-950 to-indigo-950 text-white p-4 font-sans relative">
      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center flex flex-col gap-5">
        <h1 className="text-6xl md:text-7xl font-extrabold flex items-center justify-center text-purple-400 drop-shadow-lg mb-2">
          <SiMusicbrainz color="white" className="mr-4 text-5xl md:text-6xl" />{" "}
          SingSense
        </h1>
        <p className="text-lg md:text-xl text-purple-200 max-w-2xl px-4">
          Discover songs that perfectly match your unique vocal style and range.
          Record your voice, get a detailed analysis, and find your next perfect
          track.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center mt-40 md:mt-52 gap-8 p-6 bg-gray-900 bg-opacity-70 rounded-3xl shadow-xl border border-purple-800">
        <h2 className="text-8xl md:text-7xl font-mono text-purple-300 bg-black bg-opacity-50 px-8 py-4 rounded-xl border border-purple-700 shadow-inner">
          {formatTime(seconds)}
        </h2>

        {isRecording ? (
          <button
            onClick={stopRecording}
            className="flex items-center justify-center text-4xl bg-red-600 hover:bg-red-700 active:bg-red-800 transition-colors duration-200 rounded-full p-4 text-white w-20 h-20 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50 cursor-pointer"
            aria-label="Stop Recording"
          >
            <FaRegStopCircle />
          </button>
        ) : (
          <button
            onClick={startRecording}
            className={`flex items-center justify-center text-4xl bg-purple-600 hover:bg-purple-700 active:bg-purple-800 transition-colors duration-200 rounded-full p-4 text-white w-20 h-20 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 cursor-pointer ${
              analysisLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            aria-label="Start Recording"
            disabled={analysisLoading}
          >
            <FaMicrophone />
          </button>
        )}

        {(recordedURL || audioBlob) && (
          <div className="flex flex-col items-center gap-4 w-full ">
            {recordedURL && (
              <div className="flex flex-col gap-4 justify-around items-center">
                <audio controls id="player" src={recordedURL} />
                <div className="flex gap-6">
                  {allPreferencesOptions.map((option) => (
                    <SelectOptions
                      options={option.options}
                      category={option.category}
                      setPreferences={setPreferences}
                      optionKey={option.key}
                    />
                  ))}
                </div>
              </div>
            )}
            {audioBlob && (
              <button
                className={`
                flex gap-3 justify-center items-center bg-purple-700 hover:bg-purple-800 active:bg-purple-900 text-white font-semibold py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 text-xl
                  ${
                    analysisLoading
                      ? "opacity-70 cursor-not-allowed animate-pulse"
                      : ""
                  }`}
                onClick={async () => {
                  if (analysisLoading) return;
                  try {
                    setAnalysisLoading(true);
                    const res = await uploadAudioToCloud(
                      audioBlob,
                      preferences
                    );
                    setAnalysis({
                      description: res.description,
                      song_details: res.song_details,
                    });
                    // console.log(res);
                    toast.success("Analysis completed successfully!");
                    navigate("/recommendations");
                  } catch (error) {
                    toast.error("Error during analysis. Please try again.");
                    console.error("Error in analysis:", error);
                  } finally {
                    setAnalysisLoading(false);
                  }
                }}
                disabled={analysisLoading}
              >
                {analysisLoading ? (
                  <span className="flex items-center">
                    <Loader className="animate-spin mr-2" /> Analyzing
                  </span>
                ) : (
                  "Analyze Your Voice"
                )}{" "}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
