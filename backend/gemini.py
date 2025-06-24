import google.generativeai as genai # type: ignore
import os
from dotenv import load_dotenv # type: ignore
from spotify import get_song_details

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-2.5-flash")



def get_song_names(vocal_data, preferences):
    prompt = f"""
    I'd like to get personalized song recommendations based on my vocal characteristics. Please analyze the following detailed raw vocal data. Then, drawing upon extensive knowledge derived from vast musical resources, including song structures, typical vocal requirements, and stylistic nuances gathered from comprehensive analysis of information available across the web, suggest a list of songs that would be a great match for my voice.

    Here's My Vocal Data:
    🎵 Lowest Hz: {vocal_data['lowest_hz']} Hz
    🎵 Highest Hz: {vocal_data['highest_hz']} Hz
    (This tells me the full extent of notes you can comfortably hit, from lowest to highest.)
    🎯 Average Pitch: {vocal_data['average_hz']} Hz
    (This indicates where your voice naturally centers.)
    🎼 Average Note: {vocal_data['average_note']}
    (This is the musical note closest to your average pitch, giving a common reference point for your vocal tessitura.)
    🔊 Average Energy: {vocal_data['average_energy']}
    (This describes the typical intensity or volume of your singing, helping me understand if your voice is naturally more suited for powerful anthems or softer, more intimate ballads.)
    🎨 MFCCs (timbre descriptor): {vocal_data['mfccs']}
    (These numbers represent the unique 'color' or 'texture' of your voice. They help me find songs where your specific vocal quality can truly shine and contribute to the song's emotion.)

    Here's What I'm Looking For:

    * **Number of Songs:** {6}
    * **Genre(s):** {preferences['genre']}
    * **Mood/Theme: {preferences['mood']} - ABSOLUTELY CRITICAL CRITERION. Ensure ALL recommended songs strictly and unequivocally fit this mood.**
    * **Any Specific Considerations (Optional):** {preferences['consideration']}

    Output Format Requirements (Strict):

    Provide your response in two distinct sections, clearly labeled:

    1.  **Overall Recommendation Summary:** Provide a **2-3 line casual and engaging paragraph** that gives an overall explanation of why the recommended songs will generally match your voice. This summary should clearly use aspects of your provided vocal data (lowest/highest Hz, average pitch/note, average energy, and timbre/MFCCs) to explain the suitability in an easy-to-understand way, leveraging musical knowledge.
    2.  **Plain Song Names List:** Provide a simple, unnumbered list of just the song names, one per line, matching the songs recommended. This list is for easy programmatic use (e.g., with Spotify API).

    Do not include any introductory or concluding remarks, or additional text beyond these two structured lists.

    Example of Desired Output Format (if asking for 2 songs):

    **Overall Recommendation Summary:**
    Based on your vocal data, these songs are chosen because their melodies primarily sit within your comfortable lowest-to-highest Hz range, aligning well with your average pitch. Your unique vocal energy and timbre will perfectly complement the emotional depth and style of these tracks, making them truly shine when you sing them.

    **Plain Song Names List:**
    Channa Mereya
    Tum Hi Ho
    """
    
    try:
        response_from_gemini = model.generate_content(prompt)
        full_response_text = response_from_gemini.text

        # print(full_response_text)

        overall_description = ""
        song_names_list = []

        summary_start_marker = "**Overall Recommendation Summary:**"
        plain_list_start_marker = "**Plain Song Names List:**"

        # Extract Overall Recommendation Summary
        if summary_start_marker in full_response_text:
            # Split everything before the plain list marker
            temp_section = full_response_text.split(plain_list_start_marker, 1)[0]

            # Then, get the part after the summary start marker
            if summary_start_marker in temp_section:
                overall_description = temp_section.split(summary_start_marker, 1)[1].strip()

        # Extract Plain Song Names List
        if plain_list_start_marker in full_response_text:
            list_section = full_response_text.split(plain_list_start_marker, 1)[1]

            for line in list_section.strip().split('\n'):
                cleaned_line = line.strip()
                if cleaned_line:
                    song_names_list.append(cleaned_line)
        
        song_data = {
            "description" :  overall_description,
            "song_names" : song_names_list
        }
        return song_data
    
    except Exception as e:
        print(f"An error occurred: {e}")
        print("Please ensure your API key is correctly set in a .env file as GEMINI_API_KEY.")
        print("Also, check your internet connection and API usage limits.")