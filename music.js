import {
    database,
    ref,
    onValue,
    update
} from "./firebase.js";

// ==========================
// HTML Elements
// ==========================

const audioPlayer = document.getElementById("audioPlayer");

const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const syncStatus = document.getElementById("syncStatus");

const songUrl = document.getElementById("songUrl");
const loadSongBtn = document.getElementById("loadSongBtn");

const hostControls = document.getElementById("hostControls");

const song1Btn = document.getElementById("song1Btn");
const song2Btn = document.getElementById("song2Btn");
const song3Btn = document.getElementById("song3Btn");

// Header

const roleBadge = document.getElementById("roleBadge");
const sessionNameText = document.getElementById("sessionNameText");
const sessionIDText = document.getElementById("sessionIDText");
const userCount = document.getElementById("userCount");

// Song Details

const albumArt = document.getElementById("albumArt");
const songTitle = document.getElementById("songTitle");
const artistName = document.getElementById("artistName");

// ==========================
// Session
// ==========================

const sessionID = sessionStorage.getItem("currentSession");
const role = sessionStorage.getItem("role");

sessionIDText.innerText = sessionID;

if (role === "host") {

    roleBadge.innerHTML = "🟢 Host";

} else {

    roleBadge.innerHTML = "🔵 Player";

    hostControls.style.display = "none";

    playBtn.style.display = "none";
    pauseBtn.style.display = "none";

    document.querySelector(".mainContainer").style.gridTemplateColumns = "1fr";

}

// ==========================
// Playlist
// ==========================

const playlist = [

    {
        title: "SoundHelix Song 1",
        artist: "SoundHelix",
        cover: "https://picsum.photos/id/1015/400/400",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },

    {
        title: "SoundHelix Song 2",
        artist: "SoundHelix",
        cover: "https://picsum.photos/id/1016/400/400",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },

    {
        title: "SoundHelix Song 3",
        artist: "SoundHelix",
        cover: "https://picsum.photos/id/1018/400/400",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    }

];

let currentSongIndex = 0;

// ==========================
// Default Song
// ==========================

loadSong(playlist[currentSongIndex]);

// ==========================
// Load Song
// ==========================

async function loadSong(song) {

    audioPlayer.src = song.url;

    audioPlayer.load();

    albumArt.src = song.cover;
    songTitle.innerHTML = song.title;
    artistName.innerHTML = song.artist;

    if (role === "host") {

        await update(

            ref(database, "sessions/" + sessionID),

            {

                songUrl: song.url,
                songTitle: song.title,
                artist: song.artist,
                albumArt: song.cover,

                playback: "pause",

                currentTime: 0

            }

        );

    }

}

// ==========================
// Playlist Buttons
// ==========================

song1Btn.onclick = () => {

    currentSongIndex = 0;
    loadSong(playlist[currentSongIndex]);

};

song2Btn.onclick = () => {

    currentSongIndex = 1;
    loadSong(playlist[currentSongIndex]);

};

song3Btn.onclick = () => {

    currentSongIndex = 2;
    loadSong(playlist[currentSongIndex]);

};

// ==========================
// Previous
// ==========================

prevBtn.onclick = () => {

    if (role !== "host") return;

    currentSongIndex--;

    if (currentSongIndex < 0) {

        currentSongIndex = playlist.length - 1;

    }

    loadSong(playlist[currentSongIndex]);

};

// ==========================
// Next
// ==========================

nextBtn.onclick = () => {

    if (role !== "host") return;

    currentSongIndex++;

    if (currentSongIndex >= playlist.length) {

        currentSongIndex = 0;

    }

    loadSong(playlist[currentSongIndex]);

};

// ==========================
// Custom URL
// ==========================

loadSongBtn.onclick = async () => {

    if (role !== "host") return;

    const url = songUrl.value.trim();

    if (url === "") {

        alert("Enter MP3 URL");

        return;

    }

    audioPlayer.src = url;

    audioPlayer.load();

    await update(

        ref(database, "sessions/" + sessionID),

        {

            songUrl: url,
            songTitle: "Custom Song",
            artist: "Unknown Artist",
            albumArt: "https://picsum.photos/400",

            playback: "pause",

            currentTime: 0

        }

    );

};

// ==========================
// Play
// ==========================

playBtn.onclick = async () => {

    audioPlayer.play();

    await update(

        ref(database, "sessions/" + sessionID),

        {

            playback: "play"

        }

    );

};

// ==========================
// Pause
// ==========================

pauseBtn.onclick = async () => {

    audioPlayer.pause();

    await update(

        ref(database, "sessions/" + sessionID),

        {

            playback: "pause"

        }

    );

};

// ==========================
// Seek Sync
// ==========================

audioPlayer.addEventListener("seeked", async () => {

    if (role !== "host") return;

    await update(

        ref(database, "sessions/" + sessionID),

        {

            currentTime: audioPlayer.currentTime

        }

    );

});

// ==========================
// Firebase Listener
// ==========================

onValue(

    ref(database, "sessions/" + sessionID),

    (snapshot) => {

        if (!snapshot.exists()) return;

        const data = snapshot.val();
        // Display Session Name
if (data.sessionName) {

    sessionNameText.innerHTML = "🎵 " + data.sessionName;

}

        let users = 1;

if (data.playerJoined) {

    users++;

}

const maxUsers = data.maxUsers || users;

userCount.innerHTML = `👥 ${users} / ${maxUsers} Users`;

        if (data.songUrl) {

            if (audioPlayer.src !== data.songUrl) {

                audioPlayer.src = data.songUrl;
                audioPlayer.load();

            }

        }

        if (data.songTitle) {

            songTitle.innerHTML = data.songTitle;

        }

        if (data.artist) {

            artistName.innerHTML = data.artist;

        }

        if (data.albumArt) {

            albumArt.src = data.albumArt;

        }

        if (data.playback === "play") {

            audioPlayer.play();

            syncStatus.innerHTML = "🟢 Playing";

        }

        if (data.playback === "pause") {

            audioPlayer.pause();

            syncStatus.innerHTML = "⏸️ Paused";

        }

        if (

            role === "player" &&

            data.currentTime !== undefined

        ) {

            if (

                Math.abs(audioPlayer.currentTime - data.currentTime) > 1

            ) {

                audioPlayer.currentTime = data.currentTime;

            }

        }

    }

);