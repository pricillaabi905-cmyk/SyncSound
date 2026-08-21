import {
    database,
    ref,
    onValue,
    update
} from "./firebase.js";

// =======================================
// Session
// =======================================

const sessionID = sessionStorage.getItem("currentSession");

// =======================================
// HTML Elements
// =======================================

const sessionDisplay = document.getElementById("sessionID");

const copyBtn = document.getElementById("copyBtn");

const status = document.getElementById("status");

const requestSection = document.getElementById("requestSection");

const acceptBtn = document.getElementById("acceptBtn");

const rejectBtn = document.getElementById("rejectBtn");

// =======================================
// Show Session ID
// =======================================

sessionDisplay.innerHTML = sessionID;

// =======================================
// Copy Session ID
// =======================================

copyBtn.addEventListener("click", async () => {

    await navigator.clipboard.writeText(sessionID);

    copyBtn.innerHTML = "✅ Copied!";

    setTimeout(() => {

        copyBtn.innerHTML = "📋 Copy Session ID";

    }, 1500);

});

// =======================================
// Listen for Join Request
// =======================================

onValue(

    ref(database, "sessions/" + sessionID),

    (snapshot) => {

        if (!snapshot.exists()) return;

        const data = snapshot.val();

        if (data.playerJoined) {

            status.innerHTML =
                "🎧 A player wants to join your session.";

            requestSection.style.display = "block";

        }

        else {

            status.innerHTML =
                "⏳ Waiting for player to join...";

            requestSection.style.display = "none";

        }

    }

);

// =======================================
// Accept Player
// =======================================

acceptBtn.addEventListener("click", async () => {

    await update(

        ref(database, "sessions/" + sessionID),

        {

            status: "accepted"

        }

    );

    sessionStorage.setItem("role", "host");

    window.location.href = "music.html";

});

// =======================================
// Reject Player
// =======================================

rejectBtn.addEventListener("click", async () => {

    await update(

        ref(database, "sessions/" + sessionID),

        {

            status: "rejected"

        }

    );

});