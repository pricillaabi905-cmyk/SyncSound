// Import Firebase
import {
    database,
    ref,
    set,
    get
} from "./firebase.js";

// ----------------------
// Home Page
// ----------------------

const createBtn = document.getElementById("createBtn");

if (createBtn) {
    createBtn.addEventListener("click", () => {
        window.location.href = "create.html";
    });
}

const joinBtn = document.getElementById("joinBtn");

if (joinBtn) {
    joinBtn.addEventListener("click", () => {
        window.location.href = "join.html";
    });
}

// ----------------------
// Create Session
// ----------------------

const createSessionBtn = document.getElementById("createSessionBtn");

if (createSessionBtn) {

    createSessionBtn.addEventListener("click", async () => {

        let sessionID = "SYNC" + Math.floor(1000 + Math.random() * 9000);

        await set(
            ref(database, "sessions/" + sessionID),
            {
                host: "Resh",
                status: "waiting",
                createdAt: Date.now()
            }
        );

        sessionStorage.setItem("currentSession", sessionID);

        window.location.href = "host.html";

    });

}

// ----------------------
// Host Page
// ----------------------

const sessionDisplay = document.getElementById("sessionDisplay");

if (sessionDisplay) {

    const sessionID = sessionStorage.getItem("currentSession");

    sessionDisplay.innerHTML = sessionID;

}

const copyBtn = document.getElementById("copyBtn");

if (copyBtn) {

    copyBtn.addEventListener("click", () => {

        const sessionID = sessionStorage.getItem("currentSession");

        navigator.clipboard.writeText(sessionID);

        alert("Session ID Copied!");

    });

}

// ----------------------
// Join Session
// ----------------------

const joinSessionBtn = document.getElementById("joinSessionBtn");

if (joinSessionBtn) {

    joinSessionBtn.addEventListener("click", async () => {

        const sessionID = document
            .getElementById("joinSessionID")
            .value
            .trim()
            .toUpperCase();

        if (sessionID === "") {
            alert("Please enter a Session ID.");
            return;
        }

        const snapshot = await get(ref(database, "sessions/" + sessionID));

        if (snapshot.exists()) {

            sessionStorage.setItem("currentSession", sessionID);

            alert("Successfully joined the session!");

            window.location.href = "player.html";

        } else {

            alert("Session not found!");

        }

    });

}

// ----------------------
// Player Page
// ----------------------

const playerStatus = document.getElementById("playerStatus");

if (playerStatus) {

    const sessionID = sessionStorage.getItem("currentSession");

    document.getElementById("sessionDisplay").innerHTML = sessionID;

}