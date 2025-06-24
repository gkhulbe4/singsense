import SongCard from "./SongCard";
import { SiMusicbrainz } from "react-icons/si";
import { Link } from "react-router-dom";

function Recommendations({ analysis }) {
  console.log(analysis);
  return (
    <div className="h-full w-screen bg-gradient-to-br from-black via-purple-950 to-indigo-950">
      {analysis.description == null ? (
        <div className="text-white">No analysis</div>
      ) : (
        <div className="text-white flex flex-col gap-7 ">
          <div className="bg-gray-900 bg-opacity-70 p-6 md:p-8 rounded-2xl shadow-xl border border-purple-800 max-w-4xl mx-auto my-8 transition-all duration-300 ease-in-out hover:shadow-2xl hover:border-purple-600 ">
            <p className="text-xl md:text-xl text-purple-200 text-center leading-relaxed font-light flex flex-col gap-4 items-center">
              <SiMusicbrainz size={50} color="white" />
              {analysis.description}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-30">
            {analysis.song_details.map((song) => (
              <SongCard
                name={song.name}
                img={song.image}
                artists={song.artists}
                url={song.url}
                key={song.url}
              />
            ))}
          </div>
          <button>
            <Link
              to="/"
              className="mt-5 px-7 py-3 text-sm font-medium text-white bg-purple-700 rounded-lg border border-purple-600 shadow-lg hover:bg-purple-800 transition-colors duration-300 uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75"
            >
              New Analysis?
            </Link>
          </button>
        </div>
      )}
    </div>
  );
}

export default Recommendations;
