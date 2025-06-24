import "./App.css";
import Recommendations from "./components/Recommendations";
// import axios from "axios";
import Recorder from "./components/Recorder";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

function App() {
  const [analysis, setAnalysis] = useState({
    description: null,
    song_details: null,
  });
  const [analysisLoading, setAnalysisLoading] = useState(false);
  return (
    <Router>
      <Toaster />
      <div className="bg-gradient-to-br from-black via-purple-950 to-indigo-950">
        <Routes>
          <Route
            path="/"
            element={
              <Recorder
                setAnalysis={setAnalysis}
                analysisLoading={analysisLoading}
                setAnalysisLoading={setAnalysisLoading}
              />
            }
          />
          <Route
            path="/recommendations"
            element={<Recommendations analysis={analysis} />}
          />
        </Routes>

        {/* {analysis.description && (
          <div>
            <div className="p-4 border border-gray-200">
              <h2 className="font-bold text-gray-700">Analysis :</h2>
              <p className="text-md text-gray-700 font-bold">
                {analysis.description}
              </p>
            </div>
            <div className="flex flex-col gap-4 mt-2">
              {analysis.song_details.map((song) => (
                <div className="p-4 border border-gray-200" key={song.name}>
                  <h3 className="font-bold text-2xl">{song.name}</h3>
                  <div className="flex gap-2">
                    <p>Artists: </p>
                    {song.artists.map((artist) => (
                      <span key={artist}>&#x2022; {artist}</span>
                    ))}
                  </div>
                  <div className="h-20 w-20 object-contain">
                    <img
                      className="h-full w-full object-contain"
                      src={song.image}
                      alt={song.name}
                    />
                  </div>
                  <Link className="underline text-blue-600" to={song.url}>
                    Listen on Spotify
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )} */}

        <br />
        <br />
      </div>
    </Router>
  );
}

export default App;
