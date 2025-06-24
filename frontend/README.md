# 🎶 SingSense: Find Your Perfect Song by Voice! 🎤

✨ **Discover Music Tailored to Your Vocal Abilities!**

Welcome to **SingSense**, a revolutionary web application born from a simple _"what if"_:

> _What if there was a website that could analyze my unique voice and recommend songs that truly match my vocal range, style, and timbre?_

**SingSense** turns that idea into reality — empowering singers of all levels to discover music that feels natural and exciting to perform.  
🎯 _No more guessing, just personalized musical harmony!_

---

## 🌟 Features

### 🎤 In-Browser Voice Recording

Capture high-quality vocal samples directly within your browser with intuitive controls and real-time feedback.

### 📊 Advanced Vocal Analysis

Dive deep into your voice's characteristics, including:

- **Pitch Range (Hz)**: Your comfortable lowest and highest notes.
- **Average Pitch & Tessitura**: Where your voice naturally sits.
- **Vocal Energy**: The typical intensity and dynamic control of your singing.
- **MFCCs (Timbre Descriptor)**: The unique _color_ or _texture_ of your voice.

### ⚙️ Smart Preference Filters

Refine your song suggestions with customizable options:

- **Genres**: Bollywood Pop, Sufi/Devotional, Indian Classical (Fusion), etc.
- **Mood/Theme**: Romantic, Energetic, Melancholic, Inspirational, and more.
- **Specific Considerations**: Songs tailored for male/female vocalists, high notes, minimal instrumentation, duets, or songs from a particular decade (e.g., the 90s).

### ✨ AI-Powered Recommendations

Using cutting-edge AI, SingSense matches songs from a vast database to your unique vocal profile and preferences, delivering **truly personalized suggestions**.

### 🎧 Integrated Audio Player

Listen to your recorded vocal sample with a sleek, custom-designed audio player.

### 🎨 Thematic UI

A modern, visually appealing user interface with a **black and purplish** color scheme — built for an engaging user experience.

---

## 💡 How It Works

1. **Record Your Voice**  
   On the homepage, click the microphone button and record a 10–20 second vocal sample.

2. **Set Your Preferences**  
   Choose genres, moods, and vocal considerations via intuitive dropdowns.

3. **Analyze & Discover**  
   Click the “Analyze Your Voice” button — the backend processes your voice and preferences.

4. **Get Your Songs**  
   Receive a **personalized breakdown** of why the songs fit your voice, complete with artist details and album art.

---

## 🛠️ Tech Stack

### Frontend

- **React** ⚛️ – Component-based UI
- **Tailwind CSS** 🌬️ – Utility-first styling

### Backend

- **Flask** 🐍 – Lightweight Python web API

### Audio Processing

- **pydub** 🎶 – Audio format conversion (e.g., WebM → WAV)
- **librosa** 📊 – Vocal feature extraction (pitch, energy, MFCCs)

### AI/LLM Integration

- **Gemini API** ♊ – Powers AI-based song recommendations

### Song Data

- **Spotify API** 🟢 – Fetches song info (artist, album art, etc.)
