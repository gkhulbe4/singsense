export const allPreferencesOptions = [
  {
    category: "Genre",
    key: "genre", // Key to match your backend's 'genres' field
    options: [
      { title: "Bollywood Pop", value: "Bollywood Pop" },
      { title: "Bollywood Acoustic/Soul", value: "Bollywood Acoustic/Soul" },
      { title: "Bollywood Dance", value: "Bollywood Dance" },
      {
        title: "Indian Classical (Fusion)",
        value: "Indian Classical (Fusion)",
      },
      { title: "Sufi/Devotional", value: "Sufi/Devotional" },
    ],
  },
  {
    category: "Mood/Theme",
    key: "mood",
    options: [
      { title: "Romantic", value: "Romantic" },
      { title: "Happy / Upbeat", value: "Happy/Upbeat" },
      { title: "Melancholic / Sad", value: "Melancholic/Sad" }, // Slight display name change for clarity
      { title: "Energetic / Dance", value: "Energetic/Dance" }, // Slight display name change for clarity
      { title: "Calm / Relaxing", value: "Calm/Relaxing" }, // Slight display name change for clarity
      { title: "Inspirational / Hopeful", value: "Inspirational/Hopeful" }, // Slight display name change for clarity
    ],
  },
  {
    category: "Consideration",
    key: "consideration", // Key to match your backend's 'considerations' field
    options: [
      { title: "Male Vocalists", value: "songs for male vocalists" }, // Display name change
      { title: "Female Vocalists", value: "songs for female vocalists" }, // Display name change
      { title: "High Notes", value: "songs with high notes" }, // Display name change
      {
        title: "Minimal Instrumentation",
        value: "songs with minimal instrumentation",
      }, // Display name change
      { title: "From the 90s", value: "songs from the 90s" }, // Display name change
      { title: "Duets", value: "duets" }, // Display name change
    ],
  },
];
