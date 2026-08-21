// Import Firebase
import {
    database,
    ref,
    set,
    get
} from "./firebase.js";

// ======================================
// HOME PAGE
// ======================================

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

// ======================================
// CREATE SESSION
// ======================================

const createSessionBtn = document.getElementById("createSessionBtn");

if (createSessionBtn) {

    createSessionBtn.addEventListener("click", async () => {

        // Get values from the form
        const sessionName = document.getElementById("sessionName").value.trim();
        const maxUsers = document.getElementById("maxUsers").value;
        const sessionPassword = document.getElementById("sessionPassword").value.trim();

        if (sessionName === "") {
            alert("Please enter a Session Name.");
            return;
        }

        const sessionID =
            "SYNC" + Math.floor(1000 + Math.random() * 9000);

        await set(

            ref(database, "sessions/" + sessionID),

            {

                host: "Resh",

                sessionName: sessionName,

                maxUsers: Number(maxUsers),

                password: sessionPassword,

                status: "waiting",

                createdAt: Date.now(),

                playerJoined: false

            }

        );

        sessionStorage.setItem(
            "currentSession",
            sessionID
        );

        window.location.href = "host.html";

    });

}

// ======================================
// JOIN SESSION
// ======================================

const joinSessionBtn = document.getElementById("joinSessionBtn");

if (joinSessionBtn) {

    joinSessionBtn.addEventListener("click", async () => {

        const sessionInput =
            document.getElementById("sessionInput");

        const sessionID = sessionInput.value
            .trim()
            .toUpperCase();

        if (sessionID === "") {

            alert("Please enter a Session ID.");

            return;

        }

        const snapshot = await get(

            ref(database, "sessions/" + sessionID)

        );

        if (!snapshot.exists()) {

            alert("Session not found!");

            return;

        }

        await set(

            ref(database, "sessions/" + sessionID + "/playerJoined"),

            true

        );

        sessionStorage.setItem(

            "currentSession",

            sessionID

        );

        alert("Successfully joined the session!");

        window.location.href = "player.html";

    });

}