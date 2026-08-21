# SyncSound

## Listen Together • Anywhere

SyncSound is a real-time music synchronization web application that allows multiple users to listen to the same music together.

A user can create a music session and become the **Host**. Other users can join the session using a **Session ID**. The host controls music playback, and the application synchronizes actions such as play, pause, song changes, and seeking between connected users.

---

# Features

- Create a music listening session
- Automatically generated Session ID
- Join an existing session
- Host and Player roles
- Host approval for joining users
- Reject join requests
- Play music
- Pause music
- Previous song
- Next song
- Built-in playlist
- Load a custom MP3 URL
- Synchronize playback time
- Display connected users
- Display album artwork, song title, and artist name
- Real-time synchronization using Firebase
- Responsive design for mobile and desktop

---

# Technologies Used

## Frontend

The user interface was developed using:

- HTML5 – Page structure
- CSS3 – Styling and responsive design
- JavaScript – Application logic and user interaction

## Backend

This project uses **Firebase** as the backend service.

Instead of creating a traditional backend server using technologies such as Node.js, Java, or PHP, SyncSound uses Firebase as a Backend as a Service (BaaS).

## Database

- Firebase Realtime Database
- Database Type: NoSQL
- Data Format: JSON

Firebase Realtime Database allows connected users to receive updates in real time.

---

# Project Architecture

```text
        ┌───────────────┐
        │     Host      │
        └───────┬───────┘
                │
                │ Play / Pause / Song Change
                ▼
        ┌───────────────────────┐
        │ Firebase Realtime DB  │
        └───────────┬───────────┘
                    │
          Real-Time Updates
                    │
          ┌─────────┴─────────┐
          ▼                   ▼
    ┌──────────┐        ┌──────────┐
    │ Player 1 │        │ Player 2 │
    └──────────┘        └──────────┘
