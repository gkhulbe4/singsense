from dotenv import load_dotenv # type: ignore
import os
import spotipy # type: ignore
from spotipy.oauth2 import SpotifyClientCredentials # type: ignore

load_dotenv()
client_id = os.getenv("SPOTIFY_CLIENT_ID")
client_secret = os.getenv("SPOTIFY_CLIENT_SECRET")

sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(
    client_id=client_id,
    client_secret=client_secret
))

def get_song_details(song_names):
    all_songs_data = []
    for name in song_names:
        results = sp.search(q=name, type='track', limit=1)
        # print(results)
        items = results.get("tracks", {}).get("items", [])

        if not items:
            print(f"❌ No result found for '{name}'")
            continue

        track = items[0]
        song_info = {
            "name": track["name"],
            "artists": [artist["name"] for artist in track["artists"]],
            "url": track["external_urls"]["spotify"],
            "image": track["album"]["images"][0]["url"] if track["album"]["images"] else None
        }

        all_songs_data.append(song_info)

    return all_songs_data