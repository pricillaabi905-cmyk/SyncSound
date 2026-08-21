import {
    database,
    ref,
    onValue
} from "./firebase.js";

const playerStatus = document.getElementById("playerStatus");

if (playerStatus) {

    const sessionID = sessionStorage.getItem("currentSession");

    document.getElementById("sessionDisplay").innerHTML = sessionID;

    onValue(ref(database, "sessions/" + sessionID), (snapshot) => {

        if (!snapshot.exists()) return;

        const data = snapshot.val();

        if (data.status === "accepted") {

            playerStatus.innerHTML = "✅ Host accepted your request!";

            setTimeout(() => {

                sessionStorage.setItem("role", "player");
window.location.href = "music.html";

                // Later we'll redirect to the music page.
                // window.location.href = "music.html";

            }, 1000);

        }

        if (data.status === "rejected") {

            playerStatus.innerHTML = "❌ Host rejected your request.";

            setTimeout(() => {

                window.location.href = "join.html";

            }, 2000);

        }

    });

}