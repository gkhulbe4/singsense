from flask import Flask, request, jsonify # type: ignore
from flask_cors import CORS
# import cloudinary # type: ignore
# import cloudinary.uploader # type: ignore
from dotenv import load_dotenv # type: ignore
from urllib.request import urlopen
from io import BytesIO
from pydub import AudioSegment # type: ignore
from librosa_analysis import get_vocal_analysis # type: ignore
from gemini import get_song_names # type: ignore
from spotify import get_song_details # type: ignore
import json
load_dotenv()


# cloudinary.config(cloud_name = os.getenv('CLOUDINARY_CLOUD_NAME'), api_key=os.getenv('CLOUDINARY_API_KEY'),api_secret=os.getenv('CLOUDINARY_SECRET'))

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

@app.route('/')
def home():
    return "🎵 Welcome to the Voice-Based Song Recommender!"

@app.route('/hello', methods=['GET'])
def analyze():
    query = request.args.get('query')
    print(query)
    data = "hello " + query
    return jsonify({"message": data , "status": 200}) 

@app.route('/upload-audio', methods=['POST','OPTIONS'])
def upload_audio():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file part in request'}), 400

        file = request.files['file']
        preferences = request.form.get('preferences')
        if preferences:
            preferences = json.loads(preferences)
        else:
            preferences = {}
        print("Preferences:", preferences)
        # upload_result = cloudinary.uploader.upload(file,resource_type="video")
        # url = upload_result["url"]
        # with urlopen(url) as response:
        #     webm_data = response.read()
        
        webm_data = file.read()
        audio = AudioSegment.from_file(BytesIO(webm_data), format="webm")
        wav_io = BytesIO()
        audio.export(wav_io, format="wav")
        wav_io.seek(0)
        print(wav_io)
        vocal_analysis = get_vocal_analysis(wav_io)
        song_data = get_song_names(vocal_analysis , preferences)
        song_details = get_song_details(song_data["song_names"]) # type: ignore
        # print(song_details)
        # print(song_data["description"]) # type: ignore
        return jsonify({"description": song_data["description"] , "song_details": song_details}), 200 # type: ignore

    except Exception as e:
        print("❌ Error in upload_audio:", e)
        return jsonify({'error': str(e)}), 500
    

if __name__ == '__main__':
    app.run(debug=True)
