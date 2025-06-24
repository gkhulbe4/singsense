import { FaSpotify } from "react-icons/fa";

function SongCard({ name, img, artists, url }) {
  return (
    <div
      href="#"
      className="bg-gradient-to-br from-black via-purple-950 to-indigo-950 group relative block lg:h-100 w-64 sm:w-80 
    cursor-pointer overflow-hidden lg:w-96"
    >
      <span className="absolute inset-0 border-2 border-dashed border-black"></span>

      <div className="bg-gradient-to-br from-black via-purple-950 to-indigo-950 relative flex h-full transform items-end border-2 border-black bg-white transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2">
        <div className="p-4 !pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8">
          <img
            src={img}
            className="h-full w-max object-contain"
            alt="song image"
          />

          <h2 className="mt-4 text-sm font-medium uppercase tracking-widest sm:text-2xl text-wrap">
            {name}
          </h2>
        </div>

        <div className="absolute w-full p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8">
          {/* <h3 className="mt-4 text-xl font-medium sm:text-2xl text-black">
            Go around the world
          </h3> */}

          <p className="mt-4 text-sm sm:text-base text-gray-300 font-semibold w-full">
            Artists :{" "}
            {artists.map((artist, index) => (
              <span key={index} className="text-purple-400 ">
                {artist}
                {index !== artists.length - 1 && ", "}
              </span>
            ))}
          </p>

          <a
            href={url}
            target="_blank"
            className="mt-4 flex justify-center items-center gap-3 border border-black bg-black px-12 py-3 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black w-full"
          >
            <FaSpotify size={20} color="green" /> Listen
          </a>
        </div>
      </div>
    </div>
  );
}

export default SongCard;
