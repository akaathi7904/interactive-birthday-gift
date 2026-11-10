# 🌺 Pakki's Journey - Romantic Birthday Surprise Website ❤️

A luxury, romantic, fully responsive birthday surprise website crafted with love for **Nilaathi (Pattu Maa)** from **Aathi**.

---

## ✨ Features & Design Highlights
- **Direct Journey Start:** Starts directly on **Page 1: Pakki's Journey** (no countdown timer or generic welcome screen).
- **Color Palette:** Royal Cream (`#FFFDF8`), Deep Velvet Red (`#7A0C1E`, `#8B0000`), and Shimmering Rose Gold (`#B76E79`, `#E0A96D`).
- **Hibiscus Floral Atmosphere:**
  - Naturally falling red hibiscus petals with realistic physics (varying sizes, 3D tumbling, rotation, and gentle breeze response).
  - Subtle red hibiscus wallpaper texture across the website.
  - Floating hearts and romantic sparkles that appear on tap/click.
- **Background Music:**
  - Soft romantic background music (`assets/background-song.mp3`).
  - Seamless loop with low volume and an animated floating music toggle.
  - Smart coordination: Automatically pauses when the voice note plays, and resumes smoothly when it finishes!
- **Page 1: Pakki's Journey:**
  - Prominent couple photograph in an ornate rose-gold & cream frame.
  - Special eternal symbol: `11:11 ∞`.
  - Relationship start date: `"Our story began on 14.05.2025"`.
- **Page 2: Your Voice:**
  - Explicit instruction: *"Pattu Maa, Please Use Headphones ❤️"*.
  - Large animated interactive headphone emblem with pulsing soundwaves and audio progress bar.
  - Plays the special personal voice recording (`assets/voice-recording.mp3`).
  - Upon finishing, reveals the exact message:  
    `"manasu laa thoonutha pesunen thoonuchu pattu maa"`
- **Page 3: Our Memories:**
  - Subtitle: *"some our mute video calls but with love and fun"*.
  - Romantic automatic slideshow containing all remaining memories.
  - Touch swipe support for phones, previous/next controls, photo counter, and thumbnail navigation rail.
  - Click any photo to view in high resolution in the full-screen romantic lightbox.
- **Page 4: Happy Birthday Surprise:**
  - Heading: `"Happy Birthday, Pattu Maa! ❤️"`.
  - Luxury parchment love letter card with your exact Tanglish letter preserved word-for-word.
  - Vow: *"No matter how many lifetimes, I'll always choose you. ❤️"*.
  - Eternal symbol: `11:11 ∞`.
  - Signature: *"With love, Aathi ❤️"*.
  - Interactive "Shower Love & Petals 🌺✨" celebration burst button and "Replay Our Journey" button.

---

## 📁 Project Structure

```text
Pakis-Journey/
│
├── index.html                  # Main HTML file (4 connected romantic pages)
├── style.css                   # Custom luxury styling, floral textures & animations
├── script.js                   # Page transitions, hibiscus petal physics, audio & gallery
│
└── assets/
    ├── background-song.mp3     # Romantic background music
    ├── voice-recording.mp3     # Aathi's personal voice message
    └── photos/
        ├── couple.jpg          # First couple photo (Displayed on Page 1)
        ├── memory-1.jpg        # Video call memory 1
        ├── memory-2.jpg        # Video call memory 2
        ├── memory-3.jpg        # Video call memory 3
        ├── memory-4.jpg        # Video call memory 4
        ├── memory-5.jpg        # Video call memory 5
        ├── memory-6.jpg        # Video call memory 6
        ├── memory-7.jpg        # Video call memory 7
        ├── memory-8.jpg        # Video call memory 8
        └── memory-9.jpg        # Video call memory 9
```

---

## 🚀 How to Run the Website Locally

### Method 1: Just Double Click! (Easiest)
1. Extract the downloaded `Pakis-Journey.zip` to any folder on your computer.
2. Double click `index.html` to open it in Chrome, Edge, Safari, or Firefox.

### Method 2: In Visual Studio Code (Recommended)
1. Open Visual Studio Code.
2. Click **File** > **Open Folder...** and select the `Pakis-Journey` folder.
3. Install the popular extension **Live Server** (by Ritwick Dey) if you haven't already.
4. Right-click `index.html` and click **"Open with Live Server"**.
5. The website will open at `http://127.0.0.1:5500/index.html` with real-time reload.

---

## 🎨 How to Customize and Replace Files

### 1. Replacing Photos
- **Couple Photo (Page 1):**
  Replace `assets/photos/couple.jpg` with any photo you like using the same file name.
- **Memories Photos (Page 3):**
  Replace any photo inside `assets/photos/` (`memory-1.jpg`, `memory-2.jpg`, etc.).
- **Adding More Photos:**
  Save your new photo in `assets/photos/` (e.g., `memory-10.jpg`). Then open `script.js` and add it to the list at the top:
  ```javascript
  memoryPhotos: [
    'assets/photos/memory-1.jpg',
    'assets/photos/memory-2.jpg',
    // ...
    'assets/photos/memory-10.jpg'
  ]
  ```
  The gallery will automatically adapt and update the counter!

### 2. Replacing Audio Files
- **Background Music:**
  Replace `assets/background-song.mp3` with your preferred `.mp3` file (keep the name `background-song.mp3`).
- **Voice Recording:**
  Replace `assets/voice-recording.mp3` with your updated voice note.

### 3. Editing Text & Message
- Open `index.html` in VS Code or any text editor.
- Search for the section you want to edit (e.g. `letter-body-content`) and update the text directly.

---

Made with ❤️ by Aathi for Pattu Maa | 11:11 ∞
